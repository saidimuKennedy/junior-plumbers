export type BracketAccent = "default" | "light";

/** `light` = cream rule on black chip (e.g. on very busy dark imagery) */
const accentClass: Record<BracketAccent, string> = {
  default: "",
  light: "!border-paper",
};

export function BracketLabel({
  children,
  className = "",
  accent = "default",
}: {
  children: React.ReactNode;
  className?: string;
  accent?: BracketAccent;
}) {
  return (
    <span className={`t-bracket ${accentClass[accent]} ${className}`.trim()}>{children}</span>
  );
}
