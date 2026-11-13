type P = { className?: string; size?: number };

const base = (size = 18) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const ArrowRight = ({ className, size }: P) => (
  <svg {...base(size)} strokeWidth={2.4} className={className}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const Check = ({ className, size = 14 }: P) => (
  <svg {...base(size)} strokeWidth={3} className={className}><path d="M20 6 9 17l-5-5" /></svg>
);
export const Chevron = ({ className, size = 16 }: P) => (
  <svg {...base(size)} strokeWidth={2.4} className={className}><path d="m6 9 6 6 6-6" /></svg>
);
export const Users = ({ className, size = 16 }: P) => (
  <svg {...base(size)} className={className}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);
export const Gift = ({ className, size = 16 }: P) => (
  <svg {...base(size)} className={className}><path d="M20 12v10H4V12" /><rect x="2" y="7" width="20" height="5" /><path d="M12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" /></svg>
);
export const Award = ({ className, size = 16 }: P) => (
  <svg {...base(size)} className={className}><circle cx="12" cy="8" r="6" /><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11" /></svg>
);
export const Live = ({ className, size = 16 }: P) => (
  <svg {...base(size)} className={className}><rect x="2" y="4" width="20" height="14" rx="2" /><path d="M8 22h8M12 18v4M10 8.5v5l4-2.5z" /></svg>
);
