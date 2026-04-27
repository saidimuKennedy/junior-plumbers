type BadgeVariant = "success" | "warn" | "danger" | "info" | "yellow" | "black" | "outline";

const variantClass: Record<BadgeVariant, string> = {
  success: "b-success",
  warn:    "b-warn",
  danger:  "b-danger",
  info:    "b-info",
  yellow:  "b-yellow",
  black:   "b-black",
  outline: "b-outline",
};

const dotColor: Record<BadgeVariant, string> = {
  success: "bg-success",
  warn:    "bg-warn",
  danger:  "bg-danger",
  info:    "bg-info",
  yellow:  "bg-brand-black",
  black:   "bg-brand-yellow",
  outline: "bg-brand-black",
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
}

export function Badge({ children, variant = "outline", dot }: BadgeProps) {
  return (
    <span className={`badge ${variantClass[variant]}`}>
      {dot && <span className={`badge-dot ${dotColor[variant]}`} />}
      {children}
    </span>
  );
}
