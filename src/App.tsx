// App.tsx — home: galería de presentaciones + catálogo de fondos interactivos + router por hash (#/<deck>/<slide>)
import { useEffect, useState } from "react";
import { VideoBackground, Wordmark } from "./deck";
import EticaDeck from "./decks/etica";
import FondoDeck from "./decks/fondo";

const DECKS = [
  {
    id: "etica",
    title: "La confianza se construye todos los días",
    desc: "Código de ética y cultura Subastop: integridad, riesgos, canal ético y compromiso.",
    count: 12,
    Component: EticaDeck,
  },
  {
    id: "fondo",
    title: "Fondo flagship PBR",
    desc: "Material viscoelástico simulado con PBR: BSSRDF (dispersión subsuperficial), efecto Fresnel Schlick y blobs con Spring Physics (ζ=0.35).",
    count: 1,
    Component: FondoDeck,
  },
];

// ── Lista de fondos de video flow³ para la galería interactiva ─────────────────
const FLOW3_VIDEOS = [
  {
    id: "V1",
    title: "01 · Portada FLOW³",
    desc: "El tono base morado y contrastes fríos usado para la portada del manifiesto y secciones de color.",
    url: "https://stream.mux.com/JNJEOYI6B3EffB9f5ZhpGbuxzc6gSyJcXaCBbCgZKRg.m3u8",
  },
  {
    id: "V2",
    title: "02 · Filosofía & The Why",
    desc: "El fondo dinámico para el capítulo de filosofía del sistema, con movimientos orgánicos en tonos profundos.",
    url: "https://stream.mux.com/Kec29dVyJgiPdtWaQtPuEiiGHkJIYQAVUJcNiIHUYeo.m3u8",
  },
  {
    id: "V3",
    title: "03 · Constante Phi (φ)",
    desc: "Brillo cálido y lila sutil para acompañar las diapositivas sobre la constante matemática 1.618.",
    url: "https://stream.mux.com/fHfa8VIbBdqZelLGg5thjsypZ101M01dbyIMLNDWQwlLA.m3u8",
  },
  {
    id: "V4",
    title: "04 · Fibonacci Spacing",
    desc: "Fondo de alto contraste para las reglas y grids espaciales de diseño del motor de la UI.",
    url: "https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8",
  },
  {
    id: "V5",
    title: "05 · Tipografía √φ",
    desc: "Contraste equilibrado y velo suave para asegurar la legibilidad del escalado tipográfico.",
    url: "https://stream.mux.com/00qQnfNo7sSpn3pB1hYKkyeSDvxs01NxiQ3sr29uL3e028.m3u8",
  },
];

const deckFromHash = () => window.location.hash.match(/^#\/([\w-]+)/)?.[1];

export default function App() {
  const [id, setId] = useState(deckFromHash);
  // Estado para controlar el previsualizador interactivo de video a pantalla completa
  const [activePreview, setActivePreview] = useState<{ url: string; title: string; desc: string } | null>(null);

  useEffect(() => {
    const onHash = () => setId(deckFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const deck = DECKS.find((d) => d.id === id);
  if (deck) return <deck.Component />;

  return (
    <div className="home">
      {/* Blobs del home */}
      <div className="blobs" aria-hidden>
        <i /><i /><i />
      </div>

      <header>
        <Wordmark size={14} />
        <h1>Presentaciones</h1>
        <p>Elige una presentación para abrirla.</p>
      </header>

      {/* Grilla principal de Decks */}
      <div className="home-grid">
        {DECKS.map((d) => (
          <button
            key={d.id}
            className="glass deck-card"
            onClick={() => { window.location.hash = `#/${d.id}/1`; }}
          >
            <h3>{d.title}</h3>
            <p>{d.desc}</p>
            <span className="meta">
              <span>{d.count} slide{d.count > 1 ? 's' : ''}</span>
              <span className="go">→</span>
            </span>
          </button>
        ))}
      </div>

      {/* ── SECCIÓN NUEVA: Galería interactiva de fondos de video flow³ ──────── */}
      <section className="anim-refs" style={{ marginTop: "40px" }}>
        <h2>Catálogo de Fondos de Video (flow³)</h2>
        <p>Previsualiza cada uno de los videos de fondo originales del sistema de diseño a pantalla completa.</p>
        <div className="refs-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
          {FLOW3_VIDEOS.map((video) => (
            <div
              key={video.id}
              className="glass ref-card"
              style={{ cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              onClick={() => setActivePreview({ url: video.url, title: video.title, desc: video.desc })}
            >
              <div className="demo demo-video" style={{ pointerEvents: "none", height: "130px" }}>
                <VideoBackground src={video.url} />
              </div>
              <div style={{ marginTop: "10px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <strong style={{ fontSize: "14px", color: "var(--text)" }}>{video.title}</strong>
                  <p style={{ fontSize: "12px", color: "var(--text-dim)", margin: "4px 0 0" }}>{video.desc}</p>
                </div>
                <div style={{ marginTop: "12px", fontSize: "11px", fontWeight: "bold", color: "var(--amber)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Previsualizar →
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Referencias del motor */}
      <section className="anim-refs" style={{ marginTop: "40px" }}>
        <h2>Referencias de animación</h2>
        <p>Extraídas del motor FLOW³ — catálogo para implementar en otras presentaciones.</p>
        <div className="refs-grid">
          <figure className="glass ref-card">
            <div className="demo demo-cross"><i /><i /></div>
            <figcaption>
              <strong>Crossfade + escala</strong>
              <span>flow³ · transición entre slides (sale a 96%, entra desde 104%) — <code>.slide-wrap</code></span>
            </figcaption>
          </figure>
          <figure className="glass ref-card">
            <div className="demo demo-video"><VideoBackground src="https://stream.mux.com/fHfa8VIbBdqZelLGg5thjsypZ101M01dbyIMLNDWQwlLA.m3u8" /></div>
            <figcaption>
              <strong>Video ambiente (HLS)</strong>
              <span>flow³ · loop mudo detrás del vidrio — prop <code>video</code> del Deck</span>
            </figcaption>
          </figure>
          <figure className="glass ref-card">
            <div className="demo demo-pill"><i><b /><b /><b /></i></div>
            <figcaption>
              <strong>Controles auto-ocultables</strong>
              <span>flow³ · la píldora se esconde tras 3s sin mouse — <code>.hud-pill</code></span>
            </figcaption>
          </figure>
          <figure className="glass ref-card">
            <div className="demo demo-dots"><b /><b /><b /><b /></div>
            <figcaption>
              <strong>Dots de progreso</strong>
              <span>flow³ · el dot activo se alarga con gradiente — <code>.dots</code></span>
            </figcaption>
          </figure>
          <figure className="glass ref-card">
            <div className="demo demo-words">
              <span className="w"><span>todos</span></span>{" "}
              <span className="w"><span>los</span></span>{" "}
              <span className="w"><span className="accent">días</span></span>
            </div>
            <figcaption>
              <strong>Reveal palabra a palabra</strong>
              <span>concorde · cada palabra sube desde su máscara — <code>words()</code></span>
            </figcaption>
          </figure>
          <figure className="glass ref-card">
            <div className="demo demo-rise"><i /><i /><i /></div>
            <figcaption>
              <strong>Reveal escalonado</strong>
              <span>concorde · el contenido entra en cascada al activar el slide — <code>.reveal</code></span>
            </figcaption>
          </figure>
        </div>
      </section>

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
              animation: "scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--lilac-soft)",
              }}
            >
              Vista Previa de Fondo
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
