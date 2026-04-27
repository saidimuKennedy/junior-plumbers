export type BracketAccent = "default" | "black" | "light";

/** Override left-rule colour (base is brand yellow from `.t-bracket`). */
const accentClass: Record<BracketAccent, string> = {
  default: "",
  black: "!border-brand-black",
  light: "!border-paper",
};

export function BracketLabel({
  children,
  className = "",
  accent = "default",
}: {
  children: React.ReactNode;
  className?: string;
  /** `black` on yellow surfaces · `light` on dark backgrounds */
  accent?: BracketAccent;
}) {
  return (
    <span className={`t-bracket ${accentClass[accent]} ${className}`.trim()}>{children}</span>
  );
}
