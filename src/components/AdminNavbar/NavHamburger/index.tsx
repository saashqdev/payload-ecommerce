"use client";
import { Hamburger, useNav } from "@payloadcms/ui";

export const NavHamburger = ({ baseClass }: { baseClass?: string }) => {
  const { navOpen, setNavOpen } = useNav();

  return (
    <button
      className={`${baseClass}__mobile-close`}
      onClick={() => {
        setNavOpen(false);
      }}
      tabIndex={!navOpen ? -1 : undefined}
      type="button"
    >
      <Hamburger isActive />
    </button>
  );
};
