// fondo.tsx — Catálogo de fondos del sistema flow³
// Cada slide muestra un fondo diferente disponible para usar en presentaciones.
// El Deck usa el video principal (4IMYGcL...) como base — cada slide
// agrega su propia capa de estilo via data-slide-bg en el wrapper.
import { useEffect, useRef } from "react";
import { Deck, VideoBackground, Wordmark } from "../deck";
import "./pbr-bg.css";
import "./fondo-slides.css";

// ── Utilidad: Slide de catálogo ─────────────────────────────────────────────
// Cada slide es un <div> con un data-bg que el CSS usa para aplicar
// el fondo correspondiente encima del escenario base.

function BgSlide({
  bg,
  label,
  tag,
  children,
}: {
  bg: string;
  label: string;
  tag: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="bg-slide" data-bg={bg}>
      <div className="bg-label">
        <span className="bg-tag">{tag}</span>
        <strong>{label}</strong>
      </div>
      {children}
    </div>
  );
}

// ── Slide 5: Video ambiente (segundo stream) ─────────────────────────────────
// Necesita montar su propio VideoBackground porque el Deck solo soporta uno.
function AmbientVideoSlide() {
  return (
    <div className="bg-slide" data-bg="ambient-video">
      <VideoBackground src="https://stream.mux.com/fHfa8VIbBdqZelLGg5thjsypZ101M01dbyIMLNDWQwlLA.m3u8" />
      <div className="ambient-veil" aria-hidden />
      <div className="bg-label">
        <span className="bg-tag">flow³ · 05</span>
        <strong>Video ambiente puro</strong>
      </div>
    </div>
  );
}

// ── Slide con contenido de título ───────────────────────────────────────────
function TitleContent() {
  return (
    <div className="fondo-title-content">
      <span className="fondo-eyebrow">flow³ · fondos</span>
      <h1>
        Catálogo de<br />
        <span className="accent">fondos disponibles</span>
      </h1>
      <p>Todos los sistemas de background del motor flow³.<br />Navega con ← → para comparar.</p>
      <Wordmark />
    </div>
  );
}

// ── Deck principal ───────────────────────────────────────────────────────────

export default function FondoDeck() {
  return (
    <Deck
      id="fondo"
      video="https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8"
    >

      {/* ── 01: Grade Concorde + PBR ─────────────────────────────────────── */}
      {/* El fondo por defecto del deck fondo: grade de color Concorde
          con especular GGX + SSS + spring physics en blobs */}
      <BgSlide bg="pbr-grade" tag="flow³ · 01" label="Grade Concorde + PBR">
        <TitleContent />
      </BgSlide>

      {/* ── 02: Solo gradiente base (sin video) ──────────────────────────── */}
      {/* El gradiente radial estático definido en .deck —
          el fondo más limpio y ligero del sistema */}
      <BgSlide bg="base-gradient" tag="flow³ · 02" label="Gradiente base estático">
        <div className="fondo-title-content">
          <span className="fondo-eyebrow">flow³ · base</span>
          <h1>Gradiente<br /><span className="accent">estático</span></h1>
          <p>El fondo base del sistema.<br />Sin video, sin blobs. Máximo rendimiento.</p>
        </div>
      </BgSlide>

      {/* ── 03: Blobs líquidos sin video ─────────────────────────────────── */}
      {/* Solo los blobs difuminados sobre el gradiente base —
          animación drift-a/b/c original del sistema */}
      <BgSlide bg="blobs-only" tag="flow³ · 03" label="Blobs líquidos (drift)">
        <div className="fondo-title-content">
          <span className="fondo-eyebrow">flow³ · liquid</span>
          <h1>Blobs<br /><span className="accent">líquidos</span></h1>
          <p>Blobs con animación ease-in-out.<br />Ligero, sin video HLS.</p>
        </div>
      </BgSlide>

      {/* ── 04: Blobs con Spring Physics PBR ────────────────────────────── */}
      {/* Los blobs con las keyframes de spring underdamped (ζ=0.35)
          que implementamos — sin video, máximo impacto animado */}
      <BgSlide bg="blobs-spring" tag="flow³ · 04" label="Blobs Spring Physics (ζ=0.35)">
        <div className="fondo-title-content">
          <span className="fondo-eyebrow">flow³ · spring PBR</span>
          <h1>Spring<br /><span className="accent">Physics</span></h1>
          <p>Masa diferenciada por blob (m=1.0/1.6/2.4).<br />Movimiento inercial underdamped.</p>
        </div>
      </BgSlide>

      {/* ── 05: Video ambiente puro ──────────────────────────────────────── */}
      {/* El segundo video Mux (loop ambiente) sin grade de color —
          solo el veil base para legibilidad */}
      <AmbientVideoSlide />

      {/* ── 06: Video principal + solo veil (sin grade de color) ─────────── */}
      {/* El video original del deck fondo con el veil mínimo —
          sin el grade Concorde. Más cinematográfico, menos de marca. */}
      <BgSlide bg="video-raw" tag="flow³ · 06" label="Video + veil mínimo">
        <div className="fondo-title-content">
          <span className="fondo-eyebrow">flow³ · video raw</span>
          <h1>Video<br /><span className="accent">+ veil mínimo</span></h1>
          <p>Sin grade de color.<br />Cinematográfico, neutro en hue.</p>
        </div>
      </BgSlide>

    </Deck>
  );
}
