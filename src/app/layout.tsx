import type { Metadata } from "next";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Providers } from "@/components/providers/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nogal | Carpintería en Las Palmas",
  description: "Diseñamos espacios que inspiran. Cocinas, armarios y reformas a medida.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <SiteHeader />
          <main className="site-main site-main--flush">{children}</main>
          <Footer />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
