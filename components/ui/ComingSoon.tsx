import { BracketLabel } from "@/components/ui/BracketLabel";

interface ComingSoonProps {
  crumb: string;
  title: string;
}

export function ComingSoon({ crumb, title }: ComingSoonProps) {
  return (
    <>
      <div className="pb-3.5 border-b-2 border-rule mb-6 flex flex-col gap-1.5">
        <BracketLabel>{crumb}</BracketLabel>
        <h1 className="font-serif font-semibold text-[36px] leading-[1.05] m-0">{title}</h1>
      </div>
      <div className="card p-12 flex flex-col items-center justify-center text-center gap-4">
        <BracketLabel>STATUS // ROADMAP</BracketLabel>
        <div className="font-serif font-semibold text-[28px] mt-1">This surface is on the roadmap.</div>
        <p className="font-sans text-[15px] text-ink-2 max-w-md">
          The MVP is live with Dashboard, POS, Delivery, Loyalty, Social, and the Online Shop.
          This module will be wired up in the next sprint.
        </p>
      </div>
    </>
  );
}
