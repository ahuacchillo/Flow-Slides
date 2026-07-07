// etica.tsx — Presentación: La confianza se construye todos los días (ética Subastop)
import { Deck, Slide, TitleSlide, Callout, Checks, Flow, Item, Wordmark } from "../deck";
import { Icon } from "../icons";
import Button from "@/concorde/components/Button";

export default function EticaDeck() {
  return (
    <Deck id="etica" video="https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8">
      {/* 01 */}
      <TitleSlide
        num="01"
        title={<>La confianza se construye <span className="accent">todos los días</span></>}
      >
        <p>En Subastop, la ética no es solo una política.</p>
        <p>Es la forma en que trabajamos.<br />Es la forma en que construimos confianza.</p>
        <Wordmark />
      </TitleSlide>

      {/* 02 */}
      <Slide num="02" title={<>¿Qué significa actuar con <span className="accent">integridad</span>?</>} lead="Es hacer lo correcto incluso cuando nadie nos está observando.">
        <div className="icon-grid center-items">
          <Item icon="shield" title="Honestidad">Decimos la verdad y actuamos con coherencia.</Item>
          <Item icon="user" title="Responsabilidad">Asumimos las consecuencias de nuestras acciones.</Item>
          <Item icon="target" title="Profesionalismo">Mantenemos los más altos estándares de conducta en todo momento.</Item>
          <Item icon="check" title="Confianza">Nuestras acciones generan credibilidad y fortalecen nuestra reputación.</Item>
        </div>
      </Slide>

      {/* 03 */}
      <Slide num="03" title={<>Nuestra <span className="accent">cultura</span></>} lead="Promovemos una cultura basada en principios que impulsan nuestro crecimiento y fortalecen a nuestro equipo.">
        <div className="icon-grid center-items">
          <Item icon="star" title="Excelencia e innovación" />
          <Item icon="bulb" title="Curiosidad y disrupción" />
          <Item icon="mountain" title="Ambición con propósito" />
          <Item icon="trend" title="Mejora continua" />
          <Item icon="people" title="Compromiso con los citizens" />
        </div>
      </Slide>

      {/* 04 */}
      <Slide num="04" title={<>Todos tenemos una <span className="accent">responsabilidad</span></>} lead="Cada colaborador es clave para construir un entorno ético, seguro y confiable.">
        <Checks
          items={[
            "Actuar con integridad y respeto",
            "Cumplir nuestras políticas y procedimientos",
            "Proteger la información y los recursos",
            "Reportar situaciones de riesgo",
            "Promover un ambiente de confianza y colaboración",
          ]}
        />
      </Slide>

      {/* 05 */}
      <Slide num="05" title={<>Riesgos que debemos <span className="accent">prevenir</span></>} lead="Identificamos riesgos que pueden afectar nuestra integridad, reputación y sostenibilidad.">
        <div className="card-grid">
          <Item icon="people" title="Conflictos de interés">Pueden afectar nuestra objetividad y nuestras decisiones.</Item>
          <Item icon="mask" title="Fraude">Puede generar pérdidas económicas y dañar nuestra reputación.</Item>
          <Item icon="doc" title="Uso indebido de información">La información confidencial debe usarse solo para fines autorizados.</Item>
          <Item icon="sliders" title="Manipulación de procesos">Afecta la transparencia y la equidad en nuestras operaciones.</Item>
          <Item icon="lock" title="Accesos no autorizados">Pueden comprometer la seguridad de la información.</Item>
          <Item icon="gavel" title="Incumplimientos regulatorios">Pueden generar consecuencias legales y reputacionales.</Item>
        </div>
      </Slide>

      {/* 06 */}
      <Slide num="06" title={<>Las decisiones <span className="accent">importan</span></>} lead="Situaciones simples pueden tener grandes consecuencias.">
        <div className="glass qcard">
          <span className="ic"><Icon name="question" size={40} /></span>
          <div>
            <h3>¿Qué harías en esta situación?</h3>
            <p>Un proveedor te ofrece un beneficio personal durante una negociación.</p>
          </div>
        </div>
        <p>Actuar con criterio y objetividad protege nuestra integridad y la de nuestra organización.</p>
      </Slide>

      {/* 07 */}
      <Slide num="07" title={<>Integridad, <span className="accent">anticorrupción</span> y <span className="accent">antisoborno</span></>} lead="En Subastop tenemos tolerancia cero frente a cualquier práctica indebida.">
        <Checks
          items={[
            "No ofrecemos ni aceptamos beneficios indebidos.",
            "No realizamos pagos de facilitación.",
            "No participamos en actos de corrupción, fraude o soborno.",
            "Actuamos siempre en beneficio de la organización y nuestros grupos de interés.",
          ]}
        />
      </Slide>

      {/* 08 */}
      <Slide num="08" title={<>La información también debe <span className="accent">protegerse</span></>} lead="La información es un activo estratégico.">
        <Checks
          items={[
            "Úsala solo para fines autorizados.",
            "Respeta la confidencialidad.",
            "Evita accesos, usos o divulgaciones no autorizadas.",
            "Reporta cualquier incidente de seguridad.",
          ]}
        />
      </Slide>

      {/* 09 */}
      <Slide num="09" title={<>Canal <span className="accent">Ético</span></>} lead="Si identificas una situación contraria a nuestros principios o políticas, repórtala.">
        <Flow
          steps={[
            { icon: "alert", label: "Identifica la situación" },
            { icon: "send", label: "Realiza tu reporte" },
            { icon: "clipboard", label: "Evaluamos con imparcialidad" },
            { icon: "check", label: "Tomamos acciones y damos seguimiento" },
          ]}
        />
        <Callout>Hablar también es actuar con integridad.</Callout>
      </Slide>

      {/* 10 */}
      <Slide num="10" title={<>Confidencialidad y <span className="accent">no represalias</span></>} lead="Tu reporte estará siempre protegido.">
        <div className="icon-grid center-items">
          <Item icon="lock" title="Confidencialidad">Tu identidad será protegida.</Item>
          <Item icon="scale" title="Imparcialidad">Investigaremos de manera objetiva y responsable.</Item>
          <Item icon="people" title="No represalias">Nadie que reporte de buena fe será objeto de represalias.</Item>
        </div>
      </Slide>

      {/* 11 */}
      <Slide num="11" title={<>Nuestro <span className="accent">compromiso</span></>} lead="La ética no se demuestra con palabras, se demuestra con decisiones.">
        <div className="icon-grid center-items">
          <Item icon="heart" title="">Actuamos con integridad en cada decisión.</Item>
          <Item icon="people" title="">Protegemos nuestra reputación y la confianza que depositan en nosotros.</Item>
          <Item icon="trend" title="">Construimos juntos una Subastop más fuerte y sostenible.</Item>
        </div>
      </Slide>

      {/* 12 */}
      <TitleSlide
        num="12"
        title={<><span className="accent">Gracias</span> por ser parte de nuestra cultura ética</>}
      >
        <p>Juntos construimos confianza, integridad y un futuro sostenible.</p>
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
