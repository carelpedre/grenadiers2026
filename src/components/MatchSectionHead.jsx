// Condensed-caps section header with a Haiti flag rule, for the match pages
// (the 2026 broadcast system). Keeps the type scale consistent across /matches
// and /live.
export default function MatchSectionHead({ children, sub, className = "" }) {
  return (
    <div className={`mb-6 ${className}`}>
      <span className="flag-rule block w-8 rounded-full mb-3" />
      <h2 className="font-cond text-2xl md:text-3xl font-bold uppercase tracking-tight leading-none text-ink">
        {children}
      </h2>
      {sub && <p className="text-muted text-sm mt-2">{sub}</p>}
    </div>
  );
}
