// fondo.tsx — Deck "fondo" con sistema PBR en el background
// El PBR actúa SOLO sobre .video-bg (via pbr-bg.css ::after).
// El .glass NO se modifica.
import { Deck, TitleSlide, Wordmark } from "../deck";
import "./pbr-bg.css";

export default function FondoDeck() {
  return (
    <Deck
      id="fondo"
      video="https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8"
    >
      <TitleSlide
        num="01"
        title={<>La confianza se construye <span className="accent">todos los días</span></>}
      >
        <p>En Subastop, la ética no es solo una política.</p>
        <p>Es la forma en que trabajamos.<br />Es la forma en que construimos confianza.</p>
        <Wordmark />
      </TitleSlide>

      {/* slide 2: solo el fondo */}
      <div />
    </Deck>
  );
}
