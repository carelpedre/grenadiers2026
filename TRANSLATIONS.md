# How to edit translations

The whole site is multilingual: **English**, **Français**, **Kreyòl Ayisyen**. All visible text comes from one file:

```
src/lib/translations.js
```

## File structure

Each piece of text is stored as a "key" with three translations:

```js
"home.hero.title2": {
  en: "are back.",
  fr: "sont de retour.",
  ht: "tounen.",
},
```

- `en` = English (the master version)
- `fr` = Français
- `ht` = Kreyòl Ayisyen

## How to fix a bad Creole translation

**Example**: you don't like "Grenadye yo tounen." Maybe it should be "Grenadye yo retounen."

1. Open `src/lib/translations.js`
2. Search (Cmd+F) for the English text: `are back.`
3. You'll see this:
   ```js
   "home.hero.title2": {
     en: "are back.",
     fr: "sont de retour.",
     ht: "tounen.",
   },
   ```
4. Change the `ht` line:
   ```js
   ht: "retounen.",
   ```
5. Save the file.
6. Refresh the browser (Cmd+Shift+R). The translation updates everywhere on the site that uses this key.

## How to add a new translation

If you see text on the site that's still in English even when you've picked Creole or French, that's text that hasn't been translated yet. To add it:

1. Find the file showing the English (e.g. `src/pages/Home.jsx`)
2. Replace the hardcoded English with a `t()` call:
   ```jsx
   // Before:
   <h2>Latest news</h2>

   // After:
   <h2>{t("home.latestNews")}</h2>
   ```
3. Add the key to `src/lib/translations.js`:
   ```js
   "home.latestNews": {
     en: "Latest news",
     fr: "Dernières nouvelles",
     ht: "Dènye nouvèl",
   },
   ```
4. At the top of the file using it, make sure these two lines are there:
   ```js
   import { useT } from "../lib/i18n";
   // ...and inside the component:
   const { t } = useT();
   ```

## Notes on the Creole translations

The Creole translations are a first draft. They use the modernized Akademi Kreyòl Ayisyen orthography but may not always sound native. **Some specific things to watch:**

- "Watch party" — kept as-is because it's the term Haitians actually use
- "Match" — kept as French/English (universal in football)
- "Grenadye" vs "Grenadier" — used the Kreyòl spelling "Grenadye"
- "FIFA World Cup" — kept in English (the official name everyone knows)

Where I made educated guesses on terminology, mark them and update with the Kreyòl that actually sounds right to a Haitian ear. Your Kreyòl is better than mine.

## What's translated already

- Site navigation (header + footer)
- Language picker
- Home page (hero, sections, buttons)
- All page headers (Squad, Matches, Watch Parties, Stories, Anthem, Federation, History)
- Squad page stats labels
- Common labels (Captain, Star, View profile, etc.)

## What's NOT yet translated (still in English)

- Story body content (the 4 written articles)
- The 1974 history article ("The 70 minutes")
- Player bios in the player modal
- Friendly match results details
- Watch party listings
- Sponsor placement text
- Specific dates/times like "Saturday, June 13"

These would be a significant additional translation effort. The framework is in place — when you're ready, anyone can add them by following the steps above.
