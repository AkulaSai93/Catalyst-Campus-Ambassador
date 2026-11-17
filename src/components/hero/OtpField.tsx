"use client";

import { useEffect, useRef, useState } from "react";
import { sendOtp, verifyOtp, type OtpChannel } from "@/lib/api";
import { Field, controlClass, inputClass } from "./ui";
import { Check } from "./icons";

const RESEND_SECONDS = 30;

const config: Record<
  OtpChannel,
  { label: string; placeholder: string; error: string; valid: (v: string) => boolean }
> = {
  phone: {
    label: "Mobile number",
    placeholder: "10-digit mobile number",
    error: "Enter a valid 10-digit Indian mobile number.",
    valid: (v) => /^[6-9]\d{9}$/.test(v),
  },
  email: {
    label: "Email",
    placeholder: "you@college.edu",
    error: "Enter a valid email address.",
    valid: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v),
  },
};

export default function OtpField({
  channel,
  onVerified,
}: {
  channel: OtpChannel;
  onVerified: (value: string | null) => void;
}) {
  const { label, placeholder, error: errorText, valid } = config[channel];
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const [stage, setStage] = useState<"idle" | "sending" | "otp" | "verified">("idle");
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [checking, setChecking] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [shake, setShake] = useState(false);
  const [left, setLeft] = useState(0);
  const cells = useRef<(HTMLInputElement | null)[]>([]);

  const isValid = valid(value.trim());
  const showError = touched && value && !isValid && stage === "idle";

  useEffect(() => {
    if (left <= 0) return;
    const t = setTimeout(() => setLeft((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);

  async function send() {
    setStage("sending");
    await sendOtp(channel, value.trim());
    setDigits(Array(6).fill(""));
    setOtpError("");
    setLeft(RESEND_SECONDS);
    setStage("otp");
    setTimeout(() => cells.current[0]?.focus(), 0);
  }

  async function check(next: string[]) {
    const code = next.join("");
    if (code.length < 6) return;
    setChecking(true);
    setOtpError("");
    const { ok } = await verifyOtp(channel, value.trim(), code);
    setChecking(false);
    if (ok) {
      setStage("verified");
      onVerified(value.trim());
    } else {
      setOtpError("Incorrect code. Try again.");
      setShake(true);
      setTimeout(() => setShake(false), 320);
      setDigits(Array(6).fill(""));
      setTimeout(() => cells.current[0]?.focus(), 0);
    }
  }

  function setDigit(i: number, raw: string) {
    const d = raw.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = d;
    setDigits(next);
    if (d && i < 5) cells.current[i + 1]?.focus();
    check(next);
  }

  function paste(e: React.ClipboardEvent) {
    const d = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!d) return;
    e.preventDefault();
    const next = Array.from({ length: 6 }, (_, i) => d[i] ?? "");
    setDigits(next);
    cells.current[Math.min(d.length, 5)]?.focus();
    check(next);
  }

  function edit() {
    setStage("idle");
    onVerified(null);
    setTimeout(() => document.getElementById(channel)?.focus(), 0);
  }

  const shown = channel === "phone" ? `+91 ${value.slice(0, 5)} ${value.slice(5)}` : value;

  return (
    <Field label={label} htmlFor={channel} error={showError ? errorText : undefined}>
      <div className={controlClass(stage === "verified" ? "verified" : showError ? "invalid" : "idle")}>
        {channel === "phone" && (
          <span className="flex items-center gap-2 pl-3 text-[14.5px] text-muted after:h-4 after:w-px after:bg-black/10">
            +91
          </span>
        )}
        <input
          id={channel}
          name={channel}
          type={channel === "email" ? "email" : "tel"}
          inputMode={channel === "phone" ? "numeric" : "email"}
          autoComplete={channel === "phone" ? "tel-national" : "email"}
          maxLength={channel === "phone" ? 10 : undefined}
          placeholder={placeholder}
          readOnly={stage !== "idle"}
          value={value}
          onChange={(e) => setValue(channel === "phone" ? e.target.value.replace(/\D/g, "").slice(0, 10) : e.target.value)}
          onBlur={() => setTouched(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (isValid && stage === "idle") send();
            }
          }}
          className={inputClass}
        />
        {stage === "verified" ? (
          <span className="mr-3 flex items-center gap-1 text-[12px] font-medium text-ok">
            <Check /> Verified
          </span>
        ) : (
          <button
            type="button"
            disabled={!isValid || stage !== "idle"}
            onClick={send}
            className="mr-1.5 rounded-[5px] bg-ink px-2.5 py-1.5 text-[12px] font-medium whitespace-nowrap text-white transition hover:bg-black disabled:cursor-not-allowed disabled:bg-black/[0.06] disabled:text-black/35"
          >
            {stage === "sending" ? "Sending…" : stage === "otp" ? "Sent" : "Send OTP"}
          </button>
        )}
      </div>

      {stage === "otp" && (
        <div className="mt-2 animate-rise rounded-md border border-black/[0.07] bg-[#fafafa] p-3">
          <div className="mb-2.5 flex items-baseline justify-between gap-3 text-[12.5px] text-muted">
            {/* One line on every screen: the number/email never splits; a long email trims with … */}
            <span className="min-w-0 truncate whitespace-nowrap" title={`Code sent to ${shown}`}>
              Code sent to <b className="font-semibold text-text">{shown}</b>
            </span>
            <button type="button" onClick={edit} className="flex-none text-[12px] font-medium text-brand">
              Edit
            </button>
          </div>
          <div className={`flex gap-2 ${shake ? "animate-shake" : ""}`}>
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => {
                  cells.current[i] = el;
                }}
                value={d}
                disabled={checking}
                inputMode="numeric"
                autoComplete={i === 0 ? "one-time-code" : "off"}
                aria-label={`OTP digit ${i + 1}`}
                onChange={(e) => setDigit(i, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !d && i) cells.current[i - 1]?.focus();
                }}
                onPaste={paste}
                className="aspect-[1/1.1] w-full max-w-[46px] min-w-0 rounded-md border border-black/[0.12] bg-white text-center text-[17px] font-semibold text-ink outline-none focus:border-ink focus:shadow-[0_0_0_3px_rgba(21,21,29,.06)] disabled:opacity-60"
              />
            ))}
          </div>
          <div className="mt-2.5 flex items-baseline justify-between text-[12.5px]">
            <span className={otpError ? "text-err" : "text-muted"}>{checking ? "Verifying…" : otpError}</span>
            <button
              type="button"
              disabled={left > 0}
              onClick={send}
              className="font-medium text-brand disabled:text-muted"
            >
              {left > 0 ? `Resend in ${left}s` : "Resend code"}
            </button>
          </div>
        </div>
      )}
    </Field>
  );
}
