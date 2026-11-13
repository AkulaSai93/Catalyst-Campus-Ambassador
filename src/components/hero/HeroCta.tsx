"use client";

import { openSignup } from "./SignupDialog";

/* "Become an Ambassador" with the red "Free to join" tab on top. Opens the shared sign-up popup. */
export default function HeroCta() {
  return (
    <button type="button" onClick={openSignup} aria-haspopup="dialog" className="group mt-2 inline-flex flex-col items-center">
      {/* Tagline tab, with inverted corners flaring into the button */}
      <span className="relative z-10 rounded-t-md bg-brand px-3.5 pt-1 pb-0.5 text-[10px] font-semibold tracking-[0.1em] text-white uppercase before:absolute before:bottom-0 before:-left-1.5 before:size-1.5 before:bg-[radial-gradient(circle_at_0_0,transparent_5.5px,var(--color-brand)_6px)] after:absolute after:-right-1.5 after:bottom-0 after:size-1.5 after:bg-[radial-gradient(circle_at_100%_0,transparent_5.5px,var(--color-brand)_6px)]">
        Free to join · Takes 2 minutes
      </span>
      <span className="flex items-center gap-3 rounded-md bg-white px-8 py-3 text-[15px] font-medium text-ink transition group-hover:bg-white/90">
        Become an Ambassador
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      </span>
    </button>
  );
}
