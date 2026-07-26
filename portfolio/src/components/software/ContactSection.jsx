import { CONTACT_EMAIL, CONTACT_LINKS } from "../../constants/softwareEngineerData";
import Reveal from "./Reveal";

export default function ContactSection() {
  return (
    <section id="contact" className="px-16 py-32 relative overflow-hidden text-center" style={{ background: "#050810" }}>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(123,97,255,0.08) 0%, transparent 70%)" }}
      />
      <div className="relative z-10">
        <Reveal>
          <p className="font-mono text-[0.75rem] text-emerald-400 uppercase tracking-[0.2em] mb-5">Let's work together</p>
        </Reveal>
        <Reveal delay={100}>
          <h2
            className="font-extrabold text-white leading-none tracking-tight mb-5"
            style={{ fontSize: "clamp(2.5rem,5vw,5rem)", letterSpacing: "-0.03em" }}
          >
            Got a project<br />in{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#7b61ff,#ff4d8d)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              mind?
            </span>
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p className="text-white/45 text-[1rem] max-w-[440px] mx-auto mb-10 leading-[1.8]">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </Reveal>
        <Reveal delay={250}>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-3 font-mono text-[1.05rem] text-emerald-400 border-b border-emerald-400/30 pb-1 no-underline hover:border-emerald-400 hover:tracking-wider transition-all duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            {CONTACT_EMAIL}
          </a>
        </Reveal>
        <Reveal delay={320}>
          <div className="flex items-center justify-center gap-6 mt-10">
            {CONTACT_LINKS.map(({ label, href, download }) => (
              <a
                key={label}
                href={href}
                target={download ? undefined : "_blank"}
                rel={download ? undefined : "noopener noreferrer"}
                download={download || undefined}
                className="font-mono text-[0.68rem] text-white/40 hover:text-emerald-400 uppercase tracking-widest no-underline transition-colors duration-300"
              >
                {label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
