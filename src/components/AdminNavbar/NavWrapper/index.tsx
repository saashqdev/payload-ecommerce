"use client";
import { useNav } from "@payloadcms/ui";

import type { ReactNode } from "react";

export const NavWrapper = (props: { baseClass?: string; children: ReactNode }) => {
  const { baseClass, children } = props;

  const { hydrated, navOpen, navRef, shouldAnimate } = useNav();

  return (
    <aside
      className={[
        baseClass,
        navOpen && `${baseClass}--nav-open`,
        shouldAnimate && `${baseClass}--nav-animate`,
        hydrated && `${baseClass}--nav-hydrated`,
      ]
        .filter(Boolean)
        .join(" ")}
      inert={!navOpen ? true : undefined}
    >
      <div className={`${baseClass}__scroll`} ref={navRef}>
        {children}
      </div>
    </aside>
  );
};
