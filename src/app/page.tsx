import { AboutSection } from "@/components/home/AboutSection";
import { Hero } from "@/components/home/Hero";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { QuoteSection } from "@/components/home/QuoteSection";
import { ServicesSection } from "@/components/home/ServicesSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuoteSection />
      <ProjectsSection />
      <AboutSection />
      <ServicesSection />
    </>
  );
}
