// fondo.tsx — Deck de fondos flow³ · OPTIMIZADO
//
// PROBLEMA ORIGINAL:
//   21 slides montados → 20 VideoBackground → 20 instancias HLS simultáneas
//   = ~20 streams abiertos al cargar la página
//
// SOLUCIÓN: Reproductor de video compartido (A/B crossfade)
//   - 1 solo stream activo en todo momento (buffer A)
//   - 1 stream de preload para el siguiente slide (buffer B)
//   - Los slides NO montan VideoBackground — reciben el video del contexto
//   - Al navegar: fade-out de A → fade-in de B → B pasa a ser el nuevo A
//   - HLS.js se inicializa una sola vez por URL única (caché de instancias)
//
// GANANCIAS ESTIMADAS:
//   Conexiones HLS:    20 → 1 activa + 1 en preload
//   Workers HLS:       20 → 2
//   RAM de video:      ~20x → ~2x
//   Time to first frame: mejora porque no hay contención de red

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Hls from "hls.js";
import { Deck, Wordmark } from "../deck";
import "./pbr-bg.css";
import "./fondo-slides.css";

// ═══════════════════════════════════════════════════════════════════════════
// 1. DATOS: 20 slides de flow³ + el slide PBR propio
// ═══════════════════════════════════════════════════════════════════════════

const V1 = "https://stream.mux.com/JNJEOYI6B3EffB9f5ZhpGbuxzc6gSyJcXaCBbCgZKRg.m3u8";
const V2 = "https://stream.mux.com/Kec29dVyJgiPdtWaQtPuEiiGHkJIYQAVUJcNiIHUYeo.m3u8";
const V3 = "https://stream.mux.com/fHfa8VIbBdqZelLGg5thjsypZ101M01dbyIMLNDWQwlLA.m3u8";
const V4 = "https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8";
const V5 = "https://stream.mux.com/00qQnfNo7sSpn3pB1hYKkyeSDvxs01NxiQ3sr29uL3e028.m3u8";

// URLs únicas — el caché de HLS mapea cada URL a una instancia
export const UNIQUE_URLS = [V1, V2, V3, V4, V5] as const;

const SLIDES = [
  // Slide 00: nuestro fondo PBR original
  { num: "00", chapter: "Subastop · PBR",     title: "Grade Concorde + Spring Physics", subtitle: "BSSRDF · Fresnel Schlick · Spring ζ=0.35 · Shadow k=0..5", type: "pbr",        video: V4 },
  // Slides 01–20: flow³-presentation
  { num: "01", chapter: "Cover",               title: "FLOW³",                          subtitle: "A Conscious Design Solution · v3.0 Universe Edition",    type: "cover",       video: V1 },
  { num: "02", chapter: "Chapter 0: The Why",  title: "Why a New Universe?",             subtitle: "FloW3 es un Open System: intercambia info con el entorno para evolucionar.",  type: "split",  video: V2 },
  { num: "03", chapter: "Chapter 1: Constant", title: "1.618 — Phi (φ)",                subtitle: "The cosmological constant. Natural optimization, not mysticism.",              type: "big-number", video: V3 },
  { num: "04", chapter: "Spacing",             title: "Fibonacci Spacing",              subtitle: "2 · 3 · 5 · 8 · 13 · 21 · 34 · 55 px",                 type: "grid",        video: V4 },
  { num: "05", chapter: "Typography",          title: "Root Phi √φ = 1.272",           subtitle: "Font Size: Round(16 × 1.272ⁿ). Phi es muy agresivo para texto.",              type: "split",  video: V5 },
  { num: "06", chapter: "Color",               title: "The Force: OKLCH",               subtitle: "oklch(L, C, H) — Perceptually uniform. Dark mode calculated.",               type: "split",  video: V1 },
  { num: "07", chapter: "Physics",             title: "Radius & Depth",                 subtitle: "Radius: Fibonacci · Shadow: Blur & Offset Fibonacci · Motion: Spring.",       type: "grid",   video: V2 },
  { num: "08", chapter: "Chapter 3: Cemetery", title: "Rejected Ideas",                 subtitle: "4px Grid · Fibonacci Text · Atomic Design · Sass Vars — descartados.",        type: "list",   video: V3 },
  { num: "09", chapter: "Chapter 4: Tokens",   title: "The 3 Layers",                   subtitle: "Primitives (Math) → Semantics (Function) → Components (Context)",            type: "split",  video: V4 },
  { num: "10", chapter: "Structure",           title: "The Planets (Kits)",             subtitle: "α Full-width · β Square · γ Vertical · δ Compact · ε Micro",                type: "grid",   video: V5 },
  { num: "11", chapter: "Chapter 6: Species",  title: "Functional Taxonomy",            subtitle: "Foundations · Actions · Inputs · Navigation · Feedback · Overlays · Data",   type: "list",   video: V1 },
  { num: "12", chapter: "Standards",           title: "Component Anatomy",              subtitle: "10 secciones: What · When · Anatomy · Variants · States · A11y · Do/Don't", type: "split",  video: V2 },
  { num: "13", chapter: "Lifecycle",           title: "Senescence",                     subtitle: "Experimental → Stable → Senescent → Extinct. Biological approach to legacy.", type: "big-number", video: V3 },
  { num: "14", chapter: "Chapter 7",           title: "The 7 Laws of Physics",          subtitle: "I. Generative · II. Scaling · III. Adaptation · IV. Modular · VI. Feedback", type: "grid",  video: V4 },
  { num: "15", chapter: "Chapter 8: Nervous",  title: "AI-Driven Stack",                subtitle: "Next.js + TS + Style Dictionary. The AI executes 'how' based on 'what'.",    type: "split",  video: V5 },
  { num: "16", chapter: "Agents",              title: "Sub-agent Hierarchy",            subtitle: "L1 Rules · L2 Professionals · L3 Operatives · L4 Skills",                    type: "list",   video: V1 },
  { num: "17", chapter: "Tools",               title: "The Body Parts",                 subtitle: "The Eye (Claude+Figma) · The Hands (Cursor) · Immune System (CI/CD)",        type: "grid",   video: V2 },
  { num: "18", chapter: "Metabolism",          title: "The Workflow",                   subtitle: "Design → Perception → Build → Validation → Approval.",                        type: "split",  video: V3 },
  { num: "19", chapter: "Chapter 10",          title: "Evolution Roadmap",              subtitle: "Phase 1: Core (4w) · Phase 2: Docs (3w) · Phase 3: WCAG (3w) · Phase 4: Scale (4w)", type: "list", video: V4 },
  { num: "20", chapter: "Cover",               title: "Biomimesis",                     subtitle: "Where φ works, we use it. Where it doesn't, we use human perception.",        type: "cover",  video: V5 },
] as const;

