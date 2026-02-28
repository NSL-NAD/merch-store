import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "orange";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-2 py-0.5 text-[10px] font-mono font-medium uppercase tracking-widest",
        variant === "default" && "bg-bg-tertiary text-text-secondary",
        variant === "orange" && "bg-gas-orange text-black",
        className
      )}
    >
      {children}
    </span>
  );
}
