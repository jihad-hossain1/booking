import { TAuthUser } from "@/lib/auth/ServerAuth";

export type HProps = {
  menuItems: { title: string; href: string }[];
  handleLogout: () => void;
  session: TAuthUser | null;
};

export type TSideProps = {
  title: string;
  handleLogout: () => void;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
};