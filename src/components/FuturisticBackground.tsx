"use client";

import { useEffect, useRef } from "react";
import { useMarkets } from "@/lib/store";

// ─── Types ───────────────────────────────────────────────────────────────────
interface GridLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  axis: "h" | "v"; // horizontal or vertical
}

interface Particle {
  lineIdx: number; // which GridLine it rides
  t: number; // 0..1 progress along line
  speed: number; // progress per frame
  alpha: number; // peak opacity
  tailLen: number; // tail length in px
  hue: number; // slight colour variance
}

// ─── Config ──────────────────────────────────────────────────────────────────
const CELL_SIZE_DESKTOP = 90;
const CELL_SIZE_MOBILE = 60;
const PARTICLE_COLOR_LIGHT = "0, 0, 0"; // black RGB for light mode
const PARTICLE_COLOR_DARK = "30, 144, 255"; // brand blue RGB for dark mode
const PARTICLE_COUNT_DESKTOP = 40;
const PARTICLE_COUNT_MOBILE = 18;

// Build the rectangular grid lines that fill the canvas
function buildGrid(W: number, H: number, cell: number): GridLine[] {
  const lines: GridLine[] = [];
  // Horizontal lines
  for (let y = 0; y <= H + cell; y += cell) {
    lines.push({ x1: 0, y1: y, x2: W, y2: y, axis: "h" });
  }
  // Vertical lines
  for (let x = 0; x <= W + cell; x += cell) {
    lines.push({ x1: x, y1: 0, x2: x, y2: H, axis: "v" });
  }
  return lines;
}

function spawnParticle(lines: GridLine[]): Particle {
  const lineIdx = Math.floor(Math.random() * lines.length);
  return {
    lineIdx,
    t: Math.random(), // start anywhere on the line
    speed: 0.0012 + Math.random() * 0.002,
    alpha: 0.55 + Math.random() * 0.45,
    tailLen: 28 + Math.random() * 60,
    hue: Math.random() < 0.15 ? 200 : 0, // occasional cyan tint
  };
}

export default function FuturisticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useMarkets();
  const isLight = theme === "light";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let grid: GridLine[] = [];
    let particles: Particle[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const cell =
        window.innerWidth < 768 ? CELL_SIZE_MOBILE : CELL_SIZE_DESKTOP;
      grid = buildGrid(canvas.width, canvas.height, cell);

      // Keep existing particles but reassign them to valid lines
      const count =
        window.innerWidth < 768
          ? PARTICLE_COUNT_MOBILE
          : PARTICLE_COUNT_DESKTOP;
      particles = [];
      for (let i = 0; i < count; i++) particles.push(spawnParticle(grid));
    }

    function draw() {
      if (!canvas || !ctx) return;
      const W = canvas.width;
      const H = canvas.height;

      const light =
        document.documentElement.getAttribute("data-theme") === "light";
      const gridAlpha = light ? 0.06 : 0.1;
      const particleAlphaBase = light ? 0.4 : 1.0;
      const PARTICLE_COLOR = light ? PARTICLE_COLOR_LIGHT : PARTICLE_COLOR_DARK;

      ctx.clearRect(0, 0, W, H);

      // ── 1. Draw rectangular grid ──────────────────────────────
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = `rgba(${PARTICLE_COLOR}, ${gridAlpha})`;
      ctx.beginPath();
      for (const ln of grid) {
        ctx.moveTo(ln.x1, ln.y1);
        ctx.lineTo(ln.x2, ln.y2);
      }
      ctx.stroke();

      // ── 2. Draw particles (streaks) along grid lines ──────────
      for (const p of particles) {
        const ln = grid[p.lineIdx];
        if (!ln) continue;

        // Advance progress; wrap around or respawn
        p.t += p.speed;
        if (p.t > 1.05) {
          // Respawn on a random line
          const fresh = spawnParticle(grid);
          Object.assign(p, fresh);
          p.t = 0;
          continue;
        }

        // Current position (head)
        const headX = ln.x1 + (ln.x2 - ln.x1) * p.t;
        const headY = ln.y1 + (ln.y2 - ln.y1) * p.t;

        // Tail position
        const lineLen =
          ln.axis === "h" ? Math.abs(ln.x2 - ln.x1) : Math.abs(ln.y2 - ln.y1);
        const tailFraction =
          lineLen > 0 ? Math.min(p.tailLen / lineLen, 0.4) : 0;
        const tailT = Math.max(0, p.t - tailFraction);
        const tailX = ln.x1 + (ln.x2 - ln.x1) * tailT;
        const tailY = ln.y1 + (ln.y2 - ln.y1) * tailT;

        // Gradient streak: tail → head
        const grad = ctx.createLinearGradient(tailX, tailY, headX, headY);
        grad.addColorStop(0, `rgba(${PARTICLE_COLOR}, 0)`);
        grad.addColorStop(
          0.7,
          `rgba(${PARTICLE_COLOR}, ${(p.alpha * particleAlphaBase * 0.5).toFixed(3)})`,
        );
        grad.addColorStop(
          1,
          `rgba(${PARTICLE_COLOR}, ${(p.alpha * particleAlphaBase).toFixed(3)})`,
        );

        ctx.save();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = grad;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `rgba(${PARTICLE_COLOR}, 0.8)`;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.stroke();
        ctx.restore();

        // Bright dot at head
        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${PARTICLE_COLOR}, 1)`;
        ctx.fillStyle = `rgba(${PARTICLE_COLOR}, ${p.alpha * particleAlphaBase})`;
        ctx.beginPath();
        ctx.arc(headX, headY, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-0 pointer-events-none overflow-hidden transition-colors duration-500 ${
        isLight ? "bg-white" : "bg-[#121212]"
      }`}
    >
      {/* Subtle centre radial lift */}
      <div
        className={`absolute inset-0 ${
          isLight
            ? "bg-[radial-gradient(ellipse_at_50%_30%,rgba(30, 143, 255, 0)_0%,transparent_65%)]"
            : "bg-[radial-gradient(ellipse_at_50%_30%,rgba(30,144,255,0.09)_0%,transparent_65%)]"
        }`}
      />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Edge vignette */}
      <div
        className={`absolute inset-0 ${
          isLight
            ? "bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(210, 228, 245, 0)_100%)]"
            : "bg-[radial-gradient(ellipse_at_center,transparent_45%,#030810_100%)]"
        }`}
      />
    </div>
  );
}
