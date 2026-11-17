"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { register } from "@/lib/api";
import SignupSuccess from "./SignupSuccess";
import OtpField from "./OtpField";
import PinField, { type Location } from "./PinField";
import CollegeCombobox, { type College } from "./CollegeCombobox";
import { Field, controlClass, inputClass } from "./ui";
import { ArrowRight, Check } from "./icons";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [phone, setPhone] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [college, setCollege] = useState<College | null>(null);
  const [terms, setTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const [step, setStep] = useState<1 | 2>(1);

  const nameOk = name.trim().length >= 2;
  const verifyDone = nameOk && !!phone && !!email;
  const ready = verifyDone && !!location && !!college && terms && !submitting;

  function next() {
    setStep(2);
    setTimeout(() => document.getElementById("pin")?.focus(), 0);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ready || !phone || !email || !location || !college) return;
    setSubmitting(true);
    await register({
      name: name.trim(),
      phone: "+91" + phone,
      email,
      ...location,
      college: college.name,
      collegeListed: college.listed,
    });
    setDone(true);
  }

  return (
    <div
      className={`relative rounded-lg bg-white text-ink shadow-[0_24px_60px_-24px_rgba(10,10,16,.4)] ring-1 ring-black/[0.06] ${
        done ? "overflow-hidden" : "p-6 sm:p-7"
      }`}
    >
      {done ? (
        <SignupSuccess firstName={name.trim().split(" ")[0]} />
      ) : (
        <form onSubmit={onSubmit} noValidate>
          <h2 id="signup-title" className="mb-1 pr-10 text-lg font-semibold tracking-[-0.02em]">
            Become an Ambassador
          </h2>
          <p className="mb-5 text-[13px] text-muted">Register in 2 minutes and get your ambassador dashboard.</p>

          {/* Two-segment progress: "Step n of 2 · label" with a bar per step */}
          <div className="mb-6">
            <div className="mb-2 flex items-baseline justify-between text-[12px]">
              <span className="font-medium text-ink">{step === 1 ? "Verify your details" : "Your college"}</span>
              <span className="text-muted tabular-nums">Step {step} of 2</span>
            </div>
            <ol className="grid grid-cols-2 gap-1.5" aria-label="Sign-up steps">
              {(["Verify", "Your college"] as const).map((label, i) => {
                const n = (i + 1) as 1 | 2;
                return (
                  <li key={label}>
                    <button
                      type="button"
                      disabled={n === 2 && !verifyDone}
                      onClick={() => setStep(n)}
                      aria-current={n === step ? "step" : undefined}
                      aria-label={`Step ${n}: ${label}`}
                      className="block h-1 w-full overflow-hidden rounded-full bg-black/[0.08] disabled:cursor-default"
                    >
                      {n <= step && <span className="block h-full origin-left animate-fill bg-brand" />}
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Step 1 stays mounted while hidden so verified fields keep their state */}
          <div hidden={step !== 1}>
          <Field
            label="Full name"
            htmlFor="name"
            error={nameTouched && name && !nameOk ? "Please enter your full name." : undefined}
          >
            <div className={controlClass(nameTouched && name && !nameOk ? "invalid" : "idle")}>
              <input
                id="name"
                name="name"
                autoComplete="name"
                placeholder="As on your college ID"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setNameTouched(true)}
                className={inputClass}
              />
            </div>
          </Field>

          <OtpField channel="phone" onVerified={setPhone} />
          <OtpField channel="email" onVerified={setEmail} />

          <button
            type="button"
            disabled={!verifyDone}
            onClick={next}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-ink py-3 text-[14.5px] font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:bg-black/[0.08] disabled:text-black/30"
          >
            Continue <ArrowRight size={16} />
          </button>
          <p className="mt-3 flex items-center justify-center gap-2 text-[12px] text-muted">
            Free to join <i className="size-[3px] rounded-full bg-current" /> Takes 2 minutes
          </p>
          </div>

          <div hidden={step !== 2} className="animate-rise">
          <p className="mb-5 flex items-center gap-2 rounded-md border border-ok/20 bg-ok/[0.06] px-3 py-2 text-[12.5px] text-[#3a3a46]">
            <Check size={13} className="flex-none text-ok" />
            <span className="min-w-0 truncate">
              Verified <span className="font-medium text-ink">+91 {phone}</span> and{" "}
              <span className="font-medium text-ink">{email}</span>
            </span>
          </p>
          <PinField onChange={setLocation} />
          <CollegeCombobox onChange={setCollege} />

          <label className="mt-1 mb-5 flex cursor-pointer items-start gap-2.5 text-[12.5px] leading-normal text-muted">
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              className="mt-px size-4 flex-none cursor-pointer accent-brand"
            />
            <span>
              I agree to the{" "}
              <a href="#" target="_blank" rel="noopener" className="font-medium text-brand underline underline-offset-2 hover:text-brand-hover">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="#" target="_blank" rel="noopener" className="font-medium text-brand underline underline-offset-2 hover:text-brand-hover">
                Privacy Policy
              </a>{" "}
              of the Campus Ambassador Program.
            </span>
          </label>

          <button
            type="submit"
            disabled={!ready}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-brand py-3 text-[14.5px] font-medium text-white transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:bg-black/[0.08] disabled:text-black/30"
          >
            {submitting ? "Creating your account…" : "Sign up as Ambassador"}
            {!submitting && <ArrowRight size={16} />}
          </button>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="group mx-auto mt-3 flex items-center gap-1 text-[12.5px] font-medium text-muted transition hover:text-ink"
          >
            <ArrowLeft size={14} strokeWidth={2.25} aria-hidden className="transition group-hover:-translate-x-0.5" />
            Back
          </button>
          </div>
        </form>
      )}
    </div>
  );
}
