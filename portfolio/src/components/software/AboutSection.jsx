import { EXPERIENCE } from "../../constants/softwareEngineerData";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

export default function AboutSection() {
  return (
    <section id="about" className="px-16 py-32" style={{ background: "#090d1a" }}>
      <Reveal>
        <SectionLabel>About Me</SectionLabel>
      </Reveal>
      <Reveal delay={100}>
        <h2
          className="font-extrabold tracking-tight text-white mb-12"
          style={{ fontSize: "clamp(2rem,4vw,3.5rem)", letterSpacing: "-0.02em" }}
        >
          Who I Am
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <Reveal delay={150}>
          <div className="space-y-5 text-white/55 leading-[1.9] text-[1rem]">
            <p>
              I'm a <strong className="text-white font-semibold">Full Stack Software Engineer</strong> passionate about
              crafting high-quality digital experiences. I specialize in building fast, scalable, and accessible web
              applications from the ground up.
            </p>
            <p>
              With a strong foundation in both <strong className="text-white font-semibold">frontend and backend development</strong>,
              I enjoy working across the entire stack - designing RESTful APIs, optimizing databases, and building pixel-perfect
              UIs that users love.
            </p>
            <p>
              When I'm not shipping features, you'll find me exploring new technologies, contributing to open source, or
              mentoring fellow developers.
            </p>
          </div>
        </Reveal>
        <Reveal delay={250}>
          <div className="relative border border-emerald-400/15 bg-[#111827] p-8 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 to-violet-500" />
            <p className="font-mono text-[0.68rem] text-emerald-400 uppercase tracking-[0.15em] mb-5">// Experience</p>
            {EXPERIENCE.map((entry, i) => (
              <div key={entry.role}>
                {i > 0 && <hr className="border-0 border-t border-emerald-400/15 my-4" />}
                <div className="font-bold text-[0.92rem] text-white">{entry.role}</div>
                <div className="font-mono text-[0.78rem] text-violet-400 my-[3px]">{entry.company}</div>
                <div className="font-mono text-[0.68rem] text-white/40">{entry.period}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
