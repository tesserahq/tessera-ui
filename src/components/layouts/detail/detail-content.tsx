import type React from "react";
import { cn } from "../../../utils/misc";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function DetailContent({ children, className }: Props) {
  return (
    <div className={cn("flex-1 p-3 h-auto ml-56", className)}>{children}</div>
  );
}
