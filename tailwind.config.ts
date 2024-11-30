import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
	darkMode: ["class"],
	content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					'"Plus Jakarta Sans"',
					'"Outfit"',
					"ui-sans-serif",
					"system-ui",
					"sans-serif",
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"',
					'"Noto Color Emoji"',
				],
				heading: ['"Outfit"', ...fontFamily.sans],
				handwritten: ['"Caveat"', ...fontFamily.sans],
				typewriter: ['"Fira Code"', ...fontFamily.mono],
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				card: {
					DEFAULT: "var(--card)",
					foreground: "var(--card-foreground)",
				},
				popover: {
					DEFAULT: "var(--popover)",
					foreground: "var(--popover-foreground)",
				},
				primary: {
					DEFAULT: "var(--primary)",
					foreground: "var(--primary-foreground)",
				},
				secondary: {
					DEFAULT: "var(--secondary)",
					foreground: "var(--secondary-foreground)",
				},
				muted: {
					DEFAULT: "var(--muted)",
					foreground: "var(--muted-foreground)",
				},
				accent: {
					DEFAULT: "var(--accent)",
					foreground: "var(--accent-foreground)",
				},
				destructive: {
					DEFAULT: "var(--destructive)",
					foreground: "var(--destructive-foreground)",
				},
				border: "var(--border)",
				input: "var(--input)",
				ring: "var(--ring)",
				chart: {
					"1": "var(--chart-)",
					"2": "var(--chart-2",
					"3": "var(--chart-3",
					"4": "var(--chart-4",
					"5": "var(--chart-5",
				},
				sidebar: {
					DEFAULT: "var(--sidebar-background",
					foreground: "var(--sidebar-foreground",
					primary: "var(--sidebar-primary",
					"primary-foreground": "var(--sidebar-primary-foregroun)",
					accent: "var(--sidebar-accen)",
					"accent-foreground": "var(--sidebar-accent-foregroun)",
					border: "var(--sidebar-border)",
					ring: "var(--sidebar-ring)",
				},

				parchment: "#F5E8C7", // Background
				ink: "#2C2C2C", // Text
				fadedInk: "#555555", // Muted text
				pencilGray: "#D1B899", // Borders and accents
				redAccent: "#D94C2F", // Headers or highlights
			},
			keyframes: {
				float: {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-10px)" },
				},
			},
			animation: {
				float: "float 3s ease-in-out infinite",
				"float-slow": "float 4s ease-in-out infinite",
				"float-slower": "float 5s ease-in-out infinite",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
