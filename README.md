# Voyager Slides — Presentaciones Subastop

<!-- last_updated: 2026-07-07 -->

Constructor de presentaciones a pantalla completa con estética liquid glass oscura,
montado sobre el design system **Concorde** de Subastop.

## Correr

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # producción → dist/
```

## Estructura

- `src/deck.tsx` — motor: `<Deck>` (routing por hash `#/<deck>/<slide>`, crossfade entre
  slides, fondo de video HLS, controles auto-ocultables) + plantillas (`Slide`,
  `TitleSlide`, `Item`, `Checks`, `Flow`, `Callout`, `Split`, `Stat`, `Wordmark`).
- `src/deck.css` — vidrio, tipografía, reveals palabra a palabra, numeral fantasma, HUD.
- `src/App.tsx` — home: galería de presentaciones + catálogo de referencias de animación.
- `src/decks/` — una presentación por archivo (`etica.tsx`).
- `concorde/` — componentes del design system traídos con
  `npx github:AaronCoorahua/ConcordeV2#cli add <nombre>` (alias `@/` → raíz del proyecto).

## Crear una presentación

1. Duplica `src/decks/etica.tsx` y cambia el contenido de los slides.
2. Agrega la entrada al array `DECKS` en `src/App.tsx`.

Navegación: ← → ␣ ↑ ↓ · `F` pantalla completa · `Home`/`End` primer/último slide.
