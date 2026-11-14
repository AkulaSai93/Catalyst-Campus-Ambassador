"use client";

import dynamic from "next/dynamic";
import successAnimation from "@/assets/success-lottie.json";

// lottie-web touches `document` on import, so load the player in the browser only
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

/* Badge tick from the Catalyst engagement site: ring sweeps, badge pops, tick draws, sparks burst. Plays once. */
export default function SuccessTick({ className = "" }: { className?: string }) {
  return (
    <span className={`mx-auto block ${className}`} aria-hidden>
      <Lottie animationData={successAnimation} loop={false} autoplay className="h-full w-full" />
    </span>
  );
}
