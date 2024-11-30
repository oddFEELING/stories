import React from "react";
import LandingNavbar from "~/components/navigation/landing-navbar";
import MobileBottomNav from "~/components/navigation/mobile-bottom-nav";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Outlet } from "react-router";

type ComponentProps = {};

const LandingLayout: React.FC<ComponentProps> = ({}) => {
	const [scrollPosition, setScrollPosition] = React.useState(0);

	return (
		<div className="relative w-full flex flex-col h-svh overflow-hidden">
			<LandingNavbar scrollValue={scrollPosition} />
			<ScrollArea
				className="pb-16 h-svh overflow-hidden sm:pb-0 bg-background"
				onScrollCapture={(e) => setScrollPosition(e.currentTarget.scrollTop)}
			>
				<Outlet />
			</ScrollArea>
			<MobileBottomNav />
		</div>
	);
};

export default LandingLayout;
