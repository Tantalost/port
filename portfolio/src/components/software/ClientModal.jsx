export default function ClientModal({ client, onClose }) {
  if (!client) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-6"
      style={{ background: "rgba(5,8,16,0.85)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <div
        className="relative border border-white/12 overflow-hidden w-full max-w-[640px] max-h-[90vh] overflow-y-auto"
        style={{
          background: "rgba(10,14,30,0.98)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,245,196,0.08)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, #00f5c4, #7b61ff)" }} />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center border border-white/15 text-white/40 hover:text-white hover:border-white/40 transition-all duration-200 font-mono text-lg"
          style={{ background: "rgba(255,255,255,0.04)", lineHeight: 1 }}
        >
          x
        </button>

        <div
          className="relative w-full border-b border-white/8"
          style={{ height: "220px", background: "rgba(5,8,20,0.9)" }}
        >
          {client.systemImage ? (
            <img src={client.systemImage} alt={`${client.name} system`} className="w-full h-full object-cover object-top" />
          ) : (
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-2"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,245,196,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,196,0.03) 1px,transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
              </svg>
              <span className="font-mono text-[0.58rem] text-white/18 uppercase tracking-[0.18em]">system screenshot</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1e] via-transparent to-transparent" />
        </div>

        <div className="p-7">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex items-center gap-4">
              <div className={`w-13 h-13 w-12 h-12 flex-shrink-0 overflow-hidden border border-white/10 ${!client.clientImage ? client.logoBg : ""}`}>
                {client.clientImage ? (
                  <img src={client.clientImage} alt={client.name} className="w-full h-full object-cover" />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center font-mono font-bold text-[0.85rem] tracking-widest ${client.logoColor}`}>
                    {client.logo}
                  </div>
                )}
              </div>
              <div>
                <div className={`font-bold text-[1.2rem] leading-tight ${client.industryColor}`}>{client.name}</div>
                <div className="font-mono text-[0.62rem] text-white/35 mt-[3px]">{client.period}</div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className={`font-mono text-[0.58rem] tracking-widest uppercase px-2 py-[3px] border ${client.industryColor} ${client.industryBg} ${client.industryBorder}`}>
                {client.industry}
              </span>
              <span className={`font-mono text-[0.7rem] font-bold ${client.industryColor}`}>{client.highlight}</span>
            </div>
          </div>

          <p className="text-[0.9rem] text-white/55 leading-[1.85] mb-6">{client.desc}</p>

          <div className="mb-6">
            <p className="font-mono text-[0.6rem] text-white/25 uppercase tracking-[0.15em] mb-3">Deliverables</p>
            <div className="flex flex-wrap gap-2">
              {client.deliverables.map((deliverable) => (
                <span key={deliverable} className="font-mono text-[0.65rem] text-white/60 border border-white/12 px-3 py-[5px]">
                  {deliverable}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-[6px] pt-4 border-t border-white/8">
            {client.tags.map((tag) => (
              <span
                key={tag}
                className={`font-mono text-[0.6rem] border px-[8px] py-[3px] ${client.industryColor} border-current opacity-60`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
