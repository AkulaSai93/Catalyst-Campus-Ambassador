import type { ReactNode } from "react";

export type ControlState = "idle" | "invalid" | "verified";

export function controlClass(state: ControlState = "idle", extra = "") {
  const tone =
    state === "invalid"
      ? "border-err"
      : state === "verified"
        ? "border-ok bg-[#f3fbf7]"
        : "border-field-line bg-field focus-within:border-text focus-within:bg-white";
  return `relative flex items-center rounded-xl border-[1.5px] transition focus-within:shadow-[0_0_0_4px_rgba(21,21,29,.06)] ${tone} ${extra}`;
}

export const inputClass =
  "min-w-0 flex-1 bg-transparent px-3.5 py-3 text-[15px] text-text outline-none placeholder:text-[#a2a2b0] read-only:text-muted";

export function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
  id,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <div className="mb-3.5">
      <label htmlFor={htmlFor} id={id} className="mb-1.5 block text-[13px] font-semibold text-[#2a2a35]">
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-[12.5px] text-err">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-[12.5px] text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

export function Spinner() {
  return <span className="mr-3 size-4 animate-spin rounded-full border-2 border-[#d4d4dc] border-t-text" />;
}
