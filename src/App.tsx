// App.tsx — VOYAGER³ Workspace: Dashboard de diseño, catálogo de fondos y visor de Skills de Antigravity
import { useEffect, useState } from "react";
import { VideoBackground, Wordmark } from "./deck";
import EticaDeck from "./decks/etica";
import FondoDeck from "./decks/fondo";

// ── 1. DEFINICIONES DE PRESENTACIONES (DECKS) ─────────────────────────────────
const DECKS = [
  {
    id: "etica",
    title: "La confianza se construye todos los días",
    desc: "Subastop's core culture, compliance guidelines, ethical channels, and corporate responsibilities.",
    count: 12,
    tag: "CULTURE & COMPLIANCE",
    Component: EticaDeck,
  },
  {
    id: "fondo",
    title: "Fondo flagship PBR",
    desc: "Optics simulator: BSSRDF subsurface scattering, Fresnel specular peaks, and underdamped spring blobs.",
    count: 2,
    tag: "CREATIVE COMPUTING",
    Component: FondoDeck,
  },
];

// ── 2. SELECCIÓN DE FONDOS DE VIDEO (LABORATORIO) ──────────────────────────────
const VOYAGER3_VIDEOS = [
  {
    id: "V1",
    title: "01 · Portada VOYAGER³",
    desc: "OKLCH color system template & layout entry.",
    url: "https://stream.mux.com/JNJEOYI6B3EffB9f5ZhpGbuxzc6gSyJcXaCBbCgZKRg.m3u8",
  },
  {
    id: "V2",
    title: "02 · Philosophy & The Why",
    desc: "Traceable design choices & system variables.",
    url: "https://stream.mux.com/Kec29dVyJgiPdtWaQtPuEiiGHkJIYQAVUJcNiIHUYeo.m3u8",
  },
  {
    id: "V3",
    title: "03 · Constant Phi (φ)",
    desc: "Golden ratio scaling & Weber-Fechner constants.",
    url: "https://stream.mux.com/fHfa8VIbBdqZelLGg5thjsypZ101M01dbyIMLNDWQwlLA.m3u8",
  },
  {
    id: "V4",
    title: "04 · Fibonacci Spacing",
    desc: "Modular coordinate grids & margin rules.",
    url: "https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8",
  },
  {
    id: "V5",
    title: "05 · Typography √φ",
    desc: "1.272 modular text scaling & kits layout.",
    url: "https://stream.mux.com/00qQnfNo7sSpn3pB1hYKkyeSDvxs01NxiQ3sr29uL3e028.m3u8",
  },
];

