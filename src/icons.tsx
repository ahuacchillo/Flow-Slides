// icons.tsx — íconos de línea para los slides (trazo lila, estilo Concorde)
import type { ReactNode } from "react";

const P: Record<string, ReactNode> = {
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.5" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.5 2.5L16 9.5" />
    </>
  ),
  star: <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8L3.5 9.7l5.9-.8L12 3.5z" />,
  bulb: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 1 3.5 10.9c-.9.7-1.5 1.3-1.5 2.1h-4c0-.8-.6-1.4-1.5-2.1A6 6 0 0 1 12 3z" />
    </>
  ),
  mountain: (
    <>
      <path d="M3 20l6-10 4 6 3-4 5 8H3z" />
      <path d="M14 4v5M14 4h4l-1.5 1.5L18 7h-4" />
    </>
  ),
  trend: (
    <>
      <path d="M4 19h16M5 15l4-4 3 3 6-7" />
      <path d="M18 7h-4M18 7v4" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="9" r="3" />
      <path d="M3.5 20c1.2-3 3.2-4.3 5.5-4.3s4.3 1.3 5.5 4.3" />
      <path d="M15.5 6.5a3 3 0 0 1 0 5.4M17 15.9c1.7.6 3 1.9 3.8 4.1" />
    </>
  ),
  mask: (
    <>
      <path d="M4 6.5C7 5.5 17 5.5 20 6.5v5a8 8 0 0 1-16 0v-5z" />
      <path d="M8 11c.7-.8 2-.8 2.7 0M13.3 11c.7-.8 2-.8 2.7 0M9.5 15.5c1.5 1 3.5 1 5 0" />
    </>
  ),
  doc: (
    <>
      <path d="M7 3h7l4 4v14H7V3z" />
      <path d="M14 3v4h4M10 12h5M10 16h5" />
    </>
  ),
  sliders: (
    <>
      <path d="M7 4v6M7 14v6M12 4v2M12 10v10M17 4v10M17 18v2" />
      <circle cx="7" cy="12" r="2" />
      <circle cx="12" cy="8" r="2" />
      <circle cx="17" cy="16" r="2" />
    </>
  ),
  lock: (
    <>
      <rect x="5.5" y="10.5" width="13" height="9.5" rx="2" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
      <circle cx="12" cy="15" r="1.3" />
    </>
  ),
  gavel: (
    <>
      <path d="M13 5l6 6M10 8l6 6M12 6.5L8.5 10a1.5 1.5 0 0 0 2 2L14 8.5M14.5 12.5L9 18" />
      <path d="M4 21h9" />
    </>
  ),
  scale: (
    <>
      <path d="M12 4v16M6 20h12M12 6L6 8M12 6l6 2" />
      <path d="M3.5 13.5L6 8l2.5 5.5a2.5 2.5 0 0 1-5 0zM15.5 13.5L18 8l2.5 5.5a2.5 2.5 0 0 1-5 0z" />
    </>
  ),
  heart: <path d="M12 20s-7.5-4.7-9-9.3C2 7.5 4 5 6.8 5c2 0 3.7 1.1 5.2 3.2C13.5 6.1 15.2 5 17.2 5 20 5 22 7.5 21 10.7c-1.5 4.6-9 9.3-9 9.3z" />,
  question: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5A2.5 2.5 0 1 1 12 12.5v1.2M12 17h.01" />
    </>
  ),
  alert: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5M12 16.5h.01" />
    </>
  ),
  send: <path d="M21 3L10.5 13.5M21 3l-7 18-3.5-7.5L3 10l18-7z" />,
  clipboard: (
    <>
      <rect x="6" y="4.5" width="12" height="16" rx="2" />
      <path d="M9.5 4.5a2.5 2.5 0 0 1 5 0M9.5 11l2 2 3.5-3.5" />
    </>
  ),
};

export type IconName = keyof typeof P;

export function Icon({ name, size = 34 }: { name: IconName; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {P[name]}
    </svg>
  );
}
