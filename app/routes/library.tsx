"use client";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
	Book,
	Edit,
	Trash2,
	Notebook,
	BookOpen,
	Search,
	Library,
	LibrarySquare,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { motion } from "framer-motion";
import { Card } from "~/components/ui/card";
import Img1 from "~/assets/illustrations/humanities/19.png";
import Img3 from "~/assets/illustrations/humanities/10.png";
import moment from "moment";
import { Input } from "~/components/ui/input";

// ~ ======= Define story interface
interface Story {
	id: number;
	title: string;
	cover: string;
	status: "Published" | "Draft" | "In Review";
	summary: string;
	created_at: string;
}

// ~ ======= Mock data for demonstration
const userStories: Story[] = [
	{
		id: 1,
		title: "The Enchanted Forest",
		cover:
			"https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		status: "Published",
		summary:
			"A magical tale of discovery in an ancient forest. Following the journey of a young explorer...",
		created_at: "2024-03-15T10:30:00Z",
	},
	{
		id: 2,
		title: "Journey to the Stars",
		cover:
			"https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		status: "Draft",
		summary:
			"A magical tale of discovery in an ancient forest. Following the journey of a young explorer...",
		created_at: "2024-03-14T15:45:00Z",
	},
	{
		id: 2,
		title: "Journey to the Stars",
		cover:
			"https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		status: "Draft",
		summary:
			"A magical tale of discovery in an ancient forest. Following the journey of a young explorer...",
		created_at: "2024-01-14T15:45:00Z",
	},
	{
		id: 2,
		title: "Journey to the Stars",
		cover:
			"https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		status: "Draft",
		summary:
			"A magical tale of discovery in an ancient forest. Following the journey of a young explorer...",
		created_at: "2024-03-14T15:45:00Z",
	},
	// ... other stories
];

// ~ ======= Add random position utility
const getRandomPosition = () => ({
	top: `${Math.random() * 70 + 10}%`,
	left: `${Math.random() * 70 + 10}%`,
	transform: `rotate(${Math.random() * 20 - 10}deg)`,
});

const MyLibrary: React.FC = () => {
	// ~ ======= Generate random positions for images
	const [imagePositions] = useState([
		getRandomPosition(),
		getRandomPosition(),
		getRandomPosition(),
	]);

	// ~ ======= Framer Motion variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.1 },
		},
	};

	const cardVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: { y: 0, opacity: 1 },
	};

	// ~ ======= Add search state
	const [searchQuery, setSearchQuery] = useState("");

	// ~ ======= Filter and sort stories
	const filteredAndSortedStories = userStories
		.filter((story) =>
			story.title.toLowerCase().includes(searchQuery.toLowerCase())
		)
		.sort(
			(a, b) =>
				new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
		);

	// ~ ======= Updated grouping function using moment
	const groupedStories = filteredAndSortedStories.reduce(
		(groups, story) => {
			const date = moment(story.created_at).format("YYYY-MM-DD");
			if (!groups[date]) {
				groups[date] = [];
			}
			groups[date].push(story);
			return groups;
		},
		{} as Record<string, Story[]>
	);

	// ~ ======= Helper function for date display
	const getDateDisplay = (date: string) => {
		const momentDate = moment(date);
		const today = moment().startOf("day");
		const yesterday = moment().subtract(1, "days").startOf("day");

		if (momentDate.isSame(today, "day")) {
			return "Today";
		} else if (momentDate.isSame(yesterday, "day")) {
			return "Yesterday";
		}
		return momentDate.format("MMMM D, YYYY");
	};

	return (
		<div className="min-h-screen relative overflow-hidden">
			{/* ~ ======= Background effects */}
			<div className="absolute inset-0 bg-[url('/paper-texture.jpg')] opacity-30 dark:opacity-0 pointer-events-none" />
			<div className="absolute inset-0">
				<div className="absolute left-[40px] top-0 bottom-0 w-[2px] bg-border hidden md:block" />
				<div
					className="absolute hidden md:block inset-0 opacity-[0.15] dark:opacity-[0.15]"
					style={{
						backgroundImage: `linear-gradient(to bottom, transparent 23px, var(--theme-mode, #475569) 24px)`,
						backgroundSize: "100% 24px",
					}}
				/>
			</div>

			{/* ~ ======= Updated decorative images with random positions */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
				className="absolute inset-0 pointer-events-none hidden md:block"
			>
				<motion.img
					src={Img1}
					alt=""
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 0.5, scale: 1 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="absolute w-32 h-32 object-cover rounded-2xl"
					style={imagePositions[0]}
				/>
				<motion.img
					src={Img3}
					alt=""
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 0.5, scale: 1 }}
					transition={{ duration: 0.8, delay: 0.4 }}
					className="absolute w-40 h-40 object-cover rounded-2xl"
					style={imagePositions[1]}
				/>
			</motion.div>

			<div className="container max-w-7xl mx-auto px-4 py-20 relative">
				{/* ~ ======= Header Section */}
				<div className="space-y-6 mb-12">
					<div className="text-center">
						<h1 className="text-4xl font-serif tracking-tight flex items-center justify-center gap-2">
							<Library className="h-8 w-8 text-primary/70" />
							My Library
						</h1>
						<p className="text-muted-foreground font-serif">
							Your personal collection of stories
						</p>
					</div>
				</div>

				{/* ~ ======= Add search input */}
				<div className="mb-8 max-w-md mx-auto">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							type="text"
							placeholder="Search stories..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="pl-10 border border-muted"
						/>
					</div>
				</div>

				{/* ~ ======= Stories sections by date */}
				<div className="space-y-8">
					{Object.entries(groupedStories).map(([date, stories]) => (
						<div key={date}>
							{/* ~ ======= Updated date header */}
							<div className="mb-4">
								<div className="flex items-center gap-2">
									<div className="h-px flex-1 bg-border" />
									<span className="text-sm text-muted-foreground">
										{getDateDisplay(date)}
									</span>
									<div className="h-px flex-1 bg-border" />
								</div>
							</div>

							{/* ~ ======= Stories Grid */}
							<motion.div
								variants={containerVariants}
								initial="hidden"
								animate="visible"
								className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
							>
								{stories.map((story) => (
									<motion.div key={story.id} variants={cardVariants}>
										<Card className="group h-full overflow-hidden bg-background/70 backdrop-blur-sm border-border hover:shadow-lg transition-all duration-300">
											<div className="relative h-32">
												<img
													src={story.cover}
													alt={story.title}
													className="object-cover w-full h-full"
												/>
											</div>
											<div className="p-3 space-y-2">
												<h2 className="text-base font-semibold tracking-tight line-clamp-1">
													{story.title}
												</h2>
												{/* ~ ======= Updated timestamp display */}
												<p className="text-xs text-muted-foreground line-clamp-2 my-1 text-wrap text-ellipsis">
													{story.summary}
												</p>
												<div className="flex justify-between items-center">
													<span
														className={`text-xs font-medium px-2 py-0.5 rounded-full ${
															story.status === "Published"
																? "bg-primary/10 text-primary"
																: story.status === "Draft"
																	? "bg-yellow-100/10 text-yellow-600"
																	: "bg-blue-100/10 text-blue-600"
														}`}
													>
														{story.status}
													</span>
													<div className="flex gap-1">
														<Button variant="ghost" size="icon">
															<Edit className="h-3 w-3" />
														</Button>
														<Button variant="ghost" size="icon">
															<Trash2 className="h-3 w-3" />
														</Button>
													</div>
												</div>
											</div>
										</Card>
									</motion.div>
								))}
							</motion.div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default MyLibrary;
