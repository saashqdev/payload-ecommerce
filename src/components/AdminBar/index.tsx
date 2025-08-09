/* eslint-disable */
"use client";

import { useSelectedLayoutSegments, useRouter } from "next/navigation";
import { type PayloadAdminBarProps, PayloadAdminBar } from "payload-admin-bar";
import { useCallback, useState } from "react";

import { cn } from "@/utilities/cn";

import "./index.scss";

import { getClientSideURL } from "@/utilities/getURL";

const baseClass = "admin-bar";

const collectionLabels = {
  pages: {
    plural: "Pages",
    singular: "Page",
  },
  posts: {
    plural: "Posts",
    singular: "Post",
  },
  projects: {
    plural: "Projects",
    singular: "Project",
  },
};

const Title = () => <span>Dashboard</span>;

export const AdminBar = (props: { adminBarProps?: PayloadAdminBarProps }) => {
  const { adminBarProps } = props || {};
  const segments = useSelectedLayoutSegments();
  const [show, setShow] = useState(false);
  const collection = collectionLabels?.[segments?.[1]] ? segments?.[1] : "pages";
  const router = useRouter();

  const onAuthChange = useCallback((user) => {
    setShow(user?.id);
  }, []);

  return (
    <div
      className={cn(baseClass, "bg-black py-2 text-white", {
        block: show,
        hidden: !show,
      })}
    >
      <div className="container">
        <PayloadAdminBar
          apiPath="/api/administrators"
          {...adminBarProps}
          className="py-2 text-white"
          classNames={{
            controls: "font-medium text-white",
            logo: "text-white",
            user: "text-white",
          }}
          cmsURL={getClientSideURL()}
          collection={collection}
          collectionLabels={{
            plural: collectionLabels[collection]?.plural || "Pages",
            singular: collectionLabels[collection]?.singular || "Page",
          }}
          logo={<Title />}
          onAuthChange={onAuthChange}
          onPreviewExit={() => {
            fetch("/next/exit-preview").then(() => {
              router.push("/");
              router.refresh();
            });
          }}
          style={{
            backgroundColor: "transparent",
            padding: 0,
            position: "relative",
            zIndex: "unset",
          }}
        />
      </div>
    </div>
  );
};
