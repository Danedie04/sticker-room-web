// FILE: /components/ui/Card.tsx

import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ className, hover, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-cozy-card rounded-3xl border border-cozy-border shadow-soft",
        hover && "hover:shadow-medium hover:-translate-y-0.5 transition-all duration-300 cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
