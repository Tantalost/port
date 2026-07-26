import { useEffect, useState } from "react";

export default function SideNav() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const ids = ["hero", "about", "skills", "projects", "contact"];
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const [hovered, setHovered] = useState(null);

  return (
    <nav className="fixed left-0 top-0 z-50 h-screen w-[150px] flex flex-col justify-center gap-5 pl-7 bg-transparent opacity-40 hover:opacity-100 transition-opacity duration-300">
      {navItems.map(({ id, label }) => {
        const isActive = active === id;
        const isHovered = hovered === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => handleClick(e, id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            className="flex items-center gap-2 text-sm font-medium tracking-tight whitespace-nowrap no-underline transition-all duration-200"
            style={{
              color: isActive
                ? "#00f5c4"
                : isHovered
                ? "rgba(255,255,255,0.9)"
                : "rgba(255,255,255,0.4)",
              transform: isHovered && !isActive ? "translateX(4px)" : "translateX(0)",
              textShadow: isHovered && !isActive ? "0 0 12px rgba(255,255,255,0.25)" : "none",
            }}
          >
            <span
              className="flex-shrink-0 h-px transition-all duration-200"
              style={{
                width: isActive ? "16px" : isHovered ? "10px" : "0px",
                background: isActive ? "#00f5c4" : "rgba(255,255,255,0.6)",
                opacity: isActive || isHovered ? 1 : 0,
              }}
            />
            {label}
          </a>
        );
      })}
    </nav>
  );
}