// ── 3. DOCUMENTOS DE LAS SKILLS DE ANTIGRAVITY (DESIGN SYSTEM ENGINE) ──────────
const ANTIGRAVITY_SKILLS = [
  {
    id: "overview",
    title: "SKILL.md",
    type: "Manifesto",
    desc: "General configuration of the pbr-web-rendering engine.",
    code: `---
name: pbr-web-rendering
description: Physically Based Rendering (PBR) applied to CSS/React
version: 1.0.0
---

# PBR Web Rendering Engine

Optics and physical simulation framework translated to pure modern CSS & React.
No heavy external WebGL libraries required.

## Core Directives:
1. Emulate Light Interactions: Fresnel specularity (Schlick) and Subsurface Scattering (BSSRDF).
2. Physical Inertias: Motion driven by mass-spring equations instead of time easing.
3. Shadows Attenuation: Shadow layers scaling exponentially with quadratic alpha decay.`
  },
  {
    id: "math",
    title: "math-tokens.md",
    type: "Optics Math",
    desc: "IOR, Fresnel Schlick approximation & GGX Specular Lobe.",
    code: `/* ── IOR & Fresnel Reflectance ─────────────────────────────────────────────
 * Silicone Index of Refraction (IOR) ≈ 1.45
 * Reflectance F0 = ((IOR - 1) / (IOR + 1))² ≈ 0.034 (3.4% minimum reflection)
 * F(θ) = F0 + (1 - F0) · (1 - cos θ)⁵ (Schlick Approximation)
 */
[data-deck="fondo"] {
  --pbr-ior:        1.45;
  --pbr-f0:         0.034;
  --pbr-roughness:  0.18; /* GGX ellipse scale 38%x20% */
  
  --sss-surface:    rgba(207, 186, 255, 0.20); /* 1-2mm scatter */
  --sss-mid:        rgba(174, 142, 255, 0.10); /* 5-8mm scatter */
  --sss-deep:       rgba(90,  53, 194, 0.06); /* absorption */
}`
  },
  {
    id: "shadows",
    title: "shadow-generator.md",
    type: "Optics Shadows",
    desc: "Inverse Square Law formula & 6 geometric layers stack.",
    code: `/* ── Inverse Square Law: E(d) = L / d² ─────────────────────────────────────
 * Scale offsets & blur exponentially while alpha decays quadratically:
 * offset_y[k] = 3 * 2.1^k | blur[k] = 6 * 2.1^k | alpha[k] = 0.5 / (k + 1)²
 */
box-shadow:
  /* k=0: Contact Umbra (dense, immediate) */
  0px 3px 6px rgba(5, 2, 20, 0.500),
  /* k=1: Semi-Umbra transition */
  0px 6px 13px rgba(5, 2, 20, 0.125),
  /* k=2: Mid transition */
  0px 13px 26px rgba(8, 3, 30, 0.056),
  /* k=3: Penumbra */
  0px 27px 55px rgba(8, 3, 30, 0.031),
  /* k=4: Outer Penumbra */
  0px 57px 115px rgba(10, 4, 35, 0.020),
  /* k=5: Diffuse Field Limit */
  0px 120px 242px rgba(10, 4, 35, 0.014);`
  },
  {
    id: "springs",
    title: "spring-physics.md",
    type: "Inertial Mechanics",
    desc: "Underdamped mass-spring equation & keyframe rendering.",
    code: `/* ── Mass-Spring-Damper: mẍ + cẋ + kx = 0 ──────────────────────────────────
 * Constants: m=1.0 | k=64 (stiffness) | c=17.92 (damping)
 * Ratio: ζ = c / (2·√(m·k)) = 0.35 (rubbery underdamped)
 * Solution: x(t) = 1 - e^(-ζ·ωn·t) · cos(ωd·t) | ωn = 8.0 | ωd ≈ 7.51
 */
@keyframes blob-spring-a {
  0%   { transform: translate(0, 0) scale(1.00); }
  20%  { transform: translate(10.8vmax, 8.4vmax) scale(1.19); } /* 19% overshoot */
  31%  { transform: translate(11.5vmax, 9.0vmax) scale(1.22); } /* peak */
  45%  { transform: translate(8.2vmax, 6.5vmax) scale(1.13); }  /* rebound */
  100% { transform: translate(9.0vmax, 7.0vmax) scale(1.15); }
}`
  },
  {
    id: "hook",
    title: "spring-light-hook.md",
    type: "React Hook",
    desc: "Euler semi-implicit physics integration without re-renders.",
    code: `// Euler semi-implicit integrator (stable at 60Hz/120Hz)
function stepSpring(s: SpringState, target: number, dt: number) {
  const force = -STIFFNESS * (s.pos - target) - DAMPING * s.vel;
  const acc   = force / MASS;
  const vel   = s.vel + acc * dt;
  const pos   = s.pos + vel * dt;
  return { pos, vel };
}

// Write coordinates directly to CSS custom properties to bypass React diffing
ref.current.style.setProperty("--mx", state.pos.x.toFixed(4));
ref.current.style.setProperty("--my", state.pos.y.toFixed(4));`
  },
];

