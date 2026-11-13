"use client";

import { useEffect, useRef } from "react";
import SignupForm from "./SignupForm";

/* Any "Become an Ambassador" button opens this one popup by dispatching this event. */
export const OPEN_SIGNUP = "open-signup";

export function openSignup() {
  window.dispatchEvent(new Event(OPEN_SIGNUP));
}

/* Mounted once on the page. Stays mounted when closed so a half-finished form keeps its progress. */
export default function SignupDialog() {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;

    const open = () => {
      el.showModal();
      setTimeout(() => document.getElementById("name")?.focus(), 50);
    };
    // Lock page scroll while the popup is open
    const sync = () => {
      document.documentElement.style.overflow = el.open ? "hidden" : "";
    };
    const observer = new MutationObserver(sync);
    observer.observe(el, { attributes: true, attributeFilter: ["open"] });
    window.addEventListener(OPEN_SIGNUP, open);
    return () => {
      observer.disconnect();
      window.removeEventListener(OPEN_SIGNUP, open);
    };
  }, []);

  return (
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
  );
}