// ═══════════════════════════════════════════════════════════════════════════
// 2. REPRODUCTOR HLS COMPARTIDO — A/B crossfade, 1 stream activo
// ═══════════════════════════════════════════════════════════════════════════

// Contexto que expone el índice activo a todos los slides (sin prop drilling)
const SlideIndexCtx = createContext(0);

/**
 * Caché de instancias HLS por URL.
 * Evita crear múltiples instancias para la misma URL al navegar
 * de vuelta a un slide ya visitado.
 */
const hlsCache = new Map<string, Hls>();

function getOrCreateHls(url: string, video: HTMLVideoElement): Hls {
  let hls = hlsCache.get(url);
  if (!hls || hls.media === null) {
    hls = new Hls({
      enableWorker: true,
      // Carga solo el segmento inicial — no bufferiza todo de antemano
      maxBufferLength: 8,          // segundos de buffer máximo
      maxMaxBufferLength: 30,
      // Baja resolución inicial para arrancar rápido
      startLevel: -1,              // ABR automático desde el segmento más bajo
      abrEwmaDefaultEstimate: 500_000, // estimación inicial: 500kbps
    });
    hls.loadSource(url);
    hlsCache.set(url, hls);
  }
  // Re-adjuntar si el video cambió
  if (hls.media !== video) hls.attachMedia(video);
  return hls;
}

/**
 * Reproductor A/B compartido.
 * Monta 2 elementos <video> (buffer A y B). Al cambiar de slide:
 *   1. El buffer inactivo carga la nueva URL
 *   2. Cross-fade CSS entre ambos
 *   3. Los roles A/B se intercambian
 */
