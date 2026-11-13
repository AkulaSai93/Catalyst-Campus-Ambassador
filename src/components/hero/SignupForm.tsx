"use client";

import { useState } from "react";
import { register } from "@/lib/api";
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
    <div className="relative rounded-[22px] bg-white p-6 text-text shadow-[0_30px_70px_-25px_rgba(10,10,16,.45)] ring-1 ring-black/5 sm:p-8">
      {done ? (
        <div className="animate-rise px-1.5 pt-6 pb-2 text-center">
          <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-[#e7f7ef] text-ok">
            <Check size={30} />
          </div>
          <h2 className="mb-2 text-xl font-semibold tracking-tight">You&apos;re in, {name.trim().split(" ")[0]}!</h2>
          <p className="mx-auto max-w-[320px] text-[15px] leading-relaxed text-muted">
            Welcome to the Catalyst Campus Ambassador Program. Your dashboard and personal session links are on their
            way to your email.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate>
          <h2 id="signup-title" className="mb-1 pr-8 text-xl font-semibold tracking-tight">
            Become an Ambassador
          </h2>
          <p className="mb-5 text-sm text-muted">Register in 2 minutes and get your ambassador dashboard.</p>

          <ol className="mb-6 flex items-center gap-3 text-[13px] font-semibold">
            {(["Verify", "Your college"] as const).map((label, i) => {
              const n = (i + 1) as 1 | 2;
              const complete = n === 1 && step === 2;
              const current = n === step;
              return (
                <li key={label} className="flex flex-1 items-center gap-2.5">
                  <button
                    type="button"
                    disabled={n === 2 && !verifyDone}
                    onClick={() => setStep(n)}
                    aria-current={current ? "step" : undefined}
                    className="flex items-center gap-2 disabled:cursor-default"
                  >
                    <span
                      className={`grid size-6 flex-none place-items-center rounded-full text-xs font-bold transition ${
                        complete ? "bg-ok text-white" : current ? "bg-text text-white" : "bg-[#ececf2] text-muted"
                      }`}
                    >
                      {complete ? <Check size={12} /> : n}
                    </span>
                    <span className={current || complete ? "text-text" : "text-muted"}>{label}</span>
                  </button>
                  {n === 1 && (
                    <span className="relative h-0.5 flex-1 overflow-hidden rounded bg-[#ececf2]">
                      {step === 2 && <span className="absolute inset-0 origin-left animate-fill bg-ok" />}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>

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
            className="mt-2 flex w-full items-center justify-center gap-2.5 rounded-xl bg-text py-4 text-base font-bold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-30"
          >
            Continue <ArrowRight />
          </button>
          <p className="mt-3 flex items-center justify-center gap-2 text-[12.5px] text-muted">
            Free to join <i className="size-[3px] rounded-full bg-current" /> Takes 2 minutes
          </p>
          </div>

          <div hidden={step !== 2} className="animate-rise">
          <p className="mb-4 flex items-center gap-2 rounded-xl bg-[#f3fbf7] px-3.5 py-2.5 text-[13px] text-[#2a2a35]">
            <Check className="text-ok" />
            <span className="min-w-0 truncate">
              Verified <b>+91 {phone}</b> and <b>{email}</b>
            </span>
          </p>
          <PinField onChange={setLocation} />
          <CollegeCombobox onChange={setCollege} />

          <label className="mt-1.5 mb-4.5 flex cursor-pointer items-start gap-2.5 text-[13px] leading-normal text-muted">
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              className="mt-px size-[18px] flex-none cursor-pointer accent-brand"
            />
            <span>
              I agree to the{" "}
              <a href="#" target="_blank" rel="noopener" className="font-semibold text-text underline">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="#" target="_blank" rel="noopener" className="font-semibold text-text underline">
                Privacy Policy
              </a>{" "}
              of the Campus Ambassador Program.
            </span>
          </label>

          <button
            type="submit"
            disabled={!ready}
            className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-brand py-4 text-base font-bold text-white shadow-[0_10px_30px_-8px_rgba(232,52,58,.6)] transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none"
          >
            {submitting ? "Creating your account…" : "Sign up as Ambassador"}
            {!submitting && <ArrowRight />}
          </button>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="mx-auto mt-3 block text-[13px] font-semibold text-muted transition hover:text-text"
          >
            ← Back
          </button>
          </div>
        </form>
      )}
    </div>
  );
}
