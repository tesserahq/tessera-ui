interface ItemProps {
  title: string;
  path: string;
  icon: React.ReactNode;
}
export interface DetailItemsProps {
  title: string;
  path: string;
  icon: React.ReactNode;
  children?: ItemProps[];
  divider?: boolean;
}

export interface SidebarItemsProps {
  menuItems: DetailItemsProps[];
}

export interface BreadcrumbItemData {
  label: string;
  link: string;
}
