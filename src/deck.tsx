// deck.tsx — motor de presentaciones Subastop (liquid glass + Concorde)
import { Children, useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import Hls from "hls.js";
import "./deck.css";

// ── Fondo de video (HLS) ───────────────────────────────────────────────────

export function VideoBackground({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => { video.play().catch(() => {}); });
      return () => hls.destroy();
    }
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      video.addEventListener("loadedmetadata", () => { video.play().catch(() => {}); });
    }
  }, [src]);
  return (
    <div className="video-bg" aria-hidden>
      <video ref={ref} muted loop playsInline autoPlay />
      <div className="video-veil" />
    </div>
  );
}

// ── Motivos gráficos ───────────────────────────────────────────────────────

/** Bracket redondeado del wordmark VMC:  >  o  < */
export function Chev({ left = false }: { left?: boolean }) {
  return (
    <svg
      className={left ? "chev-l" : "chev-r"}
      viewBox="0 0 24 24"
      width="0.72em"
      height="0.72em"
      fill="none"
      stroke="currentColor"
      strokeWidth={5.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={left ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M8 4.5l8 7.5-8 7.5" />
    </svg>
  );
}

// ── Engine ─────────────────────────────────────────────────────────────────

export function Deck({ id, video, children }: { id: string; video?: string; children: ReactNode }) {
  const slides = Children.toArray(children);
  const n = slides.length;
  const [i, setI] = useState(() => {
    const h = parseInt(window.location.hash.split("/")[2] ?? "", 10);
    return Number.isFinite(h) && h >= 1 && h <= n ? h - 1 : 0;
  });
  const [idle, setIdle] = useState(false);

  const go = useCallback(
    (d: number) => setI((v) => Math.min(n - 1, Math.max(0, v + d))),
    [n],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", " ", "PageDown"].includes(e.key)) go(1);
      else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) go(-1);
      else if (e.key === "Home") setI(0);
      else if (e.key === "End") setI(n - 1);
      else if (e.key === "f" || e.key === "F") {
        if (document.fullscreenElement) void document.exitFullscreen();
        else void document.documentElement.requestFullscreen();
      }
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, n]);

  useEffect(() => {
    window.history.replaceState(null, "", `#/${id}/${i + 1}`);
  }, [id, i]);

  // Los controles se ocultan tras 3s sin mover el mouse
  useEffect(() => {
    let t = 0;
    const wake = () => {
      setIdle(false);
      window.clearTimeout(t);
      t = window.setTimeout(() => setIdle(true), 3000);
    };
    window.addEventListener("mousemove", wake);
    wake();
    return () => {
      window.removeEventListener("mousemove", wake);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <div className="deck" data-deck={id}>
      {video != null && <VideoBackground src={video} />}
      <div className="blobs" aria-hidden>
        <i /><i /><i />
      </div>
      <main className="stage">
        {/* todos montados: crossfade con escala entre slides */}
        {slides.map((s, k) => (
          <div
            key={k}
            className={`slide-wrap ${k === i ? "active" : k < i ? "before" : "after"}`}
            aria-hidden={k !== i}
          >
            {s}
          </div>
        ))}
      </main>
      <div className={`glass hud-pill${idle ? " hidden" : ""}`}>
        <span className="count">{i + 1} / {n}</span>
        <div className="dots">
          {slides.map((_, k) => (
            <button key={k} className={k === i ? "on" : ""} onClick={() => setI(k)} aria-label={`Slide ${k + 1}`} />
          ))}
        </div>
        <div className="pill-btns">
          <button onClick={() => { window.location.hash = "#/"; }} aria-label="Volver a presentaciones" title="Mis presentaciones">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3.5 10.5L12 3.5l8.5 7M6 9v11h12V9" />
            </svg>
          </button>
          <button onClick={() => go(-1)} disabled={i === 0} aria-label="Anterior">‹</button>
          <button onClick={() => go(1)} disabled={i === n - 1} aria-label="Siguiente">›</button>
          <button
            onClick={() =>
              document.fullscreenElement
                ? document.exitFullscreen()
                : document.documentElement.requestFullscreen()
            }
            aria-label="Pantalla completa"
            title="Pantalla completa (F)"
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" aria-hidden>
              <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Plantillas ─────────────────────────────────────────────────────────────

/** Divide el título en palabras enmascaradas — revelado editorial palabra a palabra. */
function words(title: ReactNode): ReactNode {
  let w = 0;
  const wrap = (chunk: ReactNode) => {
    const k = w++;
    return (
      <span className="w" key={`w${k}`}>
        <span className="wi" style={{ "--w": k } as CSSProperties}>{chunk}</span>
      </span>
    );
  };
  return Children.map(title, (c) =>
    typeof c === "string"
      ? c.split(" ").filter(Boolean).map((word, k, arr) => (
          <span key={k}>{wrap(word)}{k < arr.length - 1 ? " " : null}</span>
        ))
      : wrap(c),
  );
}

type SlideProps = {
  num?: string;
  eyebrow?: ReactNode;
  title?: ReactNode;
  /** Intro corta — se coloca a la derecha del título (layout editorial). */
  lead?: ReactNode;
  center?: boolean;
  children?: ReactNode;
};

/** Panel de vidrio genérico. Los hijos directos se revelan escalonados. */
export function Slide({ num, eyebrow, title, lead, center, children }: SlideProps) {
  let idx = 0;
  const item = (node: ReactNode) => (
    <div className="reveal" style={{ "--i": idx++ } as CSSProperties}>{node}</div>
  );
  const heading = center ? <h1>{words(title)}</h1> : <h2>{words(title)}</h2>;
  return (
    <section className={`glass slide${center ? " center" : ""}`}>
      {num != null && <span className="ghost-num" aria-hidden>{num}</span>}
      {eyebrow != null && item(<span className="eyebrow">{eyebrow}</span>)}
      {title != null && item(
        lead != null && !center
          ? <div className="head">{heading}<p className="lead">{lead}</p></div>
          : heading,
      )}
      {center && lead != null && item(<p className="lead">{lead}</p>)}
      {Children.map(children, item)}
    </section>
  );
}

/** Portada: eyebrow + h1 grande centrado. */
export function TitleSlide(props: Omit<SlideProps, "center">) {
  return <Slide {...props} center />;
}

/** Dos columnas dentro de un slide. */
export function Split({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <div className="split">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

// ── Bloques de contenido ───────────────────────────────────────────────────

import CheckIcon from "@/concorde/components/CheckIcon";
import { Icon } from "./icons";
import type { IconName } from "./icons";

/* Acepta un nombre de ícono propio o un componente del DS Concorde */
type ItemIcon = IconName | ReactNode;
const renderIcon = (icon: ItemIcon) =>
  typeof icon === "string" ? <Icon name={icon as IconName} /> : icon;

/** Ítem con ícono: columna de grilla (icon-grid) o tarjeta (card-grid). */
export function Item({ icon, title, children }: { icon: ItemIcon; title?: ReactNode; children?: ReactNode }) {
  return (
    <div className="item">
      <span className="ic">{renderIcon(icon)}</span>
      {title != null && title !== "" && <h3>{title}</h3>}
      {children != null && <p>{children}</p>}
    </div>
  );
}

/** Checklist con el CheckIcon de Concorde. */
export function Checks({ items }: { items: ReactNode[] }) {
  return (
    <ul className="checks">
      {items.map((it, k) => (
        <li key={k} style={{ "--i": k } as CSSProperties}>
          <CheckIcon size={22} /> <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/** Flujo de pasos con flechas (canal ético). */
export function Flow({ steps }: { steps: { icon: ItemIcon; label: ReactNode }[] }) {
  return (
    <div className="flow">
      {steps.map((s, k) => (
        <div className="flow-step" key={k} style={{ "--i": k } as CSSProperties}>
          {k > 0 && <span className="arrow" aria-hidden>→</span>}
          <div className="item">
            <span className="ic">{renderIcon(s.icon)}</span>
            <p>{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Píldora de vidrio destacada. */
export function Callout({ children }: { children: ReactNode }) {
  return <div className="glass callout">{children}</div>;
}

/** Logo Subastop:  > SUBASTOP <  */
export function Wordmark({ size = 20 }: { size?: number }) {
  return (
    <span className="wordmark" style={{ fontSize: size }}>
      <Chev /> SUBASTOP <Chev left />
    </span>
  );
}

// ── Stat con count-up (el toque gamble) ────────────────────────────────────

const fmt = new Intl.NumberFormat("es-PE", { maximumFractionDigits: 1 });

function useCountUp(target: number, ms = 1600) {
  const [v, setV] = useState(0);
  const raf = useRef(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setV(target);
      return;
    }
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      setV(target * (1 - Math.pow(2, -10 * p))); // easeOutExpo
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, ms]);
  return v;
}

export function Stat({
  value,
  prefix = "",
  suffix = "",
  label,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: ReactNode;
}) {
  const v = useCountUp(value);
  return (
    <div className="glass stat">
      <span className="value accent">
        {prefix}{fmt.format(value % 1 === 0 ? Math.round(v) : v)}{suffix}
      </span>
      <span className="label">{label}</span>
    </div>
  );
}
