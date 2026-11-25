import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Stagger the hero's direct content blocks on first paint.
 * Any descendant marked with `data-hero-item` participates.
 */
export function useHeroIntro<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;

    const context = gsap.context(() => {
      gsap.from(root.querySelectorAll("[data-hero-item]"), {
        autoAlpha: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.08,
      });
    }, root);

    return () => context.revert();
  }, []);

  return ref;
}
