import "@fontsource/figtree/latin-400.css";
import "@fontsource/figtree/latin-500.css";
import "@fontsource/figtree/latin-600.css";
import "@fontsource/figtree/latin-700.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "@/App";
import { logger } from "@/lib/logger";
import "@/styles/index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root was not found in index.html");
}

logger.step("boot", "Application starting", {
  mode: import.meta.env.MODE,
  base: import.meta.env.BASE_URL,
  dev: import.meta.env.DEV,
});

if (import.meta.env.DEV) {
  void import("@/dev/dev-log-panel").then(({ mountDevLogPanel }) => mountDevLogPanel());
}

createRoot(rootElement).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);

logger.step("boot", "React tree mounted");
