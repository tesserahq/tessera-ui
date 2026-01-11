import * as React from "react";
import { cn } from "../../../utils/misc";
import type { BreadcrumbItemData, DetailItemsProps } from "../types";
import { DetailHeader } from "./detail-header";
import { DetailSidenav } from "./detail-sidenav";
import { DetailContent } from "./detail-content";

interface DetailLayoutProps {
  children: React.ReactNode;
  menuItems: DetailItemsProps[];
  breadcrumb: BreadcrumbItemData[];
  className?: string;
}

export function DetailLayout({
  children,
  menuItems,
  breadcrumb,
  className,
}: DetailLayoutProps) {
  return (
    <>
      <DetailHeader breadcrumb={breadcrumb} />

      <div
        className={cn(
          "flex items-start gap-3 h-full relative pt-[53px]",
          className
        )}
      >
        <DetailSidenav menuItems={menuItems} />
        <DetailContent children={children} />
      </div>
    </>
  );
}
