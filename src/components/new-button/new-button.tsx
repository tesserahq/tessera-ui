import * as React from "react";

import { Plus } from "lucide-react";
import type { ButtonProps } from "../ui/button";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface IProps {
  label?: string;
  title?: string;
  onClick: () => void;
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
  disabled?: boolean;
}

export function NewButton({
  label,
  title = "New",
  onClick,
  size = "default",
  variant = "default",
  disabled = false,
}: IProps) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={onClick}
            size={size}
            variant={variant}
            disabled={disabled}
          >
            <Plus />
            <span className="font-semibold">{title}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <span>{label}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
