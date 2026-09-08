////////////////////////////////////////////////////////
//
// Кнопка: основная, вторичная, призрачная
//
////////////////////////////////////////////////////////

import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.css";

type Variant = "primary" | "secondary" | "ghost" | "light";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

/** Кнопка действий лендинга */
export function Button({ variant = "primary", className = "", children, ...rest }: Props) {
  return (
    <button className={`btn btn-${variant} ${className}`} {...rest}>
      {children}
    </button>
  );
}
