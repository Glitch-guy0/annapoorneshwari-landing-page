import { ServiceRow } from "@/components/gallery/service-row";
import { Container } from "@/components/ui/container";
import { GALLERY_ITEMS } from "@/constants/gallery";

export function GalleryShowcase() {
  return (
    <section aria-label="Service showcase" className="pb-20 pt-6 max-sm:pb-12">
      <Container>
        <div className="flex flex-col gap-20 max-lg:gap-12 max-sm:gap-10">
          {GALLERY_ITEMS.map((item, index) => (
            <ServiceRow key={item.id} item={item} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
