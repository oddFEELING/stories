import React from "react";
import { Outlet } from "react-router";
import { ThemeProvider } from "~/components/layouts/theme-provider";
import { Route } from "../../routes/+types/home";

type ComponentProps = {};

const AppLayout: React.FC<ComponentProps> = ({}) => {
	return (
		<ThemeProvider>
			<Outlet />
			{/*<ScreenSize />*/}
		</ThemeProvider>
	);
};

export default AppLayout;
