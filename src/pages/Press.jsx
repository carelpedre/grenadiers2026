import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import { fadeUp, stagger, CountUpNumber } from "../lib/motion";
import { squadStats } from "../data/squad";

// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  PRESS KIT                                                             ║
// ║  /press — a one-stop resource for journalists covering Haiti at the    ║
// ║  2026 FIFA World Cup.                                                  ║
// ║                                                                        ║
// ║  Built so that any reporter who lands here has everything they need:   ║
// ║  facts, quotes, photos, logos, contact info, permissions.              ║
// ╚═══════════════════════════════════════════════════════════════════════╝

export default function Press() {
  return (
    <div>
      <PageHeader
        eyebrow="For media · For journalists"
        title="Press resources"
        subtitle="Everything you need to cover Haiti at the 2026 FIFA World Cup. Facts, photos, quotes, logos. Use freely with attribution."
      />

      <div className="max-w-content mx-auto px-5 py-12 md:py-16 space-y-16">

        {/* Quick contact strip */}
        <section className="bg-haiti-blue text-bg rounded-2xl p-8 md:p-10">
          <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <p className="text-xs uppercase tracking-wider font-bold text-bg/60 mb-2">
                Press inquiries
              </p>
              <h2 className="font-display text-2xl md:text-3xl mb-3">
                Need a quote, an interview, or context?
              </h2>
              <p className="text-bg/80 leading-relaxed max-w-2xl">
                Carel Pedre and the Chokarella Media team are available for interviews, quotes, fact-checking, and on-the-ground reporting from Haiti. Working in English, French, and Haitian Creole.
              </p>
            </div>
            <a
              href="mailto:contact@grenadiers2026.com?subject=Press inquiry — Haiti World Cup 2026&body=Outlet:%0AReporter:%0ADeadline:%0AWhat we need:%0A"
              className="inline-flex items-center gap-2 px-6 py-3 bg-haiti-red hover:bg-haiti-red-dark text-bg font-semibold rounded-full transition-colors whitespace-nowrap"
            >
              Contact the team →
            </a>
          </div>
        </section>

        {/* At a glance — quick facts */}
        <section>
          <SectionHeader
            eyebrow="At a glance"
            title="The campaign in numbers"
            subtitle="Copy and paste freely. All figures verified."
          />
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <FactBlock value={<><CountUpNumber target={52} duration={1500} /></>} label="Years since last World Cup" detail="Last appearance: 1974, West Germany" />
            <FactBlock value={<><CountUpNumber target={26} duration={1500} /></>} label="Players in the squad" detail="Playing for clubs in 11 countries" />
            <FactBlock value="3" label="Group C opponents" detail="Brazil · Scotland · Morocco" />
            <FactBlock value={<><CountUpNumber target={1142} duration={1800} /></>} label="Minutes" detail="Zoff's streak ended by Sanon, 1974" />
          </motion.div>
        </section>

        {/* The story — boilerplate paragraph for reporters to use */}
        <section className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
          <div>
            <SectionHeader
              eyebrow="The story"
              title="Boilerplate"
              subtitle="A 100-word summary you can use verbatim or rephrase. With attribution to Chokarella Media."
            />
            <div className="bg-bg border-l-4 border-haiti-red pl-6 py-2 italic text-ink/90 leading-relaxed">
              <p>
                Haiti will play at the FIFA World Cup for the first time in 52 years when the Caribbean nation faces Scotland, Brazil, and Morocco in Group C of the 2026 tournament. The Grenadiers last appeared at a World Cup in 1974, where forward Emmanuel "Manno" Sanon famously ended Italy goalkeeper Dino Zoff's 1,142-minute shutout streak. Head coach Sébastien Migné — based in France, working with players at clubs in eleven countries — named a 26-player squad on May 16, 2026. Captain Johny Placide leads with 80+ caps; striker Duckens Nazon is the nation's all-time top scorer with 44 international goals.
              </p>
            </div>
            <button
              onClick={(e) => {
                const text = `Haiti will play at the FIFA World Cup for the first time in 52 years when the Caribbean nation faces Scotland, Brazil, and Morocco in Group C of the 2026 tournament. The Grenadiers last appeared at a World Cup in 1974, where forward Emmanuel "Manno" Sanon famously ended Italy goalkeeper Dino Zoff's 1,142-minute shutout streak. Head coach Sébastien Migné — based in France, working with players at clubs in eleven countries — named a 26-player squad on May 16, 2026. Captain Johny Placide leads with 80+ caps; striker Duckens Nazon is the nation's all-time top scorer with 44 international goals.`;
                navigator.clipboard.writeText(text);
                e.currentTarget.textContent = "Copied ✓";
                setTimeout(() => { e.currentTarget.textContent = "Copy boilerplate"; }, 2000);
              }}
              className="mt-4 inline-flex items-center gap-2 text-sm text-haiti-blue hover:text-haiti-red font-semibold transition-colors"
            >
              Copy boilerplate
            </button>
          </div>
        </section>

        {/* Fixtures table for reporters */}
        <section>
          <SectionHeader
            eyebrow="Group C fixtures"
            title="The schedule"
            subtitle="All three matches in US Eastern time. Two of three are American primetime — large reach across North America."
          />
          <div className="overflow-x-auto -mx-5 md:mx-0">
            <table className="w-full border-collapse min-w-[640px]">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-muted border-b border-line">
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Fixture</th>
                  <th className="py-3 px-3">Venue</th>
                  <th className="py-3 px-3">Kickoff</th>
                </tr>
              </thead>
              <tbody className="font-display">
                <FixtureRow date="Sat, June 13, 2026" fixture="Haiti vs Scotland" venue="Gillette Stadium, Foxborough, MA" time="9:00 PM ET" />
                <FixtureRow date="Fri, June 19, 2026" fixture="Brazil vs Haiti" venue="Lincoln Financial Field, Philadelphia, PA" time="9:00 PM ET" />
                <FixtureRow date="Wed, June 24, 2026" fixture="Morocco vs Haiti" venue="Mercedes-Benz Stadium, Atlanta, GA" time="6:00 PM ET" />
              </tbody>
            </table>
          </div>
        </section>

        {/* Key people */}
        <section>
          <SectionHeader
            eyebrow="Key people"
            title="Who to know"
          />
          <div className="grid md:grid-cols-2 gap-6">
            <PersonCard
              role="Head Coach"
              name="Sébastien Migné"
              detail="French. Appointed in early 2024. Has not yet visited Haiti due to the security situation. Previously assistant to Rigobert Song with Cameroon at the 2022 World Cup in Qatar and the 2023 Africa Cup of Nations (played early 2024 in Ivory Coast). Earlier head-coaching roles: Equatorial Guinea, Kenya, Congo."
            />
            <PersonCard
              role="Captain"
              name="Johny Placide"
              detail="Goalkeeper. Plays for Bastia in France. The senior figure in the dressing room."
            />
            <PersonCard
              role="Star — midfield"
              name="Jean-Ricner Bellegarde"
              detail="Premier League midfielder at Wolverhampton Wanderers. Switched allegiance from France to Haiti in August 2025."
            />
            <PersonCard
              role="Star — striker"
              name="Frantzdy Pierrot"
              detail="33 international goals in 49 caps. Born in Cap-Haïtien, raised in Massachusetts. On loan at Çaykur Rizespor (Turkey) from AEK Athens (Greece). 473K Instagram followers."
            />
            <PersonCard
              role="All-time top scorer"
              name="Duckens Nazon"
              detail="44 international goals — Haiti's all-time leader. Plays for Esteghlal in Iran."
            />
            <PersonCard
              role="The Violette midfielder"
              name="Woodensky Pierre"
              detail="Defensive midfielder, age 21. Plays for Violette AC in Port-au-Prince — the same club that supplied Pierre Bayonne to the 1974 World Cup and where Philippe Vorbe (who assisted Sanon's 1974 goal) made his name. The continuity is real."
            />
          </div>
        </section>

        {/* Photo and asset library */}
        <section>
          <SectionHeader
            eyebrow="Visual assets"
            title="Photos and logos"
            subtitle="Available for editorial use with credit to Chokarella Media. Email contact@grenadiers2026.com for high-resolution files, additional photos, or specific requests."
          />
          <div className="grid md:grid-cols-3 gap-6">
            <AssetTile
              title="Squad photos"
              description="Individual player portraits, training camp images, team photos."
              cta="Request files"
              email="contact@grenadiers2026.com?subject=Photo request — Squad"
            />
            <AssetTile
              title="Logos & flags"
              description="Site logo, Haiti flag (SVG + PNG), Chokarella Media logo."
              cta="Request files"
              email="contact@grenadiers2026.com?subject=Logo request"
            />
            <AssetTile
              title="Documentary footage"
              description="Trailer clips and selected b-roll from Chokarella's coverage."
              cta="Request files"
              email="contact@grenadiers2026.com?subject=Documentary footage request"
            />
          </div>
        </section>

        {/* About Chokarella + Carel */}
        <section className="bg-line/30 border border-line rounded-2xl p-8 md:p-10">
          <SectionHeader
            eyebrow="About this project"
            title="grenadiers2026.com is built by Chokarella Media"
          />
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-display text-lg mb-3">Chokarella Media</h3>
              <p className="text-ink/80 leading-relaxed text-sm mb-3">
                A Haitian-owned independent media company founded in 2010 by Carel Pedre. Operates a combined audience of 2.9 million followers across Instagram, Facebook, X, YouTube, and TikTok. Produces flagship shows <em>Carel in the Morning</em> and <em>De Tout Et De Rien</em>.
              </p>
              <p className="text-ink/80 leading-relaxed text-sm">
                grenadiers2026.com is an unofficial site, independently editorial, covering Haiti at the 2026 FIFA World Cup.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg mb-3">Carel Pedre</h3>
              <p className="text-ink/80 leading-relaxed text-sm mb-3">
                Haitian media personality, producer, host, and broadcaster with 30+ years of experience. Founder of Chokarella Media LLC. Has covered Haitian football for two decades. Available for interviews in English, French, and Haitian Creole.
              </p>
              <p className="text-ink/80 leading-relaxed text-sm">
                Speaker at Harvard Kennedy School (2023), TEDxPointeàPitre. Shorty Awards 2012 (Humanitarian). NYC Council 2025 proclamation. Featured in CNN, France Antilles, TV Technology, <em>Kreyolicious</em> ("Haiti's Radio King").
              </p>
            </div>
          </div>
        </section>

        {/* Story angles — content prompts for journalists */}
        <section>
          <SectionHeader
            eyebrow="Story angles"
            title="Beyond the box score"
            subtitle="Twelve narrative threads worth following. Pitch your editor."
          />
          <div className="grid md:grid-cols-2 gap-4">
            <AngleCard
              title="The 52-year wait"
              detail="Last appearance: West Germany 1974. The longest gap between World Cups of any participating CONCACAF nation. What does it mean for a country to come back this slowly?"
            />
            <AngleCard
              title="A coach who's never been"
              detail="Sébastien Migné has managed Haiti for 26 months without setting foot in the country, due to the security situation. He has built a World Cup squad from clips, calls, and tape. The first time he meets some of his players in person was at training camp in Florida."
            />
            <AngleCard
              title="Stade Sylvio Cator"
              detail="Haiti's national stadium has been under armed-gang control since March 2024. The national team had no home venue during qualifying — Curaçao became their adopted home. What does it mean to qualify for a World Cup without ever playing at home?"
            />
            <AngleCard
              title="The Violette thread"
              detail="Violette AC of Port-au-Prince supplied Pierre Bayonne to the 1974 World Cup squad. Philippe Vorbe, who set up Sanon's iconic goal that year, was a Violette legend whose name still defines the club. In 2026, Violette's Woodensky Pierre joins the squad. The continuity is structural, not symbolic."
            />
            <AngleCard
              title="Bellegarde's switch"
              detail="Premier League midfielder Jean-Ricner Bellegarde switched international allegiance from France to Haiti in August 2025. Why? What does he say about it? What does it mean for the squad?"
            />
            <AngleCard
              title="The Sanon legacy"
              detail="Manno Sanon's son Sebastien is now Haitian-American. The family has been keepers of the 1974 flame for 52 years. Available for interviews; reach via contact@grenadiers2026.com."
            />
            <AngleCard
              title="Two American primetimes"
              detail="Match vs Scotland (June 13, 9 PM ET, Foxborough) and Brazil (June 19, 9 PM ET, Philadelphia) are both in American primetime. The 9 PM ET kickoffs are unusual for a small-nation World Cup match — FIFA's bet on US diaspora interest."
            />
            <AngleCard
              title="The base camp"
              detail="Haiti's FIFA Team Base Camp is Stockton University in Galloway, NJ — a school that previously hosted Saudi Arabia 1994 and Nigeria's gold-winning Olympic team 1996. Two players have local ties: Danley Jean Jacques (Philadelphia Union, short drive away) and Duke Lacroix (grew up in Plumsted Township, NJ)."
            />
            <AngleCard
              title="The diaspora watch parties"
              detail="South Florida, Brooklyn, Boston, Montréal, Paris — Haitian community gatherings for every match. Submission form at /watch-parties. Color, energy, food, music — visual stories everywhere."
            />
            <AngleCard
              title="The Concacaf path"
              detail="Haiti qualified via the third round of CONCACAF qualifying — clinched November 18, 2025, against Nicaragua. November 18 is also Haiti's national holiday marking the Battle of Vertières (1803). The date coincidence is not lost on Haitian fans."
            />
            <AngleCard
              title="The music of the campaign"
              detail="Konpa, Rap Kreyòl, Rasin — Haitian artists are writing original songs for the team. Spotify playlist at /the-coverage. Music videos by Sincerely Suav, Halfdan + BIC, others. The cultural ecosystem around the team is its own story."
            />
            <AngleCard
              title="Group C math"
              detail="Brazil is the favorite. Morocco reached the semifinals at Qatar 2022. Scotland are returning to the World Cup after 28 years. Haiti faces three teams who, by most projections, will be tougher opponents than Haiti was for any of them. Underdog math, but real football."
            />
          </div>
        </section>

        {/* Key dates timeline */}
        <section>
          <SectionHeader
            eyebrow="Timeline"
            title="Key dates"
            subtitle="The road from qualification to the group stage."
          />
          <div className="border-l-2 border-line pl-6 space-y-6">
            <TimelineEvent date="November 18, 2025" event="Haiti clinches World Cup qualification vs. Nicaragua. Coincides with Haitian national holiday (Battle of Vertières)." />
            <TimelineEvent date="December 5, 2025" event="FIFA World Cup 2026 group draw. Haiti placed in Group C with Brazil, Morocco, Scotland." />
            <TimelineEvent date="March 29 & 31, 2026" event="March friendlies vs. Tunisia (0-1 L) and Iceland (1-1 D) at BMO Field, Toronto. Squad evaluation window." />
            <TimelineEvent date="May 16, 2026" event="Migné announces final 26-man squad." />
            <TimelineEvent date="May 19, 2026" event="FIFA Team Base Camp at Stockton University, NJ announced." />
            <TimelineEvent date="May 24 – June 8, 2026" event="Phase 1 training camp at voco Sandpiper Resort, Port St. Lucie, FL." />
            <TimelineEvent date="June 2, 2026" event="Friendly vs. New Zealand at Inter Miami CF Stadium, Fort Lauderdale. 7:30 PM ET." />
            <TimelineEvent date="June 5, 2026" event="Friendly vs. Peru at Nu Stadium, Miami. 7:30 PM ET. First-ever international friendly at Nu Stadium." />
            <TimelineEvent date="June 8, 2026" event="Squad arrives at Stockton University base camp, NJ." />
            <TimelineEvent date="June 13, 2026" event="MATCH 1 — Haiti vs. Scotland. Gillette Stadium, Foxborough MA. 9:00 PM ET." featured />
            <TimelineEvent date="June 19, 2026" event="MATCH 2 — Brazil vs. Haiti. Lincoln Financial Field, Philadelphia PA. 9:00 PM ET." featured />
            <TimelineEvent date="June 24, 2026" event="MATCH 3 — Morocco vs. Haiti. Mercedes-Benz Stadium, Atlanta GA. 6:00 PM ET." featured />
          </div>
        </section>

        <section className="border-t border-line pt-12">
          <SectionHeader
            eyebrow="Terms"
            title="Permissions & attribution"
          />
          <div className="max-w-none text-ink/80 leading-relaxed text-sm space-y-3">
            <p>
              <strong className="text-ink">Text on this site:</strong> May be quoted in news reporting with attribution to <em>grenadiers2026.com / Chokarella Media</em>. For longer-form use, please request permission.
            </p>
            <p>
              <strong className="text-ink">Photographs & video:</strong> Available for editorial use with credit. Commercial use requires written permission. Email <a href="mailto:contact@grenadiers2026.com" className="text-haiti-blue hover:text-haiti-red underline">contact@grenadiers2026.com</a>.
            </p>
            <p>
              <strong className="text-ink">Interviews & quotes:</strong> All quotes attributed to named subjects on this site are on the record and may be cited.
            </p>
            <p>
              <strong className="text-ink">Logos:</strong> The Chokarella Media logo and the grenadiers2026 mark may be used in coverage of this project. May not be used in a way that implies endorsement.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-6">
      <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-2">{eyebrow}</p>
      <h2 className="font-display text-2xl md:text-3xl text-ink mb-2">{title}</h2>
      {subtitle && <p className="text-muted leading-relaxed max-w-2xl">{subtitle}</p>}
    </div>
  );
}

