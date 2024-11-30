import {
	createContext,
	FC,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

// ~ =============================================>
// ~ ======= types  -->
// ~ =============================================>
export type Theme = "dark" | "light" | "system";

export type ThemeProviderProps = {
	children?: ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};
export type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

// ~ ======= initial theme state  -->
const initialState: ThemeProviderState = {
	theme: "system",
	setTheme: () => null,
};

// ~ ======= context -->
const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

// ~ =============================================>
// ~ ======= Main component  -->
// ~ =============================================>
export const ThemeProvider: FC<ThemeProviderProps> = ({
	children,
	defaultTheme = "system",
	storageKey = "ui-theme",
	...props
}) => {
	// ~ ======= Initialize theme state safely  -->
	const [theme, setTheme] = useState<Theme>(() => {
		// ~ ======= Only access localStorage in browser environment  -->
		if (typeof window !== "undefined") {
			const stored = window.localStorage.getItem(storageKey);
			if (stored) return stored as Theme;
		}
		return defaultTheme;
	});

	// ~ ======= check for theme changes  -->
	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove("light", "dark");

		// ~ ======= if the theme is system  -->
		if (theme === "system") {
			const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
				.matches
				? "dark"
				: "light";

			root.classList.add(systemTheme);
		}

		// ~ ======= if light or dark is selected -->
		root.classList.add(theme);

		const metaThemeColor = document.querySelector('meta[name="theme-color"]');
		const backgroundColor = getComputedStyle(document.documentElement)
			.getPropertyValue("--background")
			.trim();

		if (metaThemeColor) {
			metaThemeColor.setAttribute("content", backgroundColor);
		}
	}, [theme]);

	const value = {
		theme,
		setTheme: (theme: Theme) => {
			// ~ ======= Safely access localStorage  -->
			if (typeof window !== "undefined") {
				window.localStorage.setItem(storageKey, theme);
			}
			setTheme(theme);
		},
	};

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
};

// ~ =============================================>
// ~ ======= use theme hook  -->
// ~ =============================================>
export const useTheme = () => {
	const context = useContext(ThemeProviderContext);

	if (context === undefined)
		throw new Error("useTheme must be used within ThemeProvider");
	return context;
};
