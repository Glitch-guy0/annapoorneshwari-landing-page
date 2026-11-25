import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

type RevealOptions = {
  y?: number;
  delay?: number;
  duration?: number;
};

const VIEWPORT_THRESHOLD = 0.88;

/**
 * Fade + rise an element the first time it reaches the viewport.
 *
 * A direct geometry check on scroll is used instead of IntersectionObserver:
 * it stays correct through fast flicks, anchor jumps and restored scroll
 * positions, so content can never remain permanently invisible.
 */
export function useReveal<T extends HTMLElement = HTMLElement>({
  y = 24,
  delay = 0,
  duration = 0.7,
}: RevealOptions = {}) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;

    const node = element;

    const animation = gsap.fromTo(
      node,
      { autoAlpha: 0, y },
      {
        autoAlpha: 1,
        y: 0,
        duration,
        delay,
        ease: "power2.out",
        paused: true,
        onComplete: () => gsap.set(node, { clearProps: "transform" }),
      },
    );

    let revealed = false;

    const stopListening = () => {
      window.removeEventListener("scroll", checkReveal);
      window.removeEventListener("resize", checkReveal);
    };

    function checkReveal() {
      if (revealed) return;
      const rect = node.getBoundingClientRect();
      const reached = rect.top <= window.innerHeight * VIEWPORT_THRESHOLD;
      if (!reached) return;

      revealed = true;
      animation.play();
      stopListening();
    }

    window.addEventListener("scroll", checkReveal, { passive: true });
    window.addEventListener("resize", checkReveal);
    const frame = window.requestAnimationFrame(checkReveal);

    return () => {
      window.cancelAnimationFrame(frame);
      stopListening();
      animation.kill();
    };
  }, [delay, duration, y]);

  return ref;
}
