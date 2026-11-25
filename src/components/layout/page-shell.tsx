import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";

type PageShellProps = {
  children: ReactNode;
  /** Use on pages whose hero sits behind the header on large landscape screens. */
  headerOverlay?: boolean;
};

/** Shared chrome: skip link, branded header, main landmark and footer. */
export function PageShell({ children, headerOverlay = false }: PageShellProps) {
  return (
    <>
      <SkipLink />
      <SiteHeader overlay={headerOverlay} />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
