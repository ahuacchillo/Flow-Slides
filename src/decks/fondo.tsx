// fondo.tsx — Deck de fondo con el sistema PBR flagship (Grade Concorde + Spring Physics)
// Slide 1: Información técnica y matemática en inglés, formateada en un layout de grilla 2x2.
// Slide 2: Escenario limpio, mostrando únicamente el fondo PBR sin paneles ni vidrio.
import { Deck, Slide, Wordmark } from "../deck";
import "./pbr-bg.css";

export default function FondoDeck() {
  return (
    <Deck
      id="fondo"
      video="https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8"
    >
      {/* Slide 1: PBR Mathematics explanation with a 2x2 Grid Layout */}
      <Slide
        num="01"
        eyebrow="voyager³ · background engine"
        title={<>PBR Flagship <span className="accent">Render Mathematics</span></>}
        center={false}
      >
        <div 
          style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
            gap: "clamp(12px, 2vmin, 20px)", 
            marginTop: "10px",
            width: "100%"
          }}
        >
          {/* Card 1: BSSRDF */}
          <div 
            style={{ 
              padding: "clamp(16px, 2.5vw, 24px)", 
              borderRadius: "20px", 
              background: "rgba(255, 255, 255, 0.02)", 
              border: "1px solid rgba(255, 255, 255, 0.07)",
              boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.05)"
            }}
          >
            <h3 style={{ margin: "0 0 8px 0", color: "var(--lilac-soft)", fontSize: "clamp(13px, 1.8vmin, 16px)", fontWeight: 700 }}>
              1. BSSRDF (Subsurface Scattering)
            </h3>
            <p style={{ margin: 0, fontSize: "clamp(11px, 1.5vmin, 13px)", lineHeight: "1.5", color: "var(--text-dim)" }}>
              3-layer chromatic scattering simulates photon transport inside silicone (IOR ≈ 1.45). Light penetrates and diffuses, shifting tones from superficial lilac to deep violet and bottom bounce warm light.
            </p>
          </div>

          {/* Card 2: Fresnel Effect */}
          <div 
            style={{ 
              padding: "clamp(16px, 2.5vw, 24px)", 
              borderRadius: "20px", 
              background: "rgba(255, 255, 255, 0.02)", 
              border: "1px solid rgba(255, 255, 255, 0.07)",
              boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.05)"
            }}
          >
            <h3 style={{ margin: "0 0 8px 0", color: "var(--lilac-soft)", fontSize: "clamp(13px, 1.8vmin, 16px)", fontWeight: 700 }}>
              2. Fresnel Effect (Schlick)
            </h3>
            <p style={{ margin: 0, fontSize: "clamp(11px, 1.5vmin, 13px)", lineHeight: "1.5", color: "var(--text-dim)" }}>
              Reflectance dynamically scaled by viewing angle: F(θ) = F0 + (1 - F0)·(1 - cos θ)⁵. Base specular peak F0 ≈ 0.034 aligned with the primary light source position (28%, 14%) and 100% edge rimlight.
            </p>
          </div>

          {/* Card 3: Spring Physics */}
          <div 
            style={{ 
              padding: "clamp(16px, 2.5vw, 24px)", 
              borderRadius: "20px", 
              background: "rgba(255, 255, 255, 0.02)", 
              border: "1px solid rgba(255, 255, 255, 0.07)",
              boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.05)"
            }}
          >
            <h3 style={{ margin: "0 0 8px 0", color: "var(--amber-soft)", fontSize: "clamp(13px, 1.8vmin, 16px)", fontWeight: 700 }}>
              3. Spring Physics (Blobs)
            </h3>
            <p style={{ margin: 0, fontSize: "clamp(11px, 1.5vmin, 13px)", lineHeight: "1.5", color: "var(--text-dim)" }}>
              Underdamped physical system simulation (mẍ + cẋ + kx = 0) with ζ = 0.35 and ωn = 8.0 rad/s. Mass differentiation (m = 1.0 / 1.6 / 2.4) creates organic, rubbery desynchronized inertia on background blobs.
            </p>
          </div>

          {/* Card 4: Inverse Square Law */}
          <div 
            style={{ 
              padding: "clamp(16px, 2.5vw, 24px)", 
              borderRadius: "20px", 
              background: "rgba(255, 255, 255, 0.02)", 
              border: "1px solid rgba(255, 255, 255, 0.07)",
              boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.05)"
            }}
          >
            <h3 style={{ margin: "0 0 8px 0", color: "var(--amber-soft)", fontSize: "clamp(13px, 1.8vmin, 16px)", fontWeight: 700 }}>
              4. Inverse Square Law (Shadows)
            </h3>
            <p style={{ margin: 0, fontSize: "clamp(11px, 1.5vmin, 13px)", lineHeight: "1.5", color: "var(--text-dim)" }}>
              Light attenuation E(d) = L/d² modeled via 6 geometrically stacked shadow layers. Shadow offsets and blur scale exponentially while alpha opacity decays quadratically for a physical transition.
            </p>
          </div>
        </div>

        <div style={{ marginTop: "10px", display: "flex", justifySelf: "center" }}>
          <Wordmark size={14} />
        </div>
      </Slide>

      {/* Slide 2: Escenario limpio sin vidrio (glass) */}
      <div />
    </Deck>
  );
}
