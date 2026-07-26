import { useEffect, useRef, useState } from "react";
import { ALL_TECHS, PROJECTS } from "../../constants/softwareEngineerData";
import Reveal from "./Reveal";

export default function TechLookupSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTech, setActiveTech] = useState(null);
  const sectionRef = useRef(null);

  const query = searchQuery.trim().toLowerCase();

  const filteredProjects = query
    ? PROJECTS.filter((project) => project.tags.some((tag) => tag.toLowerCase().includes(query)))
    : activeTech
    ? PROJECTS.filter((project) => project.tags.some((tag) => tag.toLowerCase() === activeTech.toLowerCase()))
    : PROJECTS;

  const numRows = 9;
  const rows = Array.from({ length: numRows }, (_, i) =>
    ALL_TECHS.filter((_, j) => j % numRows === i)
  );

  const handleTechClick = (tech) => {
    setActiveTech(tech);
    setSearchQuery(tech);
  };

  const handleReset = () => {
    setActiveTech(null);
    setSearchQuery("");
  };

  useEffect(() => {
    const onDocClick = (e) => {
      if (sectionRef.current && !sectionRef.current.contains(e.target)) {
        handleReset();
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative overflow-hidden" style={{ background: "#050810", minHeight: "100vh" }}>
      <div className="absolute inset-0 flex flex-col justify-around py-4 overflow-hidden" style={{ zIndex: 1 }}>
        {rows.map((rowTechs, i) => {
          const dir = i % 2 === 0 ? "ltr" : "rtl";
          const dur = 28 + i * 4;
          const items = [...rowTechs, ...rowTechs, ...rowTechs, ...rowTechs];
          return (
            <div key={i} className="overflow-hidden">
              <div
                className="flex gap-10 flex-shrink-0"
                style={{
                  animation: `marquee-${dir} ${dur}s linear infinite`,
                  width: "max-content",
                }}
              >
                {items.map((tech, j) => (
                  <button
                    key={`${i}-${j}`}
                    onClick={() => handleTechClick(tech)}
                    className="font-mono font-bold uppercase tracking-[0.15em] whitespace-nowrap transition-all duration-200"
                    style={{
                      fontSize: "clamp(0.65rem, 1.3vw, 0.95rem)",
                      color:
                        searchQuery || activeTech
                          ? tech.toLowerCase() === (searchQuery || activeTech).toLowerCase()
                            ? "rgba(0,245,196,0.9)"
                            : "rgba(255,255,255,0.12)"
                          : "rgba(255,255,255,0.18)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "0",
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative flex items-center justify-center min-h-screen py-28 px-4" style={{ zIndex: 3, pointerEvents: "none" }}>
        <div className="w-full max-w-[860px]" style={{ pointerEvents: "auto" }}>
          <Reveal>
            <div className="flex items-center gap-3 font-mono text-[0.7rem] text-emerald-400 uppercase tracking-[0.2em] mb-3">
              Tech Stack <span className="w-10 h-px bg-emerald-400 flex-shrink-0" />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h2
              className="font-extrabold tracking-tight mb-1 text-white/90"
              style={{ fontSize: "clamp(1.6rem,3.5vw,2.8rem)", letterSpacing: "-0.02em" }}
            >
              Skills: Lookup Tool
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="font-mono text-white/40 text-[0.82rem] italic mb-5">
              "Can you do X? Do you have experience with Y?"
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div
              className="flex items-center mb-6 border border-white/20 backdrop-blur-xl"
              style={{ background: "rgba(5,8,16,0.78)" }}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setActiveTech(null);
                }}
                placeholder="Type here..."
                className="flex-1 bg-transparent px-5 py-[14px] font-mono text-[0.85rem] text-white placeholder-white/25 outline-none"
              />
              {searchQuery && (
                <button
                  onClick={handleReset}
                  className="px-3 text-white/30 hover:text-white/70 font-mono text-lg transition-colors"
                  style={{ lineHeight: 1 }}
                >
                  x
                </button>
              )}
              <button className="px-5 py-[14px] text-white/50 hover:text-emerald-400 transition-colors border-l border-white/10">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>
            </div>
          </Reveal>

          {filteredProjects.length > 0 && (
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-10" style={{ background: "linear-gradient(to right, rgba(5,8,16,0.95), rgba(5,8,16,0))" }} />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-10" style={{ background: "linear-gradient(to left, rgba(5,8,16,0.95), rgba(5,8,16,0))" }} />
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 snap-x snap-mandatory hide-scrollbar" style={{ WebkitOverflowScrolling: "touch" }}>
                {filteredProjects.map((project, i) => (
                  <Reveal key={`${project.title}-${i}`} delay={i * 55} className="flex-shrink-0 snap-start">
                    <div
                      className="group w-[240px] sm:w-[260px] lg:w-[270px] xl:w-[280px] border border-white/10 p-5 transition-all duration-300 hover:border-emerald-400/40 hover:-translate-y-[2px] backdrop-blur-xl"
                      style={{ background: "rgba(5,8,22,0.85)" }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className={`font-mono text-[0.58rem] tracking-widest uppercase px-2 py-[3px] border ${project.typeColor} ${project.typeBg} ${project.typeBorder}`}>
                          {project.type}
                        </span>
                        <span className="font-mono text-[0.6rem] text-white/30">{project.year}</span>
                      </div>
                      <div className="font-bold text-[0.88rem] leading-snug text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                        {project.title}
                      </div>
                      <div className="text-[0.75rem] text-white/40 leading-relaxed mb-3 line-clamp-3">
                        {project.desc}
                      </div>
                      <div className="flex flex-wrap gap-[5px] mb-3">
                        {project.tags.map((tag) => {
                          const matched =
                            tag.toLowerCase().includes(query) ||
                            tag.toLowerCase() === activeTech?.toLowerCase();
                          return (
                            <span
                              key={tag}
                              className={`font-mono text-[0.58rem] border px-[6px] py-[2px] transition-all duration-200 ${
                                matched
                                  ? "text-emerald-400 border-emerald-400/40 bg-emerald-400/5"
                                  : "text-white/35 border-white/10"
                              }`}
                            >
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                      <button className="text-white/30 hover:text-white/70 transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </button>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {(searchQuery || activeTech) && filteredProjects.length === 0 && (
            <div
              className="text-center font-mono text-[0.78rem] text-white/25 py-10 border border-white/8 backdrop-blur-sm"
              style={{ background: "rgba(5,8,22,0.6)" }}
            >
              No projects found for "{searchQuery || activeTech}"
            </div>
          )}

          {!searchQuery && !activeTech && filteredProjects.length === 0 && (
            <div
              className="text-center font-mono text-[0.72rem] text-white/20 py-8 border border-white/8 backdrop-blur-sm"
              style={{ background: "rgba(5,8,22,0.5)" }}
            >
              No projects available.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
