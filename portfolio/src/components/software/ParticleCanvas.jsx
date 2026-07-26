import { useEffect, useRef } from "react";
import { SNIPPETS, SNIPPET_COLORS } from "../../constants/softwareEngineerData";

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      text: SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)],
      speed: Math.random() * 0.22 + 0.06,
      a: Math.random() * 0.18 + 0.04,
      fontSize: Math.random() * 5 + 9,
      color: SNIPPET_COLORS[Math.floor(Math.random() * SNIPPET_COLORS.length)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < -30) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
          p.text = SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)];
        }
        const hex = p.color;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        ctx.font = `${p.fontSize}px 'Space Mono', monospace`;
        ctx.shadowColor = `rgba(${r},${g},${b},${Math.min(0.35, p.a + 0.08)})`;
        ctx.shadowBlur = 10;
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(0.45, p.a + 0.08)})`;
        ctx.fillText(p.text, p.x, p.y);
        ctx.shadowBlur = 0;
      });
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
}
