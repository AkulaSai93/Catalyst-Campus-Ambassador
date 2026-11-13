"use client";

import { useEffect, useRef } from "react";
import SignupForm from "./SignupForm";

export default function HeroCta() {
  const dialog = useRef<HTMLDialogElement>(null);

  function open() {
    dialog.current?.showModal();
    setTimeout(() => document.getElementById("name")?.focus(), 50);
  }

  // Lock page scroll while the popup is open
  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const sync = () => {
      document.documentElement.style.overflow = el.open ? "hidden" : "";
    };
    const observer = new MutationObserver(sync);
    observer.observe(el, { attributes: true, attributeFilter: ["open"] });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <button type="button" onClick={open} aria-haspopup="dialog" className="group mt-2 inline-flex flex-col items-center">
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

      {/* Sign-up popup. Stays mounted when closed so a half-finished form keeps its progress. */}
      <dialog
        ref={dialog}
        aria-labelledby="signup-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
        className="m-auto w-[calc(100%-32px)] max-w-[480px] overflow-visible bg-transparent p-0 text-left backdrop:bg-ink/40 backdrop:backdrop-blur-sm open:animate-pop max-sm:mt-auto max-sm:mb-4"
      >
        <div className="max-h-[calc(100svh-32px)] overflow-y-auto rounded-[22px]">
          <SignupForm />
        </div>
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          aria-label="Close"
          className="absolute top-5 right-5 grid size-9 place-items-center rounded-full text-muted transition hover:bg-field hover:text-text sm:top-7 sm:right-7"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </dialog>
    </>
  );
}
