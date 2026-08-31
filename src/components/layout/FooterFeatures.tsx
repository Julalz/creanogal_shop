"use client";

import { usePathname } from "next/navigation";
import { CtaSection } from "@/components/sections/CtaSection";
import { FeaturesStrip } from "@/components/sections/FeaturesStrip";

const HIDDEN_ON = [
  "/",
  "/nosotros",
  "/cocinas",
  "/quooker",
  "/carpinteria",
  "/reformas",
  "/proyectos",
  "/contacto",
  "/productos",
  "/checkout",
  "/carrito",
  "/accesibilidad",
  "/politica-privacidad",
  "/gestion-cookies",
  "/politica-cookies",
  "/aviso-legal",
];

export function FooterFeatures() {
  const pathname = usePathname();

  const isHidden = HIDDEN_ON.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isHidden) {
    return null;
  }

  return (
    <>
      <CtaSection />
      <FeaturesStrip variant="light" />
    </>
  );
}
