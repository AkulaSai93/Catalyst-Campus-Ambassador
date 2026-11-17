import type { ReactNode } from "react";

export type ControlState = "idle" | "invalid" | "verified";

export function controlClass(state: ControlState = "idle", extra = "") {
  const tone =
    state === "invalid"
      ? "border-err focus-within:ring-err/10"
      : state === "verified"
        ? "border-ok/60"
        : "border-black/[0.12] hover:border-black/25 focus-within:border-ink";
  return `relative flex items-center rounded-md border bg-white transition focus-within:ring-[3px] focus-within:ring-black/[0.06] ${tone} ${extra}`;
}

// rounded to match the control's inner corner, so the white autofill fill doesn't square off the border
export const inputClass =
  "min-w-0 flex-1 rounded-[5px] bg-transparent px-3 py-2.5 text-[14.5px] text-ink outline-none placeholder:text-[#a6a6b2] read-only:text-muted";

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
    <div className="mb-4">
      <label htmlFor={htmlFor} id={id} className="mb-1.5 block text-[12.5px] font-medium text-[#3a3a46]">
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-[12px] text-err">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-[12px] text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

export function Spinner() {
  return <span className="mr-3 size-4 animate-spin rounded-full border-2 border-black/10 border-t-ink" />;
}