function SharedVideoPlayer({
  currentUrl,
  nextUrl,
}: {
  currentUrl: string;
  nextUrl: string | null;
}) {
  const refA = useRef<HTMLVideoElement>(null);
  const refB = useRef<HTMLVideoElement>(null);
  // "which" indica cuál buffer es el activo ahora mismo
  const [active, setActive] = useState<"A" | "B">("A");
  const prevUrl = useRef(currentUrl);

  // Al cambiar de URL: cargar en el buffer inactivo y hacer crossfade
  useEffect(() => {
    if (currentUrl === prevUrl.current) return;
    prevUrl.current = currentUrl;

    const incoming = active === "A" ? refB.current : refA.current;
    if (!incoming) return;

    if (Hls.isSupported()) {
      getOrCreateHls(currentUrl, incoming);
      incoming.play().catch(() => {});
    } else if (incoming.canPlayType("application/vnd.apple.mpegurl")) {
      incoming.src = currentUrl;
      incoming.play().catch(() => {});
    }

    setActive((prev) => (prev === "A" ? "B" : "A"));
  }, [currentUrl]); // eslint-disable-line react-hooks/exhaustive-deps

  // Inicializar el buffer activo en mount
  useEffect(() => {
    const video = refA.current;
    if (!video) return;
    if (Hls.isSupported()) {
      getOrCreateHls(currentUrl, video);
      video.play().catch(() => {});
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = currentUrl;
      video.play().catch(() => {});
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Precargar el siguiente video en idle time (no bloquea el hilo principal)
  useEffect(() => {
    if (!nextUrl || nextUrl === currentUrl) return;
    // requestIdleCallback: solo cuando el navegador esté libre
    const id = (window.requestIdleCallback ?? setTimeout)(() => {
      if (Hls.isSupported() && !hlsCache.has(nextUrl)) {
        const hls = new Hls({
          enableWorker: true,
          maxBufferLength: 4,
          startLevel: -1,
          autoStartLoad: false, // carga el manifiesto pero no los segmentos
        });
        hls.loadSource(nextUrl);
        hlsCache.set(nextUrl, hls);
      }
    }, { timeout: 2000 });

    return () => (window.cancelIdleCallback ?? clearTimeout)(id as number);
  }, [nextUrl, currentUrl]);

  const isAactive = active === "A";

  return (
    <div className="video-bg shared-player" aria-hidden>
      {/* Buffer A */}
      <video
        ref={refA}
        muted loop playsInline
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", opacity: isAactive ? 0.7 : 0,
          transition: "opacity 0.55s ease",
        }}
      />
      {/* Buffer B */}
      <video
        ref={refB}
        muted loop playsInline
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", opacity: isAactive ? 0 : 0.7,
          transition: "opacity 0.55s ease",
        }}
      />
      <div className="video-veil" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. WRAPPER DEL DECK — expone índice activo via contexto
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Detector del slide activo en el DOM.
 * Como el Deck original gestiona su propio estado interno silenciosamente,
 * este componente observa si el wrapper padre recibe la clase "active"
 * para notificar el índice actual del slide.
 */
function ActiveSlideDetector({
  index,
  onActive,
}: {
  index: number;
  onActive: (idx: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const parent = el.parentElement;
    if (!parent) return;

    // Verificar si ya está activo inicialmente
    if (parent.classList.contains("active")) {
      onActive(index);
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          if (parent.classList.contains("active")) {
            onActive(index);
          }
        }
      });
    });

    observer.observe(parent, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, [index, onActive]);

  return <div ref={ref} style={{ display: "none" }} aria-hidden />;
}

// ═══════════════════════════════════════════════════════════════════════════
// 4. COMPONENTES DE SLIDE — sin VideoBackground propio
// ═══════════════════════════════════════════════════════════════════════════

function PBRSlide({
  index,
  onActive,
}: {
  index: number;
  onActive: (idx: number) => void;
}) {
  return (
    <div className="bg-slide" data-bg="pbr-grade">
      <ActiveSlideDetector index={index} onActive={onActive} />
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

function Flow3Slide({
  slide,
  index,
  onActive,
}: {
  slide: (typeof SLIDES)[number];
  index: number;
  onActive: (idx: number) => void;
}) {
  return (
    // CSS containment: el navegador puede saltar el layout/paint de slides no visibles
    <div className="bg-slide flow3-slide" data-bg="video-catalog" style={{ contain: "strict" }}>
      <ActiveSlideDetector index={index} onActive={onActive} />
      {/* Sin VideoBackground aquí — el SharedVideoPlayer se encarga */}
      <div className="vc-veil" aria-hidden />
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

// ═══════════════════════════════════════════════════════════════════════════
// 5. DECK PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════

export default function FondoDeck() {
  const [activeIdx, setActiveIdx] = useState(0);
  const total = SLIDES.length;

  const currentUrl = useMemo(() => SLIDES[activeIdx].video, [activeIdx]);
  const nextUrl    = useMemo(
    () => (activeIdx + 1 < total ? SLIDES[activeIdx + 1].video : null),
    [activeIdx, total],
  );

  return (
    <SlideIndexCtx.Provider value={activeIdx}>
      {/*
        El Deck gestiona navegación, HUD y crossfade de slides.
        NO pasamos `video` prop — el SharedVideoPlayer reemplaza al VideoBackground.
      */}
      <Deck id="fondo">
        {SLIDES.map((s, i) =>
          i === 0 ? (
            <PBRSlide key="pbr" index={i} onActive={setActiveIdx} />
          ) : (
            <Flow3Slide key={s.num} slide={s} index={i} onActive={setActiveIdx} />
          )
        )}
      </Deck>

      {/*
        El SharedVideoPlayer vive FUERA del Deck (como hermano en el DOM).
        Usa position:fixed para cubrir toda la pantalla y queda debajo del Deck
        gracias al z-index. Solo es visible en el deck "fondo".
      */}
      <div
        className="fondo-shared-player-root"
        aria-hidden
        data-deck="fondo"
        data-active-slide={activeIdx}
      >
        <SharedVideoPlayer currentUrl={currentUrl} nextUrl={nextUrl} />
      </div>
    </SlideIndexCtx.Provider>
  );
}
