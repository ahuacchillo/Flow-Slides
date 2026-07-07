// fondo.tsx — Deck de fondo con el sistema PBR flagship (Grade Concorde + Spring Physics)
// Contiene un único slide original con el look & feel PBR completo calibrado.
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
    </Deck>
  );
}
