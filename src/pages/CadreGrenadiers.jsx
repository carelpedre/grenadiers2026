import PageHeader from "../components/PageHeader";
import CadreComposer from "../components/CadreComposer";
import { useT } from "../lib/i18n";

// ╔══════════════════════════════════════════════════════════════════╗
// ║  /cadre-grenadiers · cadre de partage (sans connexion)            ║
// ║                                                                    ║
// ║  Page publique : compose une photo dans le cadre Grenadiers 2026   ║
// ║  et partage depuis l'appareil. 100% client, rien n'est envoyé.    ║
// ╚══════════════════════════════════════════════════════════════════╝

export default function CadreGrenadiers() {
  const { t } = useT();
  return (
    <div className="bg-bg">
      <PageHeader
        eyebrow={t("cadre.pageEyebrow")}
        title={t("cadre.pageTitle")}
        subtitle={t("cadre.pageSubtitle")}
      />
      <div className="max-w-content mx-auto px-5 py-12 md:py-16">
        <div className="max-w-xl mx-auto">
          <CadreComposer />
        </div>
      </div>
    </div>
  );
}
