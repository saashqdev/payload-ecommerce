import tailwindTypography from "@tailwindcss/typography";
import tailwindAnimate from "tailwindcss-animate";

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  darkMode: ["selector", '[data-theme="dark"]'],
  plugins: [tailwindAnimate, tailwindTypography],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        "2xl": "2rem",
        DEFAULT: "1rem",
        lg: "2rem",
        md: "2rem",
        sm: "1rem",
        xl: "2rem",
      },
      screens: {
        "2xl": "86rem",
        lg: "64rem",
        md: "48rem",
        sm: "40rem",
        xl: "80rem",
      },
    },
    extend: {
      transitionProperty: {
        transformColors: "transform, background, color, background-color",
      },
      maxWidth: {
        "2xl-half": "calc((100vw - 86rem) / 2 + 86rem)",
        "xl-half": "calc((100vw - 80rem) / 2 + 80rem)",
        "lg-half": "calc((100vw - 64rem) / 2 + 64rem)",
        "md-half": "calc((100vw - 48rem) / 2 + 48rem)",
        "sm-half": "calc((100vw - 40rem) / 2 + 40rem)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        main: {
          "400": "rgb(129 140 248 / var(--tw-bg-opacity, 1))",
          "500": "rgb(99 102 241 / var(--tw-bg-opacity, 1))",
          "600": "rgb(79 70 229 / var(--tw-bg-opacity, 1))",
          "700": "rgb(67 56 202 / var(--tw-bg-opacity, 1))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        payload: {
          backgroundColor: "var(--theme-bg)",
          elevation: {
            0: "var(--theme-elevation-0)",
            50: "var(--theme-elevation-50)",
            100: "var(--theme-elevation-100)",
            150: "var(--theme-elevation-150)",
            200: "var(--theme-elevation-200)",
            300: "var(--theme-elevation-300)",
            400: "var(--theme-elevation-400)",
            500: "var(--theme-elevation-500)",
            600: "var(--theme-elevation-600)",
            700: "var(--theme-elevation-700)",
            800: "var(--theme-elevation-800)",
            900: "var(--theme-elevation-900)",
          },
          card: "var(--theme-card)",
          foreground: "var(--theme-foreground)",
        },
        background: "hsl(var(--background))",
        border: "hsla(var(--border))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        foreground: "hsl(var(--foreground))",
        input: "hsl(var(--input))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        ring: "hsl(var(--ring))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        success: "hsl(var(--success))",
        error: "hsl(var(--error))",
        warning: "hsl(var(--warning))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)"],
        sans: ["var(--font-geist-sans)"],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      typography: () => ({
        DEFAULT: {
          css: [
            {
              "--tw-prose-body": "var(--text)",
              "--tw-prose-headings": "var(--text)",
              h1: {
                fontWeight: "normal",
                marginBottom: "0.25em",
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: { fontSize: "2.5rem" },
              h2: {
                fontSize: "1.25rem",
                fontWeight: 600,
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: { fontSize: "3.5rem" },
              h2: { fontSize: "1.5rem" },
            },
          ],
        },
      }),
    },
  },
} satisfies Config;

export default config;
