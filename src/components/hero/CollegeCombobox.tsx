"use client";

import { useMemo, useRef, useState } from "react";
import { COLLEGES } from "@/lib/colleges";
import { Field, controlClass, inputClass } from "./ui";
import { Chevron } from "./icons";

export type College = { name: string; listed: boolean };

const NOT_LISTED = "My college is not listed";

export default function CollegeCombobox({ onChange }: { onChange: (c: College | null) => void }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [picked, setPicked] = useState<"listed" | "unlisted" | null>(null);
  const [other, setOther] = useState("");
  const listRef = useRef<HTMLUListElement>(null);
  const otherRef = useRef<HTMLInputElement>(null);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (picked) return COLLEGES.slice(0, 30);
    return COLLEGES.filter((c) => !q || c.name.toLowerCase().includes(q) || c.location.toLowerCase().includes(q)).slice(0, 30);
  }, [query, picked]);
  const count = matches.length + 1; // + "not listed"

  function choose(i: number) {
    setOpen(false);
    if (i === matches.length) {
      setQuery(NOT_LISTED);
      setPicked("unlisted");
      onChange(other.trim().length > 2 ? { name: other.trim(), listed: false } : null);
      setTimeout(() => otherRef.current?.focus(), 0);
    } else {
      setQuery(matches[i].name);
      setPicked("listed");
      onChange({ name: matches[i].name, listed: true });
    }
  }

  function move(delta: number) {
    const next = (active + delta + count) % count;
    setActive(next);
    listRef.current?.children[next]?.scrollIntoView({ block: "nearest" });
  }

  return (
    <>
      <Field label="College" htmlFor="college" id="collegeLabel">
        <div className={controlClass(picked ? "verified" : "idle")}>
          <input
            id="college"
            name="college"
            role="combobox"
            aria-expanded={open}
            aria-controls="collegeList"
            aria-autocomplete="list"
            aria-activedescendant={active >= 0 ? `college-opt-${active}` : undefined}
            autoComplete="off"
            placeholder="Search your college"
            value={query}
            onFocus={() => {
              setOpen(true);
              setActive(-1);
            }}
            onBlur={() => setTimeout(() => setOpen(false), 120)}
            onChange={(e) => {
              setQuery(e.target.value);
              setPicked(null);
              setOpen(true);
              setActive(-1);
              onChange(null);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                if (!open) setOpen(true);
                else move(1);
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                move(-1);
              } else if (e.key === "Enter" && open && active >= 0) {
                e.preventDefault();
                choose(active);
              } else if (e.key === "Escape") setOpen(false);
            }}
            className={inputClass}
          />
          <Chevron className="pointer-events-none mr-3.5 text-muted" />

          {open && (
            <ul
              ref={listRef}
              id="collegeList"
              role="listbox"
              aria-labelledby="collegeLabel"
              className="absolute top-[calc(100%+6px)] right-[-1px] left-[-1px] z-20 max-h-60 animate-rise overflow-auto rounded-md border border-black/[0.08] bg-white p-1 shadow-[0_20px_40px_-12px_rgba(10,10,16,.25)]"
            >
              {matches.map((c, i) => (
                <li
                  key={c.name}
                  id={`college-opt-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    choose(i);
                  }}
                  className="cursor-pointer rounded-[5px] px-2.5 py-2 text-[13.5px] leading-snug text-ink hover:bg-black/[0.04] aria-selected:bg-black/[0.04]"
                >
                  {c.name}
                  <small className="mt-0.5 block text-xs text-muted">{c.location}</small>
                </li>
              ))}
              {matches.length === 0 && <li className="px-3 py-2.5 text-sm text-muted">No matching college</li>}
              <li
                id={`college-opt-${matches.length}`}
                role="option"
                aria-selected={active === matches.length}
                onMouseDown={(e) => {
                  e.preventDefault();
                  choose(matches.length);
                }}
                className="mt-1 cursor-pointer rounded-[5px] border-t border-black/[0.06] px-2.5 pt-2.5 pb-2 text-[13.5px] font-medium text-brand hover:bg-black/[0.04] aria-selected:bg-black/[0.04]"
              >
                + {NOT_LISTED}
              </li>
            </ul>
          )}
        </div>
      </Field>

      {picked === "unlisted" && (
        <Field label="Your college name" htmlFor="otherCollege">
          <div className={controlClass()}>
            <input
              ref={otherRef}
              id="otherCollege"
              name="otherCollege"
              placeholder="Full name of your college"
              value={other}
              onChange={(e) => {
                setOther(e.target.value);
                onChange(e.target.value.trim().length > 2 ? { name: e.target.value.trim(), listed: false } : null);
              }}
              className={inputClass}
            />
          </div>
        </Field>
      )}
    </>
  );
}
