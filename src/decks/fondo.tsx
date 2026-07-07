// fondo.tsx — Deck de fondo con el sistema PBR flagship (Grade Concorde + Spring Physics)
// Slide 1: Información técnica y matemática detallada sobre el renderizado del fondo.
// Slide 2: Escenario limpio, mostrando únicamente el fondo PBR sin paneles ni vidrio.
import { Deck, TitleSlide, Wordmark } from "../deck";
import "./pbr-bg.css";

export default function FondoDeck() {
  return (
    <Deck
      id="fondo"
      video="https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8"
    >
      {/* Slide 1: Información técnica y matemática de las tecnologías de fondo */}
      <TitleSlide
        num="01"
        title={<>Motor de Renderizado <span className="accent">PBR Flagship</span></>}
      >
        <div 
          style={{ 
            textAlign: "left", 
            maxWidth: "760px", 
            margin: "0 auto", 
            fontSize: "clamp(12px, 1.6vmin, 15px)", 
            lineHeight: "1.6",
            color: "var(--text-dim)",
            display: "flex",
            flexDirection: "column",
            gap: "12px"
          }}
        >
          <p style={{ margin: 0 }}>
            <strong style={{ color: "var(--text)" }}>1. BSSRDF (Subsurface Scattering):</strong> 3 capas tonales de dispersión cromática (superficial lila, media y absorción profunda) simulan fotones penetrando en silicona (IOR ≈ 1.45).
          </p>
          <p style={{ margin: 0 }}>
            <strong style={{ color: "var(--text)" }}>2. Efecto Fresnel (Schlick):</strong> Reflectancia variable basada en el ángulo de incidencia: F(θ) = F0 + (1 - F0)·(1 - cos θ)⁵ con reflectancia base F0 ≈ 0.034 y rimlight rasante al 100%.
          </p>
          <p style={{ margin: 0 }}>
            <strong style={{ color: "var(--text)" }}>3. Spring Physics:</strong> Movimiento bajo oscilación subamortiguada (underdamped: ζ = 0.35, ωn = 8.0 rad/s) para una deformación inercial gomosa en los blobs.
          </p>
          <p style={{ margin: 0 }}>
            <strong style={{ color: "var(--text)" }}>4. Inversa del Cuadrado (Sombras):</strong> Atenuación de luz física E(d) = L/d² simulada con 6 capas de box-shadow escaladas geométricamente, con decaimiento cuadrático del canal alfa.
          </p>
        </div>
        <Wordmark />
      </TitleSlide>

      {/* Slide 2: Escenario limpio sin vidrio (glass) */}
      <div />
    </Deck>
  );
}
