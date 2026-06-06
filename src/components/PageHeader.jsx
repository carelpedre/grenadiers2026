export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="bg-ink text-bg">
      <div className="max-w-content mx-auto px-5 py-16 md:py-24">
        {eyebrow && (
          <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-4">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-4xl md:text-6xl mb-4">{title}</h1>
        {subtitle && (
          <p className="text-bg/70 text-lg md:text-xl max-w-prose">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
