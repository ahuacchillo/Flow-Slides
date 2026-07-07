// fondo.tsx — Deck de fondos flow³
//
// Estructura:
//   Slide 00 (PBR)  — El fondo que construimos: Grade Concorde + BSSRDF + Spring Physics
//   Slides 01–20    — Los 20 slides de flow³-presentation con su video y tema original
//
// Los 20 slides vienen de /home/jarbram/Downloads/flow³-presentation/src/App.tsx
// slideData[], portados literalmente con su video, título, capítulo y tipo de layout.

import { Deck, VideoBackground, Wordmark } from "../deck";
import "./pbr-bg.css";
import "./fondo-slides.css";

// ── 1. LOS 20 SLIDES DE FLOW³-PRESENTATION ──────────────────────────────────
// Portados directamente del slideData[] original.

const FLOW3_SLIDES = [
  {
    num: "01",
    chapter: "Cover",
    title: "FLOW³",
    subtitle: "A Conscious Design Solution",
    meta: "v3.0 Universe Edition",
    type: "cover" as const,
    video: "https://stream.mux.com/JNJEOYI6B3EffB9f5ZhpGbuxzc6gSyJcXaCBbCgZKRg.m3u8",
  },
  {
    num: "02",
    chapter: "Chapter 0: The Why",
    title: "Why a New Universe?",
    subtitle: "Subastop needs a system with a traceable 'why'. FloW3 is an Open System: it exchanges info with the environment to evolve.",
    type: "split" as const,
    video: "https://stream.mux.com/Kec29dVyJgiPdtWaQtPuEiiGHkJIYQAVUJcNiIHUYeo.m3u8",
  },
  {
    num: "03",
    chapter: "Chapter 1: The Constant",
    title: "1.618",
    subtitle: "Phi (φ) — The cosmological constant. Not mysticism, but natural optimization.",
    type: "big-number" as const,
    video: "https://stream.mux.com/fHfa8VIbBdqZelLGg5thjsypZ101M01dbyIMLNDWQwlLA.m3u8",
  },
  {
    num: "04",
    chapter: "Spacing",
    title: "Fibonacci Spacing",
    subtitle: "2px · 3px · 5px · 8px · 13px · 21px · 34px · 55px",
    type: "grid" as const,
    video: "https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8",
  },
  {
    num: "05",
    chapter: "Typography",
    title: "Root Phi (√φ)",
    subtitle: "√φ = 1.272 — Font Size: Round(16 × 1.272ⁿ). Phi es muy agresivo para texto.",
    type: "split" as const,
    video: "https://stream.mux.com/00qQnfNo7sSpn3pB1hYKkyeSDvxs01NxiQ3sr29uL3e028.m3u8",
  },
  {
    num: "06",
    chapter: "Color",
    title: "The Force: OKLCH",
    subtitle: "oklch(L, C, H) — Perceptually uniform. Dark mode calculated, not guessed.",
    type: "split" as const,
    video: "https://stream.mux.com/JNJEOYI6B3EffB9f5ZhpGbuxzc6gSyJcXaCBbCgZKRg.m3u8",
  },
  {
    num: "07",
    chapter: "Physics",
    title: "Radius & Depth",
    subtitle: "Radius: Fibonacci (2,3,5,8). Shadow: Blur & Offset siguen Fibonacci. Motion: Spring.",
    type: "grid" as const,
    video: "https://stream.mux.com/Kec29dVyJgiPdtWaQtPuEiiGHkJIYQAVUJcNiIHUYeo.m3u8",
  },
  {
    num: "08",
    chapter: "Chapter 3: The Cemetery",
    title: "Rejected Ideas",
    subtitle: "4px Grid · Fibonacci Text · Atomic Design · Sass Vars — descartadas por no pasar Rule Zero.",
    type: "list" as const,
    video: "https://stream.mux.com/fHfa8VIbBdqZelLGg5thjsypZ101M01dbyIMLNDWQwlLA.m3u8",
  },
  {
    num: "09",
    chapter: "Chapter 4: Tokens",
    title: "The 3 Layers",
    subtitle: "1. Primitives (Math) → 2. Semantics (Function) → 3. Components (Context)",
    type: "split" as const,
    video: "https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8",
  },
  {
    num: "10",
    chapter: "Structure",
    title: "The Planets (Kits)",
    subtitle: "α Full-width · β Square · γ Vertical · δ Compact · ε Micro",
    type: "grid" as const,
    video: "https://stream.mux.com/00qQnfNo7sSpn3pB1hYKkyeSDvxs01NxiQ3sr29uL3e028.m3u8",
  },
  {
    num: "11",
    chapter: "Chapter 6: Species",
    title: "Functional Taxonomy",
    subtitle: "Foundations · Actions · Inputs · Navigation · Feedback · Overlays · Data Display",
    type: "list" as const,
    video: "https://stream.mux.com/JNJEOYI6B3EffB9f5ZhpGbuxzc6gSyJcXaCBbCgZKRg.m3u8",
  },
  {
    num: "12",
    chapter: "Standards",
    title: "Component Anatomy",
    subtitle: "10 secciones obligatorias: What · When · Anatomy · Variants · States · A11y · Do/Don't · API · Code · Related",
    type: "split" as const,
    video: "https://stream.mux.com/Kec29dVyJgiPdtWaQtPuEiiGHkJIYQAVUJcNiIHUYeo.m3u8",
  },
  {
    num: "13",
    chapter: "Lifecycle",
    title: "Senescence",
    subtitle: "Experimental → Stable → Senescent → Extinct — a biological approach to legacy.",
    type: "big-number" as const,
    video: "https://stream.mux.com/fHfa8VIbBdqZelLGg5thjsypZ101M01dbyIMLNDWQwlLA.m3u8",
  },
  {
    num: "14",
    chapter: "Chapter 7",
    title: "The 7 Laws of Physics",
    subtitle: "I. Generative · II. Scaling · III. Adaptation · IV. Modular · VI. Feedback",
    type: "grid" as const,
    video: "https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8",
  },
  {
    num: "15",
    chapter: "Chapter 8: Nervous System",
    title: "AI-Driven Stack",
    subtitle: "Next.js + TS + Style Dictionary. The AI is the brain. It executes 'how' based on defined 'what'.",
    type: "split" as const,
    video: "https://stream.mux.com/00qQnfNo7sSpn3pB1hYKkyeSDvxs01NxiQ3sr29uL3e028.m3u8",
  },
  {
    num: "16",
    chapter: "Agents",
    title: "Sub-agent Hierarchy",
    subtitle: "L1 Rules (DNA) · L2 Professionals · L3 Operatives · L4 Skills",
    type: "list" as const,
    video: "https://stream.mux.com/JNJEOYI6B3EffB9f5ZhpGbuxzc6gSyJcXaCBbCgZKRg.m3u8",
  },
  {
    num: "17",
    chapter: "Tools",
    title: "The Body Parts",
    subtitle: "The Eye (Claude+Figma) · The Hands (Cursor+Agents) · Immune System (CI/CD)",
    type: "grid" as const,
    video: "https://stream.mux.com/Kec29dVyJgiPdtWaQtPuEiiGHkJIYQAVUJcNiIHUYeo.m3u8",
  },
  {
    num: "18",
    chapter: "Metabolism",
    title: "The Workflow",
    subtitle: "Design → Perception → Build → Validation → Approval. No agent proceeds without verification.",
    type: "split" as const,
    video: "https://stream.mux.com/fHfa8VIbBdqZelLGg5thjsypZ101M01dbyIMLNDWQwlLA.m3u8",
  },
  {
    num: "19",
    chapter: "Chapter 10",
    title: "Evolution Roadmap",
    subtitle: "Phase 1: Core (4w) · Phase 2: Docs (3w) · Phase 3: WCAG (3w) · Phase 4: Scale (4w)",
    type: "list" as const,
    video: "https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8",
  },
  {
    num: "20",
    chapter: "Cover",
    title: "Biomimesis",
    subtitle: "Where φ works, we use it. Where it doesn't, we use human perception. FloW3 v3.0",
    type: "cover" as const,
    video: "https://stream.mux.com/00qQnfNo7sSpn3pB1hYKkyeSDvxs01NxiQ3sr29uL3e028.m3u8",
  },
] as const;

