export function BracketLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`t-bracket ${className}`}>{children}</span>;
}
