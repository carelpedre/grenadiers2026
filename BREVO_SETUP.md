# Email signup — Brevo setup guide

The site now has email signup. **Three setup steps required** before subscriptions actually go anywhere. Total time: ~15 minutes.

## 1. Create your Brevo account

1. Go to [brevo.com](https://www.brevo.com/) → Sign up (free tier: 300 emails/day, unlimited contacts)
2. Confirm your email
3. Skip the onboarding setup if it asks for tracking pixels — we don't need that

## 2. Create the list + DOI template

### Create the list
1. In Brevo: **Contacts** → **Lists** → **Create a list**
2. Name it: `Grenadier Brief` (or whatever you prefer)
3. After creating, click on the list — **note the LIST ID in the URL** (e.g. if URL is `.../lists/4/contacts`, the ID is `4`)

### Set up Double Opt-In (DOI) template
This is the confirmation email subscribers get. Brevo requires it for compliance.

1. **Campaigns** → **Email templates** → **New template** → "Double opt-in confirmation"
2. Use Brevo's pre-built DOI template or customize one
3. Subject line suggestion: `Confirm your subscription to The Grenadier Brief`
4. The body should have a button/link with the confirmation URL placeholder `{{params.DOUBLE_OPT_IN}}`
5. Save and note the **Template ID** (visible in the URL)

### Create the API key
1. **Settings** → **SMTP & API** → **API Keys** → **Generate a new API key**
2. Name it: `grenadiers2026 site signup`
3. Copy the key (starts with `xkeysib-`) — you only see it once

## 3. Configure the server

SSH to the server:

```bash
ssh carelp@iad1-shared-b7-32.dreamhost.com
cd ~/grenadiers2026.com/api
```

Create the `.env` file:

```bash
nano .env
```

Paste this (replacing the placeholders with your real values):

```ini
BREVO_API_KEY=xkeysib-YOUR-KEY-HERE
BREVO_LIST_ID=4
BREVO_DOI_TEMPLATE_ID=1
BREVO_REDIRECT_URL=https://grenadiers2026.com/?subscribed=1
```

Save (Ctrl+O, Enter, Ctrl+X) then lock it down:

```bash
chmod 600 .env
```

That makes it readable only by the web server, not the world.

## 4. Test it

1. Go to https://grenadiers2026.com/
2. Scroll to the email signup
3. Enter a test email + pick a language
4. Click Subscribe
5. You should see "✓ Check your inbox to confirm"
6. Check the email → click confirm → you're added to the list

## Troubleshooting

**Form says "Server not configured":**
- The `.env` file is missing, in the wrong location, or has wrong values
- SSH in, `cat ~/grenadiers2026.com/api/.env` to verify
- Make sure file is `.env` exactly (with leading dot, no extension)

**Form says "Subscription failed":**
- API key may be wrong or revoked. Generate a new one and update `.env`
- List ID may not exist. Check Brevo dashboard.

**Confirmation email never arrives:**
- Check spam folder
- Check Brevo dashboard → Transactional → Logs for the failed send
- Free tier has 300/day limit — could you have hit it?

## What gets stored in Brevo

For each subscriber:
- Email address
- Preferred language (`EN`, `FR`, or `HT`) — stored as `LANGUAGE` attribute
- Sign-up source (`hero` or `footer`) — stored as `SOURCE` attribute

You can use these in Brevo's list segmentation to send language-specific newsletters.

## What's next

Once you have ~50 subscribers, send your first newsletter from Brevo's campaign tool. Keep it short. Three sections max:

1. **Where we are** (countdown to next match)
2. **One story** (link back to grenadiers2026.com)
3. **One quote or photo**

The audience trains itself based on your first few emails. Set the tone.
