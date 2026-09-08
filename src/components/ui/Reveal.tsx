////////////////////////////////////////////////////////
//
// Появление секции
//
////////////////////////////////////////////////////////

import type { ReactNode } from "react";
import { useInView } from "../../hooks/useInView";
import "./Reveal.css";

interface Props {
  children: ReactNode;
  className?: string;
}

/** Оборачивает блок анимацией появления */
export function Reveal({ children, className = "" }: Props) {
  const { ref, visible } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${visible ? "is-in" : ""} ${className}`}>
      {children}
    </div>
  );
}
