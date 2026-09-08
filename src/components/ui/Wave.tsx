////////////////////////////////////////////////////////
//
// Волна между цветовыми плоскостями
//
////////////////////////////////////////////////////////

import "./Wave.css";

interface Props {
  from?: string;
  to?: string;
  invert?: boolean;
}

/** Мягкий стык секций в духе индустриального плаката */
export function Wave({ from = "#0088d8", to = "#f5faff", invert = false }: Props) {
  return (
    <div className={`wave ${invert ? "is-invert" : ""}`} aria-hidden="true" style={{ background: to }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path fill={from} d="M0 0h1440v28C1180 78 860 80 720 52 520 12 220 8 0 48V0Z" />
      </svg>
    </div>
  );
}
