import { cn } from "../../../utils/misc";
import { useLocation, Link } from "react-router";
import type { DetailItemsProps } from "../types";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../ui/accordion";

interface DetailSidenavProps {
  menuItems: DetailItemsProps[];
  className?: string;
}

export function DetailSidenav({ menuItems, className }: DetailSidenavProps) {
  const { pathname } = useLocation();

  const isMenuActive = (menuPath: string) => {
    return pathname === menuPath || pathname.startsWith(menuPath + "/");
  };

  const hasActiveChild = (item: DetailItemsProps): boolean => {
    if (!item.children || item.children.length === 0) return false;
    return item.children.some((child) => isMenuActive(child.path));
  };

  return (
    <div
      className={cn(
        "w-56 dark:bg-sidebar-background p-3 fixed h-full border-r bg-white overflow-y-auto",
        className
      )}
    >
      <Accordion
        type="multiple"
        defaultValue={menuItems
          .filter((item) => item.children && hasActiveChild(item))
          .map((item) => item.path)}
        className="w-full"
      >
        {menuItems.map((item) => (
          <div key={item.path}>
            {item.children && item.children.length > 0 ? (
              <AccordionItem value={item.path} className="border-none">
                <AccordionTrigger
                  className={cn(
                    "dark:hover:bg-background w-full flex py-2.5 px-2 mb-1 items-center justify-start gap-2 overflow-hidden rounded hover:bg-slate-50 cursor-pointer hover:no-underline",
                    (isMenuActive(item.path) || hasActiveChild(item)) &&
                      "bg-accent hover:bg-accent font-semibold"
                  )}
                >
                  {item.icon}
                  <span className="flex-1 text-left">{item.title}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <div className="pl-2 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className={cn(
                          "dark:hover:bg-background w-full flex py-2 px-2 mb-1 items-center justify-start gap-2 overflow-hidden rounded hover:bg-slate-50 cursor-pointer text-sm",
                          isMenuActive(child.path) &&
                            "bg-accent hover:bg-accent font-semibold"
                        )}
                      >
                        {child.icon}
                        {child.title}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ) : (
              <Link
                to={item.path}
                className={cn(
                  "dark:hover:bg-background w-full flex py-2.5 px-2 mb-1 items-center justify-start gap-2 overflow-hidden rounded hover:bg-slate-50 cursor-pointer",
                  isMenuActive(item.path) &&
                    "bg-accent hover:bg-accent font-semibold"
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            )}

            {item.divider && (
              <hr className="my-2 border-t border-slate-200 dark:border-slate-700" />
            )}
          </div>
        ))}
      </Accordion>
    </div>
  );
}
