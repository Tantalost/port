import { useEffect, useRef, useCallback } from 'react';

const NAME  = 'TANTALOST';
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*><{}[]!?';
const BLOCK = 18;
const GREEN = '#00ff88';
const BLUE  = '#00b4ff';
const mono  = "'VT323', monospace";
const mono2 = "'Share Tech Mono', monospace";

const IntroSequence = ({ onComplete }) => {
  const rootRef     = useRef(null);
  const bgCanvasRef = useRef(null);
  const pixCanvasRef= useRef(null);

  const scanRef     = useRef(null);
  const nameWrapRef = useRef(null);
  const nameTextRef = useRef(null);
  const statusRef   = useRef(null);


  const timers  = useRef([]);
  const rafs    = useRef({ bg: null, lbg: null, main: null });
  const doneRef = useRef(false);

  const later = (ms) =>
    new Promise((r) => { timers.current.push(setTimeout(r, ms)); });

  const af = (fn) => { rafs.current.main = requestAnimationFrame(fn); };

  const killAll = useCallback(() => {
    doneRef.current = true;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    Object.values(rafs.current).forEach((id) => { if (id) cancelAnimationFrame(id); });
    rafs.current = { bg: null, lbg: null, main: null };
  }, []);

  const initMatrixRain = useCallback(() => {
    const canvas = bgCanvasRef.current;
    const ctx    = canvas.getContext('2d');
    const root   = rootRef.current;
    canvas.width = root.offsetWidth;
    canvas.height= root.offsetHeight;
    const colW = 14;
    const cols  = Math.floor(canvas.width / colW);
    const drops = Array.from({ length: cols }, () => Math.random() * -60);

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '13px VT323, monospace';
      for (let i = 0; i < drops.length; i++) {
        const ch  = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x   = i * colW;
        const y   = drops[i] * colW;
        const pct = Math.min(1, drops[i] / (canvas.height / colW));
        ctx.fillStyle = `rgba(0,255,136,${(0.04 + pct * 0.16).toFixed(3)})`;
        ctx.fillText(ch, x, y);
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.5;
      }
      rafs.current.bg = requestAnimationFrame(draw);
    };
    draw();
  }, []);

  const stopMatrixRain = useCallback(() => {
    if (rafs.current.bg) { cancelAnimationFrame(rafs.current.bg); rafs.current.bg = null; }
    const canvas = bgCanvasRef.current;
    if (canvas) canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  }, []);
  const runPixelDissolve = useCallback((nameFadeEl) => {
    return new Promise((resolve) => {
      const root   = rootRef.current;
      const canvas = pixCanvasRef.current;
      const ctx    = canvas.getContext('2d');
      const W = root.offsetWidth, H = root.offsetHeight;
      canvas.width = W; canvas.height = H;

      const cols = Math.ceil(W / BLOCK), rows = Math.ceil(H / BLOCK);
      const cx = W / 2, cy = H / 2;
      const maxD = Math.sqrt(cx * cx + cy * cy);
      const blocks = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = c * BLOCK, by = r * BLOCK;
          const d  = Math.sqrt((bx + BLOCK / 2 - cx) ** 2 + (by + BLOCK / 2 - cy) ** 2);
          blocks.push({ bx, by, delay: (d / maxD) * 280 + Math.random() * 180, opacity: 1 });
        }
      }

      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);

      const start = performance.now();
      const draw  = (now) => {
        if (doneRef.current) return resolve();
        const el = now - start;
        ctx.clearRect(0, 0, W, H);
        let allGone = true;
        for (const b of blocks) {
          b.opacity = Math.max(0, 1 - Math.max(0, el - b.delay) / 160);
          if (b.opacity > 0) {
            allGone = false;
            const shimmer = b.opacity < 0.28 && Math.random() < 0.07;
            ctx.fillStyle = shimmer
              ? `rgba(0,255,136,${(b.opacity * 0.55).toFixed(3)})`
              : `rgba(0,0,0,${b.opacity.toFixed(3)})`;
            ctx.fillRect(b.bx, b.by, BLOCK, BLOCK);
          }
        }
        if (nameFadeEl) nameFadeEl.style.opacity = Math.max(0, 1 - el / 260).toFixed(3);
        if (!allGone || el < 700) af(draw);
        else { ctx.clearRect(0, 0, W, H); resolve(); }
      };
      af(draw);
    });
  }, []);

  const skipToEnd = useCallback(() => {
    killAll();
    stopMatrixRain();
    if (nameWrapRef.current) nameWrapRef.current.style.opacity = '0';
    if (scanRef.current)     scanRef.current.style.opacity    = '0';
    const pixCtx = pixCanvasRef.current?.getContext('2d');
    if (pixCtx) pixCtx.clearRect(0, 0, pixCanvasRef.current.width, pixCanvasRef.current.height);
    onComplete();
  }, [killAll, stopMatrixRain, onComplete]);

  useEffect(() => {
    doneRef.current = false;
    const run = async () => {
      initMatrixRain();
      if (nameWrapRef.current) nameWrapRef.current.style.opacity = '0';
      if (nameTextRef.current) nameTextRef.current.textContent   = '';
      if (statusRef.current)   statusRef.current.textContent     = '';
      if (scanRef.current) scanRef.current.style.opacity = '0';

      await later(120);
      if (doneRef.current) return;
      if (nameWrapRef.current) nameWrapRef.current.style.opacity = '1';
      if (statusRef.current)   statusRef.current.textContent = 'BOOT SEQUENCE INITIATED...';

      const scan = scanRef.current;
      const H    = rootRef.current.offsetHeight;
      scan.style.opacity = '1';
      scan.style.top     = '-3px';
      await new Promise((resolve) => {
        let s = null; const dur = 480;
        const tick = (ts) => {
          if (doneRef.current) return resolve();
          if (!s) s = ts;
          const p = Math.min((ts - s) / dur, 1);
          const e = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
          scan.style.top = `${e * H}px`;
          if (p < 1) af(tick); else resolve();
        };
        af(tick);
      });
      if (doneRef.current) return;
      scan.style.opacity = '0';

      if (statusRef.current)   statusRef.current.textContent = 'DECRYPTING IDENTITY...';
      if (nameTextRef.current) nameTextRef.current.textContent = '\u2588'.repeat(NAME.length);
      await later(30);
      if (doneRef.current) return;

      for (let i = 0; i < NAME.length; i++) {
        if (doneRef.current) return;
        await new Promise((resolve) => {
          let cycles = 0; const total = 6;
          const chars = nameTextRef.current.textContent.split('');
          const tick = () => {
            if (doneRef.current) return resolve();
            if (cycles < total) {
              chars[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
              nameTextRef.current.textContent = chars.join('');
              cycles++;
              timers.current.push(setTimeout(tick, 22));
            } else {
              chars[i] = NAME[i];
              nameTextRef.current.textContent = chars.join('');
              resolve();
            }
          };
          tick();
        });
        await later(25);
      }

      if (doneRef.current) return;
      if (statusRef.current) statusRef.current.textContent = 'ACCESS GRANTED';

      if (nameTextRef.current) {
        nameTextRef.current.style.transition = 'text-shadow 0.3s ease';
        nameTextRef.current.style.textShadow =
          `0 0 20px ${GREEN}, 0 0 60px rgba(0,255,136,0.55), 0 0 100px rgba(0,255,136,0.2)`;
      }
      await later(380);
      if (doneRef.current) return;
      if (nameTextRef.current) nameTextRef.current.style.textShadow = `0 0 10px ${GREEN}, 0 0 28px rgba(0,255,136,0.3)`;
      if (statusRef.current)   statusRef.current.textContent = '';
      await later(60);
      if (doneRef.current) return;

      stopMatrixRain();
      await runPixelDissolve(nameWrapRef.current);
      if (doneRef.current) return;

      // Slow fade to black
      await new Promise((resolve) => {
        const overlay = document.createElement('div');
        Object.assign(overlay.style, {
          position: 'fixed', inset: '0', background: '#000',
          opacity: '0', zIndex: '99', pointerEvents: 'none',
          transition: 'opacity 0.65s ease',
        });
        document.body.appendChild(overlay);
        requestAnimationFrame(() => {
          overlay.style.opacity = '1';
          timers.current.push(setTimeout(() => {
            document.body.removeChild(overlay);
            resolve();
          }, 750));
        });
      });
      if (doneRef.current) return;

      onComplete();
    };

    run();
    return () => killAll();
  }, [initMatrixRain, stopMatrixRain, runPixelDissolve, killAll, onComplete]);

  return (
    <div
      ref={rootRef}
      style={{ position: 'fixed', inset: 0, backgroundColor: '#000', zIndex: 50, overflow: 'hidden' }}
    >
      <canvas ref={bgCanvasRef} style={{ position: 'absolute', inset: 0, zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
        background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.18) 2px,rgba(0,0,0,0.18) 4px)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center,transparent 50%,rgba(0,0,0,0.75) 100%)' }} />

      <canvas ref={pixCanvasRef} style={{ position: 'absolute', inset: 0, zIndex: 7 }} />

      <div ref={scanRef} style={{
        position: 'absolute', left: 0, right: 0, height: '3px',
        background: 'rgba(0,255,136,0.7)',
        boxShadow: '0 0 18px rgba(0,255,136,1), 0 0 60px rgba(0,255,136,0.4)',
        zIndex: 8, opacity: 0, top: '-3px',
      }} />

      <div ref={nameWrapRef} style={{
        position: 'absolute', zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
        top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        opacity: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span ref={nameTextRef} style={{
            fontFamily: mono,
            fontSize: 'clamp(48px,9vw,96px)',
            letterSpacing: '0.22em',
            color: GREEN,
            textShadow: `0 0 10px ${GREEN}, 0 0 30px rgba(0,255,136,0.3)`,
            whiteSpace: 'nowrap', userSelect: 'none',
          }} />
        </div>
        <p ref={statusRef} style={{
          fontFamily: mono2, fontSize: '11px', letterSpacing: '0.3em',
          color: 'rgba(0,255,136,0.45)', textTransform: 'uppercase', margin: 0,
        }} />
      </div>

      <button onClick={skipToEnd} style={{
        position: 'absolute', bottom: '20px', right: '20px',
        fontFamily: mono2, fontSize: '10px', letterSpacing: '0.12em',
        color: 'rgba(0,255,136,0.18)', background: 'none', border: 'none',
        cursor: 'pointer', zIndex: 20,
      }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(0,255,136,0.5)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(0,255,136,0.18)')}
        aria-label="Skip intro"
      >
        [ SKIP ]
      </button>
    </div>
  );
};

export default IntroSequence;