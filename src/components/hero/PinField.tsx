"use client";

import { useRef, useState } from "react";
import { lookupPin } from "@/lib/api";
import { Field, Spinner, controlClass, inputClass } from "./ui";

export type Location = { pin: string; city: string; state: string };

export default function PinField({ onChange }: { onChange: (loc: Location | null) => void }) {
  const [pin, setPin] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resolved, setResolved] = useState(false);
  // If the lookup service is down, let the student type city and state themselves.
  const [manual, setManual] = useState(false);
  const seq = useRef(0);

  async function onPin(raw: string) {
    const v = raw.replace(/\D/g, "").slice(0, 6);
    setPin(v);
    setError("");
    setResolved(false);
    onChange(null);
    if (!manual) {
      setCity("");
      setState("");
    }
    if (v.length !== 6) return;
    if (!/^[1-9]/.test(v)) return setError("Enter a valid 6-digit PIN code.");
    if (manual) return city.trim() && state.trim() && onChange({ pin: v, city, state });

    const n = ++seq.current;
    setLoading(true);
    try {
      const r = await lookupPin(v);
      if (n !== seq.current) return;
      if (!r) return setError("We couldn't find this PIN code. Please check it.");
      setCity(r.city);
      setState(r.state);
      setResolved(true);
      onChange({ pin: v, ...r });
    } catch {
      if (n !== seq.current) return;
      setManual(true);
      setError("Couldn't auto-fill. Please enter your city and state.");
    } finally {
      if (n === seq.current) setLoading(false);
    }
  }

  function onManual(nextCity: string, nextState: string) {
    setCity(nextCity);
    setState(nextState);
    onChange(pin.length === 6 && nextCity.trim() && nextState.trim() ? { pin, city: nextCity, state: nextState } : null);
  }

  return (
    <>
      <Field
        label="PIN code"
        htmlFor="pin"
        error={error}
        hint={resolved ? undefined : "We'll fill in your city and state."}
      >
        <div className={controlClass(error && !manual ? "invalid" : resolved ? "verified" : "idle")}>
          <input
            id="pin"
            name="pin"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={6}
            placeholder="6-digit PIN code"
            value={pin}
            onChange={(e) => onPin(e.target.value)}
            className={inputClass}
          />
          {loading && <Spinner />}
          {resolved && (
            <span className="mr-3 max-w-[55%] truncate text-[12px] font-medium text-ok">
              {city}, {state}
            </span>
          )}
        </div>
      </Field>
      {manual && (
      <div className="grid sm:grid-cols-2 sm:gap-2.5">
        <Field label="City" htmlFor="city">
          <div className={controlClass()}>
            <input
              id="city"
              name="city"
              placeholder={manual ? "City" : "Auto-filled"}
              readOnly={!manual}
              tabIndex={manual ? 0 : -1}
              value={city}
              onChange={(e) => onManual(e.target.value, state)}
              className={inputClass}
            />
          </div>
        </Field>
        <Field label="State" htmlFor="state">
          <div className={controlClass()}>
            <input
              id="state"
              name="state"
              placeholder={manual ? "State" : "Auto-filled"}
              readOnly={!manual}
              tabIndex={manual ? 0 : -1}
              value={state}
              onChange={(e) => onManual(city, e.target.value)}
              className={inputClass}
            />
          </div>
        </Field>
      </div>
      )}
    </>
  );
}
