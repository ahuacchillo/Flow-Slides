// etica.tsx — Presentación: La confianza se construye todos los días (ética Subastop)
import { Deck, Slide, TitleSlide, Callout, Checks, Flow, Item, Wordmark } from "../deck";
import { Icon } from "../icons";
import Button from "@/concorde/components/Button";
import "./pbr-bg.css";

export default function EticaDeck() {
  return (
    <Deck id="etica" video="https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8">
      {/* 01 — La confianza se construye todos los días */}
      <TitleSlide
        num="01"
        title={<>La confianza se construye <span className="accent">todos los días</span></>}
      >
        <p>Cada decisión que tomamos deja una huella.</p>
        <div className="icon-grid center-items">
          <Item icon="people" title="Clientes" />
          <Item icon="user" title="Compañeros" />
          <Item icon="shield" title="Socios estratégicos" />
          <Item icon="star" title="Nuestra reputación" />
        </div>
        <Callout>La ética no es solo una política, es nuestra forma de trabajar.</Callout>
        <Wordmark />
      </TitleSlide>

      {/* 02 — ¿Qué significa actuar con integridad? */}
      <Slide num="02" title={<>¿Qué significa actuar con <span className="accent">integridad</span>?</>} lead="Hacer lo correcto, incluso cuando nadie nos observa.">
        <div className="icon-grid center-items">
          <Item icon="shield" title="Honestidad absoluta">Actuar con absoluta honestidad en todo momento.</Item>
          <Item icon="user" title="Responsabilidad">Asumir la responsabilidad de nuestras decisiones.</Item>
          <Item icon="target" title="Estándares de conducta">Mantener los más altos estándares de conducta profesional.</Item>
        </div>
      </Slide>

      {/* 03 — Nuestra Cultura Subastop */}
      <Slide num="03" title={<>Nuestra Cultura <span className="accent">Subastop</span></>} lead="Nuestros principios se reflejan en cada decisión que tomamos.">
        <div className="icon-grid center-items">
          <Item icon="star" title="Excelencia" />
          <Item icon="bulb" title="Innovación" />
          <Item icon="shield" title="Responsabilidad" />
          <Item icon="heart" title="Compromiso" />
        </div>
        <Callout>Valoramos personas que cuestionan, proponen, mejoran y actúan con coherencia.</Callout>
      </Slide>

      {/* 04 — Todos tenemos una responsabilidad */}
      <Slide num="04" title={<>Todos tenemos una <span className="accent">responsabilidad</span></>} lead="La ética nos involucra a todos, sin excepciones.">
        <Checks
          items={[
            "Actuar de forma profesional.",
            "Proteger la información.",
            "Cumplir nuestras políticas internas.",
            "Fomentar un entorno de respeto y confianza.",
          ]}
        />
      </Slide>

      {/* 05 — Riesgos que debemos prevenir */}
      <Slide num="05" title={<>Riesgos que debemos <span className="accent">prevenir</span></>}>
        <div className="card-grid">
          <Item icon="people" title="Conflictos de interés" />
          <Item icon="mask" title="Fraude" />
          <Item icon="doc" title="Uso indebido de la información" />
          <Item icon="sliders" title="Manipulación de procesos" />
          <Item icon="lock" title="Accesos no autorizados" />
          <Item icon="gavel" title="Incumplimientos regulatorios" />
        </div>
      </Slide>

      {/* 06 — Las decisiones importan */}
      <Slide num="06" title={<>Las decisiones <span className="accent">importan</span></>} lead="Las decisiones pequeñas pueden generar grandes consecuencias.">
        <div className="glass qcard">
          <span className="ic"><Icon name="question" size={40} /></span>
          <div>
            <h3>Situaciones cotidianas de riesgo</h3>
            <Checks
              items={[
                "Beneficios ofrecidos por proveedores.",
                "Manejo de información sensible.",
                "Falta de transparencia en procesos.",
              ]}
            />
          </div>
        </div>
        <Callout>Claves para actuar: Criterio, objetividad y responsabilidad.</Callout>
      </Slide>

      {/* 07 — Integridad y anticorrupción */}
      <Slide num="07" title={<>Integridad y <span className="accent">anticorrupción</span></>} lead="Política de Tolerancia Cero frente al fraude y la corrupción.">
        <Checks
          items={[
            "No aceptamos beneficios que influyan en nuestras decisiones.",
            "Garantizamos la imparcialidad en todas nuestras operaciones.",
            "Actuamos siempre en beneficio de Subastop.",
          ]}
        />
      </Slide>

      {/* 08 — Protección de la información */}
      <Slide num="08" title={<>Protección de la <span className="accent">información</span></>} lead="La información es uno de nuestros activos más valiosos.">
        <Checks
          items={[
            "Exclusivo para fines autorizados.",
            "Respeto absoluto a la confidencialidad.",
            "Prevención de accesos y divulgaciones no autorizadas.",
          ]}
        />
      </Slide>

      {/* 09 — Canal Ético */}
      <Slide num="09" title={<>Canal <span className="accent">Ético</span></>} lead="Herramienta para reportar situaciones contrarias a nuestros principios y normativas.">
        <Flow
          steps={[
            { icon: "alert", label: "Identifica la situación" },
            { icon: "send", label: "Realiza tu reporte" },
            { icon: "clipboard", label: "Evaluamos con imparcialidad" },
            { icon: "check", label: "Tomamos acciones y damos seguimiento" },
          ]}
        />
        <p>Mecanismo seguro, responsable y confidencial.</p>
        <Callout>Hablar y reportar también es actuar con integridad.</Callout>
      </Slide>

      {/* 10 — Confidencialidad y cero represalias */}
      <Slide num="10" title={<>Confidencialidad y <span className="accent">cero represalias</span></>}>
        <div className="icon-grid center-items">
          <Item icon="scale" title="Imparcialidad">Tratamiento objetivo e imparcial de todos los reportes.</Item>
          <Item icon="shield" title="Garantía">Garantía de NO represalias para quienes reportan de buena fe.</Item>
          <Item icon="lock" title="Protección total">Protección total para fortalecer nuestra cultura ética.</Item>
        </div>
      </Slide>

      {/* 11 — Nuestro compromiso */}
      <Slide num="11" title={<>Nuestro <span className="accent">compromiso</span></>} lead="La ética se demuestra con decisiones y acciones diarias, no solo con palabras.">
        <div className="icon-grid center-items">
          <Item icon="heart" title="">Todos tenemos un rol fundamental.</Item>
          <Item icon="shield" title="">Protegemos nuestros valores, nuestra reputación y nuestro futuro.</Item>
        </div>
      </Slide>

      {/* 12 — ¡Gracias! */}
      <TitleSlide
        num="12"
        title={<><span className="accent">¡Gracias!</span></>}
      >
        <p>Gracias por ser parte de Subastop.</p>
        <p>Sigamos fortaleciendo nuestra organización a través de la integridad.</p>
        <Callout>Juntos construimos un futuro sostenible.</Callout>
        <Wordmark />
        <Button
          variant="primary"
          onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "Home" }))}
        >
          Volver al inicio
        </Button>
      </TitleSlide>
    </Deck>
  );
}
