export default function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[0.7rem] text-emerald-400 uppercase tracking-[0.2em] mb-3">
      {children}
      <span className="w-10 h-px bg-emerald-400 flex-shrink-0" />
    </div>
  );
}
