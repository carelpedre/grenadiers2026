import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import FanWallForm from "../components/FanWallForm";
import { FanMessageCard, WallStatLine } from "../components/FanWall";
import { fetchApprovedMessages, fetchWallOpen, fetchWallStats } from "../lib/fanWallApi";
import { stagger, fadeUp } from "../lib/motion";
import { useT } from "../lib/i18n";

export default function Mur() {
  const { t } = useT();
  const [messages, setMessages] = useState(null);
  const [wallOpen, setWallOpen] = useState(null);
  const [stats, setStats] = useState({ count: 0, countries: 0 });

  const loadMessages = useCallback(() => {
    fetchApprovedMessages(200).then((rows) => setMessages(rows || []));
    fetchWallStats().then(setStats);
  }, []);

  useEffect(() => {
    loadMessages();
    fetchWallOpen().then(setWallOpen);
  }, [loadMessages]);

  const hasMessages = Array.isArray(messages) && messages.length > 0;

  return (
    <div>
      <PageHeader
        eyebrow={t("mur.eyebrow")}
        title={t("mur.title")}
        subtitle={t("mur.subtitle")}
      />

      <div className="max-w-content mx-auto px-5 py-12 md:py-16">
        {/* Formulaire */}
        <div className="max-w-xl mx-auto mb-14">
          <FanWallForm wallOpen={wallOpen} onSubmitted={loadMessages} />
        </div>

        {/* Liste des messages approuvés */}
        <div id="messages" className="border-b border-line pb-3 mb-8 scroll-mt-24">
          <h2 className="font-display text-2xl md:text-3xl">{t("mur.messagesTitle")}</h2>
          {stats.count > 0 ? (
            <WallStatLine count={stats.count} countries={stats.countries} className="text-haiti-blue mt-1" />
          ) : (
            <p className="text-muted text-sm mt-1">{t("mur.beFirst")}</p>
          )}
        </div>

        {messages === null ? (
          <p className="text-muted text-center py-12">{t("common.loading")}</p>
        ) : hasMessages ? (
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={stagger(0.06)}
            initial="hidden"
            animate="show"
          >
            {messages.map((m) => (
              <motion.div key={m.id} variants={fadeUp}>
                <FanMessageCard m={m} className="h-full" />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-muted text-center py-12">
            {t("mur.empty")}
          </p>
        )}
      </div>
    </div>
  );
}
