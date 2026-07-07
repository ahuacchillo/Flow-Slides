// fondo.tsx — Catálogo de fondos de video flow³
// 5 videos únicos extraídos de flow³-presentation/src/App.tsx
// Cada slide muestra el video en loop con su descripción de uso original.
import { Deck, VideoBackground } from "../deck";
import "./pbr-bg.css";
import "./fondo-slides.css";

// ── Catálogo de videos flow³ ─────────────────────────────────────────────────
// Extraído de flow³-presentation/src/App.tsx slideData[].video
// Cada URL aparece múltiples veces en la presentación original; aquí se
// documenta el slide donde debuta (primer uso) y los temas asociados.

const VIDEOS = [
  {
    id: "V1",
    url: "https://stream.mux.com/JNJEOYI6B3EffB9f5ZhpGbuxzc6gSyJcXaCBbCgZKRg.m3u8",
    label: "Portada · FLOW³",
    desc: "Cover slide y temas de Color (OKLCH), Taxonomía y Sub-agent Hierarchy.",
    uses: ["Cover", "Color", "Species", "Agents"],
  },
  {
    id: "V2",
    url: "https://stream.mux.com/Kec29dVyJgiPdtWaQtPuEiiGHkJIYQAVUJcNiIHUYeo.m3u8",
    label: "The Why · Filosofía",
    desc: "Chapter 0: Why a New Universe + Physics (Radius & Depth) + Docs + Tools.",
    uses: ["The Why", "Physics", "Component Anatomy", "The Body Parts"],
  },
  {
    id: "V3",
    url: "https://stream.mux.com/fHfa8VIbBdqZelLGg5thjsypZ101M01dbyIMLNDWQwlLA.m3u8",
    label: "Phi (φ) · Constante",
    desc: "Chapter 1: The Constant (1.618) + Ideas Rechazadas + Senescence + Workflow.",
    uses: ["Phi 1.618", "Cemetery", "Lifecycle", "Workflow"],
  },
  {
    id: "V4",
    url: "https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8",
    label: "Fibonacci · Spacing",
    desc: "Fibonacci Spacing + Token Layers + 7 Laws of Physics + Evolution Roadmap.",
    uses: ["Spacing", "Tokens", "7 Laws", "Roadmap"],
  },
  {
    id: "V5",
    url: "https://stream.mux.com/00qQnfNo7sSpn3pB1hYKkyeSDvxs01NxiQ3sr29uL3e028.m3u8",
    label: "√φ · Tipografía",
    desc: "Root Phi (√φ=1.272) Typography + Kits (α β γ δ ε) + AI Stack + Cierre Biomimesis.",
    uses: ["Typography", "Kits", "AI Stack", "Biomimesis"],
  },
] as const;

// ── Slide de video individual ─────────────────────────────────────────────────

function VideoSlide({
  video,
  index,
}: {
  video: (typeof VIDEOS)[number];
  index: number;
}) {
  return (
    <div className="bg-slide" data-bg="video-catalog">
      {/* Video propio por slide — cada uno es independiente */}
      <VideoBackground src={video.url} />

      {/* Overlay neutro para legibilidad */}
      <div className="vc-veil" aria-hidden />

      {/* Número grande de fondo */}
      <span className="vc-ghost" aria-hidden>
        {video.id}
      </span>

      {/* Contenido centrado */}
      <div className="vc-content">
        <span className="fondo-eyebrow">flow³ · {String(index + 1).padStart(2, "0")} / 05</span>
        <h1 className="vc-title">{video.label}</h1>
        <p className="vc-desc">{video.desc}</p>

        {/* Chips de usos */}
        <div className="vc-chips">
          {video.uses.map((u) => (
            <span key={u} className="vc-chip">{u}</span>
          ))}
        </div>

        {/* URL recortada para referencia */}
        <code className="vc-url">
          {video.url.replace("https://stream.mux.com/", "mux › ").replace(".m3u8", "")}
        </code>
      </div>

      {/* Label de esquina */}
      <div className="bg-label">
        <span className="bg-tag">flow³ · video {video.id}</span>
        <strong>{video.label}</strong>
      </div>
    </div>
  );
}

// ── Deck principal ───────────────────────────────────────────────────────────

export default function FondoDeck() {
  // El Deck no monta su propio video — cada slide tiene el suyo.
  // Pasamos undefined para que no haya video base duplicado.
  return (
    <Deck id="fondo">
      {VIDEOS.map((v, i) => (
        <VideoSlide key={v.id} video={v} index={i} />
      ))}
    </Deck>
  );
}
