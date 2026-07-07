// App.tsx — home: galería de presentaciones + router por hash (#/<deck>/<slide>)
import { useEffect, useState } from "react";
import { VideoBackground, Wordmark } from "./deck";
import EticaDeck from "./decks/etica";

const DECKS = [
  {
    id: "etica",
    title: "La confianza se construye todos los días",
    desc: "Código de ética y cultura Subastop: integridad, riesgos, canal ético y compromiso.",
    count: 12,
    Component: EticaDeck,
  },
  // ponytail: nueva presentación = nuevo archivo en src/decks/ + una entrada aquí
];

const deckFromHash = () => window.location.hash.match(/^#\/([\w-]+)/)?.[1];

export default function App() {
  const [id, setId] = useState(deckFromHash);
  useEffect(() => {
    const onHash = () => setId(deckFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const deck = DECKS.find((d) => d.id === id);
  if (deck) return <deck.Component />;

  return (
    <div className="home">
      <div className="blobs" aria-hidden>
        <i /><i /><i />
      </div>
      <header>
        <Wordmark size={14} />
        <h1>Presentaciones</h1>
        <p>Elige una presentación para abrirla.</p>
      </header>
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
              <span>{d.count} slides</span>
              <span className="go">→</span>
            </span>
          </button>
        ))}
      </div>

      <section className="anim-refs">
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
    </div>
  );
}
