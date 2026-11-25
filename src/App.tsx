import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import GalleryPage from "@/pages/gallery-page";
import HomePage from "@/pages/home-page";
import LicensePage from "@/pages/license-page";
import NotFoundPage from "@/pages/not-found-page";
import { WhatsAppProvider } from "@/providers/whatsapp-provider";
import { logger } from "@/lib/logger";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    logger.step("route:change", pathname);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <WhatsAppProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/license" element={<LicensePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </WhatsAppProvider>
  );
}
