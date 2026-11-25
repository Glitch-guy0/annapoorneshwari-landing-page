import { Link } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { PageShell } from "@/components/layout/page-shell";
import { BRAND, PAGE_META } from "@/constants/site";
import { useDocumentMeta } from "@/hooks/use-document-meta";

export default function LicensePage() {
  useDocumentMeta(PAGE_META.license);

  return (
    <PageShell>
      <section className="border-b border-line bg-surface py-14 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <span className="mb-3 inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
              Legal & Copyright
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
              License & Terms of Use
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              All materials, design, branding, and content published on this website are proprietary. No permission is granted for reproduction or reuse.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="max-w-3xl space-y-10 text-ink">
            {/* Core notice callout */}
            <div className="rounded-xl border border-brand/20 bg-brand/[0.03] p-6">
              <h2 className="text-base font-semibold uppercase tracking-wide text-brand">
                Strict Proprietary Notice
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/90 sm:text-base">
                This website and its associated assets are solely for personal informational viewing. No license, express or implied, is granted to any party to copy, use, adapt, distribute, or repurpose any portion of this site.
              </p>
            </div>

            {/* Section 1 */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold tracking-tight text-ink">
                1. Copyright & Ownership
              </h2>
              <p className="text-sm leading-relaxed text-muted sm:text-base">
                All content on this website—including business name (<strong className="text-ink">{BRAND.name}</strong>), logos, photographic assets, text copy, graphic elements, layout structures, and underlying software code—is the exclusive intellectual property of {BRAND.name}.
              </p>
              <p className="text-sm leading-relaxed text-muted sm:text-base">
                Copyright © {BRAND.copyrightYear} {BRAND.name}. All rights reserved.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold tracking-tight text-ink">
                2. Explicit Restrictions
              </h2>
              <p className="text-sm leading-relaxed text-muted sm:text-base">
                Unless explicitly authorized in advance in writing by {BRAND.name}, you may not:
              </p>
              <ul className="space-y-2.5 pl-5 text-sm text-muted list-disc sm:text-base">
                <li>
                  <strong className="text-ink">Copy or republish:</strong> Reproduce, duplicate, mirror, host, or download any media, code, or content from this site.
                </li>
                <li>
                  <strong className="text-ink">Commercial reuse:</strong> Use our branding, vehicle fleet images, service descriptions, or contact information for commercial ventures or promotional activities.
                </li>
                <li>
                  <strong className="text-ink">Derivative works:</strong> Modify, reverse engineer, decompile, or create derivative projects based on this platform.
                </li>
                <li>
                  <strong className="text-ink">Automated extraction:</strong> Scrape, crawl, or harvest data, text, or images using automated scrapers, bots, or AI training datasets.
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold tracking-tight text-ink">
                3. No Implied Rights
              </h2>
              <p className="text-sm leading-relaxed text-muted sm:text-base">
                Access to this website does not transfer ownership, grant any intellectual property rights, or provide any license under trademark, patent, or copyright laws. Any unauthorized use immediately terminates any permissive browsing rights and may lead to legal remedies.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold tracking-tight text-ink">
                4. Inquiries
              </h2>
              <p className="text-sm leading-relaxed text-muted sm:text-base">
                If you have legal inquiries or require written permissions, please reach out directly through the official contact channels on our home page.
              </p>
            </div>

            {/* Bottom link */}
            <div className="border-t border-line pt-6">
              <Link
                to="/"
                className="inline-flex items-center text-sm font-semibold text-brand underline underline-offset-4 hover:text-brand-hover"
              >
                ← Return to Homepage
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