// ── 2. SLIDE 00 — Fondo PBR (nuestro trabajo original) ──────────────────────
// Grade Concorde + BSSRDF + Fresnel + Spring Physics underdamped
// El Deck monta el video base + grade + capa PBR (pbr-bg.css ::after)

function PBRSlide() {
  return (
    // El Deck ya aporta: video HLS + grade Concorde + blobs spring PBR
    // Este slide solo añade el contenido encima — sin tocar el glass
    <div className="bg-slide" data-bg="pbr-grade">
      <div className="vc-content">
        <span className="fondo-eyebrow">flow³ · 00 / 20 · PBR</span>
        <h1 className="vc-title">
          La confianza se construye{" "}
          <span className="accent">todos los días</span>
        </h1>
        <p className="vc-desc">
          Grade Concorde · BSSRDF · Fresnel Schlick · Spring Physics ζ=0.35
        </p>
        <div className="vc-chips">
          <span className="vc-chip">GGX roughness 0.18</span>
          <span className="vc-chip">SSS 3 capas</span>
          <span className="vc-chip">Shadow k=0..5</span>
          <span className="vc-chip">ωn = 8 rad/s</span>
        </div>
        <Wordmark />
      </div>
      <div className="bg-label">
        <span className="bg-tag">Subastop · fondo PBR</span>
        <strong>Grade Concorde + Spring Physics</strong>
      </div>
    </div>
  );
}

// ── 3. SLIDE de flow³ individual ─────────────────────────────────────────────

function Flow3Slide({ slide }: { slide: (typeof FLOW3_SLIDES)[number] }) {
  return (
    <div className="bg-slide" data-bg="video-catalog">
      <VideoBackground src={slide.video} />
      <div className="vc-veil" aria-hidden />

      {/* Número fantasma de fondo */}
      <span className="vc-ghost" aria-hidden>{slide.num}</span>

      <div className="vc-content">
        <span className="fondo-eyebrow">{slide.chapter} · flow³ {slide.num} / 20</span>
        <h1 className="vc-title">{slide.title}</h1>
        <p className="vc-desc">{slide.subtitle}</p>
        <span className="vc-chip" style={{ alignSelf: "center" }}>{slide.type}</span>
      </div>

      <div className="bg-label">
        <span className="bg-tag">flow³ · slide {slide.num}</span>
        <strong>{slide.title}</strong>
      </div>
    </div>
  );
}

// ── 4. DECK ──────────────────────────────────────────────────────────────────

export default function FondoDeck() {
  return (
    // El video base es el del deck fondo (4IMYGcL...) — se ve en el slide PBR.
    // Los slides de flow³ montan cada uno su propio VideoBackground encima.
    <Deck
      id="fondo"
      video="https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8"
    >
      {/* Slide 00: nuestro trabajo PBR original */}
      <PBRSlide />

      {/* Slides 01–20: los 20 slides de flow³-presentation */}
      {FLOW3_SLIDES.map((s) => (
        <Flow3Slide key={s.num} slide={s} />
      ))}
    </Deck>
  );
}
