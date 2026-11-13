"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/*
  One place for all page motion. Sections opt in with data attributes:
    data-anim="hero"          hero items, played in order on load
    data-anim="hero-bg"       hero photo, slow parallax while scrolling
    data-anim="up"            fades up when scrolled into view
    data-anim="stagger"       its children fade up one after another
    data-anim="polaroid-l|r"  swings in from that side
    data-anim="letters"       its children rise from below (footer wordmark)
  Everything is skipped when the visitor prefers reduced motion.
*/
export default function Animations() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = <T extends Element = HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel);
      const ease = "power3.out";

      // Hero intro
      gsap.from(q("[data-anim='hero']"), { y: 28, autoAlpha: 0, duration: 0.9, ease, stagger: 0.12, delay: 0.1 });
      const heroBg = q("[data-anim='hero-bg']")[0];
      if (heroBg) {
        gsap.fromTo(heroBg, { scale: 1.12 }, { scale: 1, duration: 2.4, ease: "power2.out" });
        gsap.to(heroBg, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: heroBg.closest("section"), start: "top top", end: "bottom top", scrub: true },
        });
      }

      // Single elements
      q("[data-anim='up']").forEach((el) =>
        gsap.from(el, {
          y: 36,
          autoAlpha: 0,
          duration: 0.9,
          ease,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }),
      );

      // Groups whose children come in one after another
      q("[data-anim='stagger']").forEach((group) =>
        gsap.from(group.children, {
          y: 44,
          autoAlpha: 0,
          duration: 0.85,
          ease,
          stagger: 0.12,
          scrollTrigger: { trigger: group, start: "top 82%", once: true },
        }),
      );

      // Polaroids swing in from their side (a shorter slide on phones)
      const slide = window.matchMedia("(min-width: 1024px)").matches ? 70 : 24;
      (["l", "r"] as const).forEach((side) =>
        q(`[data-anim='polaroid-${side}']`).forEach((el) =>
          gsap.from(el, {
            x: side === "l" ? -slide : slide,
            rotate: side === "l" ? -10 : 10,
            autoAlpha: 0,
            duration: 1.1,
            ease,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }),
        ),
      );

      // Footer wordmark rises from behind the hill, letter by letter
      q("[data-anim='letters']").forEach((word) =>
        gsap.from(word.children, {
          yPercent: 110,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.06,
          scrollTrigger: { trigger: word, start: "top 95%", once: true },
        }),
      );
    });

    return () => mm.revert();
  });

  return null;
}