const deckFromHash = () => window.location.hash.match(/^#\/([\w-]+)/)?.[1];

export default function App() {
  const [id, setId] = useState(deckFromHash);
  // Estados para vistas interactivas (modal de fondos y visor de código de skills)
  const [activePreview, setActivePreview] = useState<{ url: string; title: string; desc: string } | null>(null);
  const [activeSkillDoc, setActiveSkillDoc] = useState<(typeof ANTIGRAVITY_SKILLS)[number] | null>(null);

  useEffect(() => {
    const onHash = () => setId(deckFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const deck = DECKS.find((d) => d.id === id);
  if (deck) return <deck.Component />;

  return (
    <div className="home" style={{ padding: "clamp(24px, 4vw, 56px) clamp(16px, 3vw, 40px)", display: "flex", flexDirection: "column", gap: "36px" }}>
      {/* Blobs orgánicos de fondo */}
      <div className="blobs" aria-hidden>
        <i style={{ animationDuration: "35s" }}/><i style={{ animationDuration: "25s" }}/><i style={{ animationDuration: "40s" }}/>
      </div>

      {/* Header Prémium Estilo Lab */}
      <header style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "0 0 4px" }}>
          <Wordmark size={14} />
          <span style={{ fontSize: "10px", padding: "3px 8px", borderRadius: "999px", background: "rgba(255, 150, 57, 0.12)", border: "1px solid rgba(255, 150, 57, 0.3)", color: "var(--amber)", fontWeight: 800, letterSpacing: "0.1em" }}>
            VOYAGER³ LAB v3.0
          </span>
        </div>
        <h1 style={{ fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)", fontWeight: 900, letterSpacing: "-0.04em", margin: 0 }}>
          Design Engineering <span className="accent">Workspace</span>
        </h1>
        <p style={{ color: "var(--text-dim)", fontSize: "clamp(13px, 1.8vmin, 16px)", maxWidth: "560px", margin: 0 }}>
          Creative Computing and Physics-Based UI Engine for presentations and graphics diagnostics.
        </p>
      </header>

      {/* ── GRID PRINCIPAL DE DASHBOARD (ASIMÉTRICO) ─────────────────────────── */}
      <div 
        style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
          gap: "28px", 
          width: "100%", 
          maxWidth: "1280px", 
          margin: "0 auto",
          zIndex: 10
        }}
      >
        {/* PANEL 1: WORKSPACE DECKS (Presentaciones) */}
        <div className="glass" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px", background: "rgba(10, 7, 17, 0.3)", borderColor: "rgba(255, 255, 255, 0.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: "17px", fontWeight: 800, letterSpacing: "-0.02em", margin: 0, color: "var(--text)" }}>
              Workspace Decks
            </h2>
            <span style={{ fontSize: "11px", color: "var(--lilac-soft)", fontWeight: 700 }}>SYSTEM</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {DECKS.map((d) => (
              <div
                key={d.id}
                className="glass"
                style={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  textAlign: "left",
                  cursor: "pointer",
                  background: "rgba(255, 255, 255, 0.02)",
                  borderColor: "rgba(255, 255, 255, 0.08)",
                  transition: "transform 0.2s, background 0.2s",
                }}
                onClick={() => { window.location.hash = `#/${d.id}/1`; }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.16)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                }}
              >
                <div>
                  <span style={{ fontSize: "9px", fontWeight: 800, color: "var(--lilac-soft)", letterSpacing: "0.1em" }}>{d.tag}</span>
                  <h3 style={{ fontSize: "15px", fontWeight: 800, margin: "4px 0 0", color: "var(--text)" }}>{d.title}</h3>
                </div>
                <p style={{ fontSize: "12px", color: "var(--text-dim)", margin: 0, lineHeight: "1.45" }}>{d.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px", fontSize: "11px", fontWeight: 700 }}>
                  <span style={{ color: "var(--amber-soft)" }}>{d.count} SLIDE{d.count > 1 ? 'S' : ''}</span>
                  <span style={{ color: "var(--amber)" }}>Launch Deck →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PANEL 2: OPTICS LAB (Fondos de Video) */}
        <div className="glass" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px", background: "rgba(10, 7, 17, 0.3)", borderColor: "rgba(255, 255, 255, 0.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: "17px", fontWeight: 800, letterSpacing: "-0.02em", margin: 0, color: "var(--text)" }}>
              Optics & Background Lab
            </h2>
            <span style={{ fontSize: "11px", color: "var(--lilac-soft)", fontWeight: 700 }}>CATALOG</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxHeight: "400px", overflowY: "auto", paddingRight: "4px" }}>
            {VOYAGER3_VIDEOS.map((video) => (
              <div
                key={video.id}
                className="glass"
                style={{
                  padding: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: "pointer",
                  background: "rgba(255, 255, 255, 0.01)",
                  borderColor: "rgba(255, 255, 255, 0.06)",
                  transition: "background 0.2s",
                }}
                onClick={() => setActivePreview({ url: video.url, title: video.title, desc: video.desc })}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.01)"; }}
              >
                {/* Mini player placeholder */}
                <div style={{ width: "64px", height: "44px", borderRadius: "8px", overflow: "hidden", background: "#000", position: "relative", flexShrink: 0 }}>
                  <div style={{ position: "absolute", inset: 0, background: "rgba(90, 53, 194, 0.25)", zIndex: 1 }} />
                  <VideoBackground src={video.url} />
                </div>
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  <h4 style={{ fontSize: "13px", fontWeight: 700, margin: 0, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {video.title}
                  </h4>
                  <p style={{ fontSize: "11px", color: "var(--text-dim)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {video.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PANEL 3: D.S. SKILLS & METADATA (Documentos/Tools) */}
        <div className="glass" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px", background: "rgba(10, 7, 17, 0.3)", borderColor: "rgba(255, 255, 255, 0.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: "17px", fontWeight: 800, letterSpacing: "-0.02em", margin: 0, color: "var(--text)" }}>
              Design Engine Tools
            </h2>
            <span style={{ fontSize: "11px", color: "var(--lilac-soft)", fontWeight: 700 }}>SKILLS</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {ANTIGRAVITY_SKILLS.map((skill) => (
              <div
                key={skill.id}
                className="glass"
                style={{
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  cursor: "pointer",
                  background: "rgba(255, 255, 255, 0.02)",
                  borderColor: "rgba(255, 255, 255, 0.08)",
                  transition: "background 0.2s, transform 0.2s",
                }}
                onClick={() => setActiveSkillDoc(skill)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                  e.currentTarget.style.transform = "translateX(3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong style={{ fontSize: "13px", color: "var(--amber-soft)", fontFamily: "monospace" }}>
                    {skill.title}
                  </strong>
                  <span style={{ fontSize: "9px", padding: "2px 6px", borderRadius: "4px", background: "rgba(174, 142, 255, 0.12)", color: "var(--lilac)", fontWeight: 700 }}>
                    {skill.type}
                  </span>
                </div>
                <p style={{ fontSize: "11px", color: "var(--text-dim)", margin: 0 }}>
                  {skill.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MODAL VISOR DE CÓDIGO (TOOL INTERACTIVA) ────────────────────────── */}
      {activeSkillDoc && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            background: "rgba(5, 2, 12, 0.8)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            className="glass"
            style={{
              width: "min(720px, 100%)",
              maxHeight: "85vh",
              display: "flex",
              flexDirection: "column",
              background: "rgba(10, 7, 20, 0.95)",
              borderColor: "rgba(255, 255, 255, 0.12)",
              boxShadow: "0 30px 90px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.15)",
              borderRadius: "24px",
              overflow: "hidden",
            }}
          >
            {/* Header del visor */}
            <div
              style={{
                padding: "16px 24px",
                background: "rgba(255,255,255,0.02)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--amber)" }} />
                <strong style={{ fontFamily: "monospace", color: "var(--amber-soft)", fontSize: "14px" }}>
                  {activeSkillDoc.title}
                </strong>
                <span style={{ fontSize: "10px", padding: "2px 6px", borderRadius: "4px", background: "rgba(255,255,255,0.06)", color: "var(--text-dim)" }}>
                  {activeSkillDoc.type}
                </span>
              </div>
              <button
                onClick={() => setActiveSkillDoc(null)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-dim)",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            {/* Código */}
            <div style={{ padding: "20px 24px", overflowY: "auto", flexGrow: 1 }}>
              <pre
                style={{
                  margin: 0,
                  fontFamily: "ui-monospace, monospace",
                  fontSize: "13px",
                  lineHeight: "1.6",
                  color: "#cfbaff",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-all",
                }}
              >
                {activeSkillDoc.code}
              </pre>
            </div>

            {/* Footer */}
            <div
              style={{
                padding: "16px 24px",
                background: "rgba(255,255,255,0.01)",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                className="glass"
                style={{
                  padding: "8px 20px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "999px",
                  color: "var(--text)",
                  fontWeight: 700,
                  fontSize: "12px",
                  cursor: "pointer",
                }}
                onClick={() => setActiveSkillDoc(null)}
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL PREVISUALIZADOR INTERACTIVO ───────────────────────────────── */}
      {activePreview && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            animation: "fadeIn 0.3s ease",
            backdropFilter: "blur(6px)",
          }}
        >
          {/* El video de fondo a pantalla completa */}
          <VideoBackground src={activePreview.url} />

          {/* Velo de contraste */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(10, 7, 17, 0.45) 0%, rgba(10, 7, 17, 0.20) 40%, rgba(10, 7, 17, 0.60) 100%)",
              zIndex: -1,
            }}
          />

          {/* Tarjeta de vidrio central */}
          <div
            className="glass"
            style={{
              width: "min(480px, 100%)",
              padding: "clamp(24px, 4vw, 40px)",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              boxShadow: "0 30px 90px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
          >
            <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--lilac-soft)" }}>
              Optics Lab Background
            </span>
            <h2 style={{ fontSize: "24px", fontWeight: 800, margin: 0, color: "var(--text)" }}>
              {activePreview.title}
            </h2>
            <p style={{ fontSize: "14px", color: "var(--text-dim)", lineHeight: 1.6, margin: 0 }}>
              {activePreview.desc}
            </p>
            <code style={{ fontSize: "11px", color: "rgba(255,255,255,0.22)", wordBreak: "break-all" }}>
              {activePreview.url.replace("https://stream.mux.com/", "mux › ").replace(".m3u8", "")}
            </code>
            <button
              className="glass"
              style={{
                padding: "12px 24px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "999px",
                color: "var(--text)",
                fontWeight: 700,
                cursor: "pointer",
                transition: "background 0.2s, transform 0.2s",
                alignSelf: "center",
                marginTop: "10px",
              }}
              onClick={() => setActivePreview(null)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Volver al Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
