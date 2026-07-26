import ParticleCanvas from "./ParticleCanvas";

export default function HeroSection({ nameBase, nameTail, tailActive }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#050a06" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,245,196,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,196,0.04) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 30%, rgba(0,245,196,0.18), transparent 70%), radial-gradient(40% 40% at 70% 35%, rgba(123,97,255,0.12), transparent 70%)",
        }}
      />
      <ParticleCanvas />

      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center"
        style={{ animation: "fade-in 0.9s ease 0.4s both" }}
      >
        <div className="flex flex-col items-center text-center space-y-2">
          <p
            className="font-sans text-[clamp(1rem,1.8vw,1.3rem)] text-white/80"
            style={{ animation: "fade-in 0.7s ease 0.2s both" }}
          >
            Hello, I am
          </p>
          <h1
            className="font-sans font-extrabold text-white leading-[0.88] tracking-tight select-none"
            style={{ fontSize: "clamp(90px,18vw,220px)", letterSpacing: "-0.03em" }}
          >
            <span className="name-reveal name-underline">
              {nameBase}
              <span className={`name-last${tailActive ? " active" : ""}`}>
                {nameTail}
              </span>
            </span>
          </h1>
          <div className="mt-5 flex flex-col items-center text-center gap-2">
            <h2 className="text-[clamp(1.1rem,2.2vw,1.55rem)] font-bold text-white leading-tight tracking-tight">
              an aspiring software engineer.
            </h2>
            <p className="font-mono text-[0.68rem] text-white/35 uppercase tracking-[0.08em]">2413th</p>
            <p className="text-[clamp(0.85rem,1.5vw,1.05rem)] font-semibold text-white/75">
              traveler, please scroll down
            </p>
            <svg className="mt-2 opacity-60" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 2 L30 16 L16 30 L2 16 Z" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" />
              <path d="M16 7 L25 16 L16 25 L7 16 Z" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
