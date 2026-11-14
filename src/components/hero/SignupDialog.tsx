"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SignupForm from "./SignupForm";

/* Any "Become an Ambassador" button opens this one popup by dispatching this event. */
export const OPEN_SIGNUP = "open-signup";

export function openSignup() {
  window.dispatchEvent(new Event(OPEN_SIGNUP));
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), [tabindex]:not([tabindex="-1"])';

/*
  Mounted once on the page. Stays mounted when closed so a half-finished form keeps its progress.

  A regular fixed overlay rather than <dialog>.showModal(): the native modal goes into the browser's
  top layer and makes everything else inert — including UI that browser extensions inject into the
  page (e.g. Figma's capture toolbar), which then can't be clicked. Here we handle Esc, outside click,
  focus trap and scroll lock ourselves instead.
*/
export default function SignupDialog() {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  // Open on the shared event
  useEffect(() => {
    const onOpen = () => {
      opener.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    };
    window.addEventListener(OPEN_SIGNUP, onOpen);
    return () => window.removeEventListener(OPEN_SIGNUP, onOpen);
  }, []);

  // While open: lock page scroll, focus the first field, handle Esc and keep Tab inside the panel
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => {
      const first = document.getElementById("name");
      (first && first.offsetParent ? first : panel.current?.querySelector<HTMLElement>(FOCUSABLE))?.focus();
    }, 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab" || !panel.current) return;
      const items = [...panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      opener.current?.focus?.();
    };
  }, [open, close]);

  return (
    <div
      hidden={!open}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4 backdrop-blur-sm sm:items-center"
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-title"
        className="relative w-full max-w-[480px] animate-pop text-left"
      >
        <div className="max-h-[calc(100svh-32px)] overflow-y-auto rounded-lg">
          <SignupForm />
        </div>
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 grid size-8 place-items-center rounded-md text-muted transition hover:bg-black/[0.05] hover:text-ink sm:top-5 sm:right-5"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
