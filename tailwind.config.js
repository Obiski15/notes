/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        primary: {
          DEFAULT: "hsl(var(--color-primary))",
          hover: "hsl(var(--color-primary-hover))",
          active: "hsl(var(--color-primary-active))",
          focus: "var(--color-primary-focus)",
          foreground: "hsl(var(--text-primary))",
        },
        secondary: {
          DEFAULT: "hsl(var(--color-secondary))",
          hover: "hsl(var(--color-secondary-hover))",
          active: "hsl(var(--color-secondary-active))",
          focus: "var(--color-secondary-focus)",
          foreground: "hsl(var(--text-primary))",
        },

        neutral: {
          50: "hsl(var(--color-neutral-50))",
          100: "hsl(var(--color-neutral-100))",
          200: "hsl(var(--color-neutral-200))",
          300: "hsl(var(--color-neutral-300))",
          400: "hsl(var(--color-neutral-400))",
          500: "hsl(var(--color-neutral-500))",
          600: "hsl(var(--color-neutral-600))",
          700: "hsl(var(--color-neutral-700))",
          800: "hsl(var(--color-neutral-800))",
          900: "hsl(var(--color-neutral-900))",
          950: "hsl(var(--color-neutral-950))",
        },

        success: {
          DEFAULT: "hsl(var(--color-success))",
          light: "hsl(var(--color-success-light))",
          dark: "hsl(var(--color-success-dark))",
          hover: "hsl(var(--color-success-hover))",
          active: "hsl(var(--color-success-active))",
        },
        warning: {
          DEFAULT: "hsl(var(--color-warning))",
          light: "hsl(var(--color-warning-light))",
          dark: "hsl(var(--color-warning-dark))",
        },
        error: {
          DEFAULT: "hsl(var(--color-error))",
          light: "hsl(var(--color-error-light))",
          dark: "hsl(var(--color-error-dark))",
          hover: "hsl(var(--color-error-hover))",
          active: "hsl(var(--color-error-active))",
        },
        info: {
          DEFAULT: "hsl(var(--color-info))",
          light: "hsl(var(--color-info-light))",
          dark: "hsl(var(--color-info-dark))",
        },

        surface: {
          background: "hsl(var(--surface-background))",
          DEFAULT: "hsl(var(--surface-surface))",
          elevated: "hsl(var(--surface-elevated))",
          overlay: "hsl(var(--surface-overlay))",
        },

        text: {
          primary: "hsl(var(--text-primary))",
          secondary: "hsl(var(--text-secondary))",
          tertiary: "hsl(var(--text-tertiary))",
          disabled: "hsl(var(--text-disabled))",
        },

        border: {
          DEFAULT: "hsl(var(--border-default))",
          focus: "hsl(var(--border-focus))",
          error: "hsl(var(--border-error))",
        },

        state: {
          hover: "hsl(var(--state-hover))",
          active: "hsl(var(--state-active))",
          focus: "hsl(var(--state-focus))",
          disabled: {
            bg: "hsl(var(--state-disabled-bg))",
            text: "hsl(var(--state-disabled-text))",
          },
        },

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      transitionDuration: {
        fast: "150ms",
        normal: "200ms",
        slow: "300ms",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
