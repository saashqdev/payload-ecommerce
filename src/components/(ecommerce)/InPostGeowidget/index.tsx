"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useRef } from "react";

const InPostWrapper = ({ token, onPointSelect }: { token: string; onPointSelect: (e: Event) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetInitialized = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (container && !widgetInitialized.current) {
      const geowidget = document.createElement("inpost-geowidget");
      geowidget.className = "flex-1";
      geowidget.setAttribute("language", "pl");
      geowidget.setAttribute("config", "parcelCollect");

      if (token) {
        geowidget.setAttribute("token", token);
      }

      geowidget.setAttribute("onpoint", "onpointselect");

      container.appendChild(geowidget);
      widgetInitialized.current = true;
    }

    return () => {
      if (container) {
        container.innerHTML = "";
        widgetInitialized.current = false;
      }
    };
  }, [token]);

  useEffect(() => {
    document.addEventListener("onpointselect", (e) => {
      onPointSelect(e);
    });

    return () => {
      document.removeEventListener("onpointselect", (e) => {
        onPointSelect(e);
      });
    };
  }, [onPointSelect]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sandbox-easy-geowidget-sdk.easypack24.net/inpost-geowidget.js";
    script.defer = true;
    document.head.append(script);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://sandbox-easy-geowidget-sdk.easypack24.net/inpost-geowidget.css";
    document.head.append(link);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);

  return <div ref={containerRef} className="h-full w-full" />;
};

export const InPostGeowidget = dynamic(() => Promise.resolve(InPostWrapper), {
  ssr: false,
});
