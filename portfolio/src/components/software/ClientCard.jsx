export default function ClientCard({ client, onSelect, isSelected }) {
  return (
    <div
      onClick={() => onSelect && onSelect(client)}
      className="group relative border overflow-hidden flex-shrink-0"
      style={{
        width: "clamp(340px, 36vw, 520px)",
        background: "rgba(10,14,30,0.9)",
        borderColor: isSelected ? "rgba(0,245,196,0.5)" : "rgba(255,255,255,0.07)",
        cursor: "pointer",
        transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = "rgba(0,245,196,0.35)";
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,245,196,0.07)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{ background: "linear-gradient(90deg, #00f5c4, #7b61ff)" }}
      />

      <div
        className="relative w-full overflow-hidden border-b border-white/6"
        style={{ height: "180px", background: "rgba(5,8,20,0.8)" }}
      >
        {client.systemImage ? (
          <img
            src={client.systemImage}
            alt={`${client.name} system`}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
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

      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 flex-shrink-0 overflow-hidden border border-white/10 ${!client.clientImage ? client.logoBg : ""}`}>
              {client.clientImage ? (
                <img src={client.clientImage} alt={client.name} className="w-full h-full object-cover" />
              ) : (
                <div className={`w-full h-full flex items-center justify-center font-mono font-bold text-[0.78rem] tracking-widest ${client.logoColor}`}>
                  {client.logo}
                </div>
              )}
            </div>
            <div>
              <div className="font-bold text-[1rem] text-white/90 leading-tight group-hover:text-emerald-400 transition-colors duration-300">
                {client.name}
              </div>
              <div className="font-mono text-[0.6rem] text-white/30 mt-[2px]">{client.period}</div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <span className={`font-mono text-[0.56rem] tracking-widest uppercase px-2 py-[3px] border ${client.industryColor} ${client.industryBg} ${client.industryBorder}`}>
              {client.industry}
            </span>
            <span className={`font-mono text-[0.65rem] font-bold ${client.industryColor}`}>{client.highlight}</span>
          </div>
        </div>

        <p className="text-[0.82rem] text-white/48 leading-[1.8] mb-4 line-clamp-3">{client.desc}</p>

        <div className="mb-4">
          <p className="font-mono text-[0.56rem] text-white/22 uppercase tracking-[0.15em] mb-2">Deliverables</p>
          <div className="flex flex-wrap gap-[6px]">
            {client.deliverables.map((deliverable) => (
              <span
                key={deliverable}
                className="font-mono text-[0.62rem] text-white/50 border border-white/10 px-[8px] py-[3px] group-hover:text-white/70 transition-colors duration-200"
              >
                {deliverable}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-[5px] pt-3 border-t border-white/6">
          {client.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[0.58rem] text-white/30 border border-white/8 px-[6px] py-[2px] group-hover:text-emerald-400 group-hover:border-emerald-400/25 transition-all duration-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
