import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "../../ui/breadcrumb";

import type { BreadcrumbItemData } from "../types";
import { Link } from "react-router";
import { cn } from "../../../utils/misc";

export function DetailHeader({
  breadcrumb,
  className,
}: {
  breadcrumb: BreadcrumbItemData[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-sidebar-background w-full fixed top-[60px] z-10 px-3 py-4 border-y",
        className
      )}
    >
      {breadcrumb && breadcrumb.length > 0 && (
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumb.map((item, index) => (
              <React.Fragment key={item.link}>
                <BreadcrumbItem>
                  {index === breadcrumb.length - 1 ? (
                    <BreadcrumbPage className="capitalize">
                      {item.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={item.link} className="capitalize">
                        {item.label}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < breadcrumb.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}
    </div>
  );
}
