export default function ProjectCard({ project }) {
  return (
    <div className="flex-shrink-0 w-[240px] sm:w-[260px] lg:w-[270px] xl:w-[280px] snap-start bg-[#111520] border border-white/7 rounded-xl px-5 py-5 cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/35">
      <div className="flex items-center justify-between mb-3">
        <span className={`font-mono text-[0.6rem] tracking-widest uppercase px-2 py-[3px] rounded border ${project.typeColor} ${project.typeBg} ${project.typeBorder}`}>
          {project.type}
        </span>
        <span className="font-mono text-[0.62rem] text-white/35">{project.year}</span>
      </div>
      <div className="font-bold text-[0.98rem] text-white/90 leading-tight mb-2 group-hover:text-emerald-400 transition-colors duration-300">
        {project.title}
      </div>
      <div className="text-[0.8rem] text-white/45 leading-relaxed mb-3 line-clamp-3">{project.desc}</div>
      <div className="flex flex-wrap gap-[6px]">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[0.6rem] text-white/40 border border-white/10 px-[7px] py-[3px] rounded group-hover:text-emerald-400 group-hover:border-emerald-400/25 transition-all duration-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
