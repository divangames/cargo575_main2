////////////////////////////////////////////////////////
//
// Нижняя sticky-панель расчёта на мобильных
//
////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import { useLeadModal } from "../../hooks/useLeadModal";
import { Button } from "../ui/Button";
import "./StickyCta.css";

/** Показывает CTA после ухода с первого экрана */
export function StickyCta() {
  const { openLead } = useLeadModal();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="sticky-cta">
      <Button type="button" onClick={() => openLead("header")}>
        Рассчитать доставку
      </Button>
    </div>
  );
}
