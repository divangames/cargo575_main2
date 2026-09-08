////////////////////////////////////////////////////////
//
// Корень приложения: контекст заявки и секции лендинга
//
////////////////////////////////////////////////////////

import { useCallback, useMemo, useState } from "react";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { StickyCta } from "./components/layout/StickyCta";
import { LeadModal } from "./components/lead/LeadModal";
import { Categories } from "./components/sections/Categories";
import { Cases } from "./components/sections/Cases";
import { Compare } from "./components/sections/Compare";
import { Extra } from "./components/sections/Extra";
import { Faq } from "./components/sections/Faq";
import { FinalCalc } from "./components/sections/FinalCalc";
import { Hero } from "./components/sections/Hero";
import { Included } from "./components/sections/Included";
import { Offices } from "./components/sections/Offices";
import { Process } from "./components/sections/Process";
import { QuickCalc } from "./components/sections/QuickCalc";
import { Reviews } from "./components/sections/Reviews";
import { Safety } from "./components/sections/Safety";
import { Tariffs } from "./components/sections/Tariffs";
import { Why } from "./components/sections/Why";
import { LeadModalContext } from "./hooks/useLeadModal";
import type { LeadPayload, LeadSource } from "./types/lead";

/** Собирает посадочную страницу карго-доставки */
export function App() {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<LeadSource>("header");
  const [preset, setPreset] = useState<Partial<LeadPayload>>({});

  const openLead = useCallback((next: LeadSource, nextPreset?: Partial<LeadPayload>) => {
    setSource(next);
    setPreset(nextPreset ?? {});
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ openLead }), [openLead]);

  return (
    <LeadModalContext.Provider value={value}>
      <a className="skip-link" href="#top">
        К содержанию
      </a>
      <Header />
      <main>
        <Hero />
        <QuickCalc />
        <Tariffs />
        <Included />
        <Categories />
        <Cases />
        <Process />
        <Safety />
        <Why />
        <Offices />
        <Reviews />
        <Compare />
        <Extra />
        <Faq />
        <FinalCalc />
      </main>
      <Footer />
      <StickyCta />
      <LeadModal open={open} source={source} preset={preset} onClose={() => setOpen(false)} />
    </LeadModalContext.Provider>
  );
}
