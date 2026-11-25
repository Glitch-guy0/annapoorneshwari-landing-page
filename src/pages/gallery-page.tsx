import { EnquiryBand } from "@/components/common/enquiry-band";
import { GalleryIntro } from "@/components/gallery/gallery-intro";
import { GalleryShowcase } from "@/components/gallery/gallery-showcase";
import { PageShell } from "@/components/layout/page-shell";
import { GALLERY_CLOSING } from "@/constants/gallery";
import { PAGE_META } from "@/constants/site";
import { useDocumentMeta } from "@/hooks/use-document-meta";

export default function GalleryPage() {
  useDocumentMeta(PAGE_META.gallery);

  return (
    <PageShell>
      <GalleryIntro />
      <GalleryShowcase />
      <EnquiryBand
        content={GALLERY_CLOSING}
        titleId="closing-cta-title"
        context="galleryClosing"
        source="gallery-closing"
      />
    </PageShell>
  );
}
