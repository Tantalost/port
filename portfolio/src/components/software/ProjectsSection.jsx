import { useState } from "react";
import { CLIENTS, PROJECTS } from "../../constants/softwareEngineerData";
import ClientCard from "./ClientCard";
import ClientModal from "./ClientModal";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

export default function ProjectsSection() {
  const [showClients, setShowClients] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const r1 = [PROJECTS[0], PROJECTS[1], PROJECTS[2], PROJECTS[3], PROJECTS[4]];
  const r2 = [PROJECTS[5], PROJECTS[6], PROJECTS[7], PROJECTS[3], PROJECTS[1]];
  const r3 = [PROJECTS[8], PROJECTS[0], PROJECTS[4], PROJECTS[6], PROJECTS[2]];

  return (
    <>
      <section id="projects" className="pt-20 pb-24 overflow-hidden" style={{ background: "#090d1a" }}>
        <div className="px-16 mb-12">
          <Reveal>
            <SectionLabel>Featured Work</SectionLabel>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setShowClients(false)}
                className="font-extrabold tracking-tight transition-colors duration-300 focus:outline-none"
                style={{
                  fontSize: "clamp(2rem,4vw,3.5rem)",
                  letterSpacing: "-0.02em",
                  color: !showClients ? "#fff" : "rgba(255,255,255,0.22)",
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                Projects
              </button>
              <span className="font-mono text-white/20 text-2xl select-none" style={{ fontSize: "clamp(1.2rem,2.5vw,2rem)" }}>
                /
              </span>
              <button
                onClick={() => setShowClients(true)}
                className="font-extrabold tracking-tight transition-colors duration-300 focus:outline-none relative"
                style={{
                  fontSize: "clamp(2rem,4vw,3.5rem)",
                  letterSpacing: "-0.02em",
                  color: showClients ? "#00f5c4" : "rgba(255,255,255,0.22)",
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                Clients
                {showClients && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-[2px]"
                    style={{ background: "linear-gradient(90deg,#00f5c4,#7b61ff)" }}
                  />
                )}
              </button>
            </div>
          </Reveal>
        </div>

        {!showClients ? (
          <div className="relative group-pause">
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #090d1a, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #090d1a, transparent)" }} />

            <div className="flex flex-col gap-4 overflow-hidden">
              <div className="overflow-hidden">
                <div className="flex gap-4" style={{ animation: "marquee-ltr 40s linear infinite", width: "max-content" }}>
                  {[...r1, ...r1].map((project, i) => (
                    <ProjectCard key={`${project.title}-${i}`} project={project} />
                  ))}
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="flex gap-4" style={{ animation: "marquee-rtl 38s linear infinite", width: "max-content" }}>
                  {[...r2, ...r2].map((project, i) => (
                    <ProjectCard key={`${project.title}-${i}`} project={project} />
                  ))}
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="flex gap-4" style={{ animation: "marquee-ltr 44s linear infinite", width: "max-content" }}>
                  {[...r3, ...r3].map((project, i) => (
                    <ProjectCard key={`${project.title}-${i}`} project={project} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #090d1a, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #090d1a, transparent)" }} />
            <div className="overflow-hidden">
              <div
                className="flex gap-6"
                style={{
                  animation: "marquee-ltr 55s linear infinite",
                  animationPlayState: selectedClient ? "paused" : "running",
                  width: "max-content",
                }}
              >
                {[...CLIENTS, ...CLIENTS].map((client, i) => (
                  <ClientCard
                    key={`${client.name}-${i}`}
                    client={client}
                    onSelect={setSelectedClient}
                    isSelected={selectedClient?.name === client.name}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {selectedClient && <ClientModal client={selectedClient} onClose={() => setSelectedClient(null)} />}
    </>
  );
}