function FactBlock({ value, label, detail }) {
  return (
    <motion.div variants={fadeUp} className="border-l-2 border-haiti-red pl-4">
      <div className="font-display text-3xl md:text-4xl text-haiti-blue tabular-nums">{value}</div>
      <div className="text-xs uppercase tracking-wider text-ink font-semibold mt-1">{label}</div>
      <div className="text-xs text-muted mt-1">{detail}</div>
    </motion.div>
  );
}

function FixtureRow({ date, fixture, venue, time }) {
  return (
    <tr className="border-b border-line last:border-b-0">
      <td className="py-4 px-3 text-sm text-muted whitespace-nowrap">{date}</td>
      <td className="py-4 px-3 text-base font-display">{fixture}</td>
      <td className="py-4 px-3 text-sm text-ink">{venue}</td>
      <td className="py-4 px-3 text-sm text-ink tabular-nums whitespace-nowrap">{time}</td>
    </tr>
  );
}

function PersonCard({ role, name, detail }) {
  return (
    <div className="bg-white border border-line rounded-lg p-5">
      <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-1">{role}</p>
      <h3 className="font-display text-lg mb-2">{name}</h3>
      <p className="text-ink/80 leading-relaxed text-sm">{detail}</p>
    </div>
  );
}

function AssetTile({ title, description, cta, email }) {
  return (
    <div className="border border-line rounded-lg p-5 hover:border-haiti-red transition-colors flex flex-col">
      <h3 className="font-display text-lg mb-2">{title}</h3>
      <p className="text-muted text-sm leading-relaxed mb-4 flex-1">{description}</p>
      <a
        href={`mailto:${email}`}
        className="text-sm font-semibold text-haiti-blue hover:text-haiti-red transition-colors"
      >
        {cta} →
      </a>
    </div>
  );
}

function AngleCard({ title, detail }) {
  return (
    <div className="border border-line rounded-lg p-5 hover:border-haiti-red transition-colors bg-white">
      <h3 className="font-display text-lg mb-2 text-ink">{title}</h3>
      <p className="text-muted text-sm leading-relaxed">{detail}</p>
    </div>
  );
}

function TimelineEvent({ date, event, featured }) {
  return (
    <div className="relative">
      <div className={`absolute -left-[1.6rem] top-2 w-3 h-3 rounded-full ${featured ? "bg-haiti-red ring-4 ring-haiti-red/20" : "bg-haiti-blue"}`}></div>
      <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4">
        <span className={`text-sm font-display whitespace-nowrap ${featured ? "text-haiti-red font-bold" : "text-ink/60"}`}>
          {date}
        </span>
        <span className={`text-sm leading-relaxed ${featured ? "text-ink font-semibold" : "text-ink/80"}`}>
          {event}
        </span>
      </div>
    </div>
  );
}
