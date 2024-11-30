"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "~/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Loader, Loader2, Pencil } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { storySetupInitialiser } from "~/server/openai-queries";
import { zodStorySchema } from "~/server/database/db.types";

// ~ =============================================>
// ~ ======= Form validation schema
// ~ ==============================================>
const formSchema = z.object({
	genre: z.enum(["fantasy", "sci-fi", "mystery", "horror", "romance"]),
	length: z.enum(["short", "medium", "long"]),
	timePeriod: z.enum(["modern", "historical", "space-age", "magical"]),
});

type ComponentProps = {
	open: boolean;
	newStory: NewStory;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateStoryDialog: React.FC<ComponentProps> = ({
	open,
	setOpen,
	newStory,
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// ~ ======= Initialize form with react-hook-form and zod
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			genre: "fantasy",
			length: "medium",
			timePeriod: "modern",
		},
	});

	// ~ ======= Form submission handler
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true);

		try {
			const response = await storySetupInitialiser(
				newStory.title,
				newStory.passage,
				values.genre,
				values.timePeriod
			);

			console.log(JSON.parse(response ?? "{}"));
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="max-w-2xl">
				<DialogHeader className="space-y-2 pb-4 border-b">
					<div className="space-y-1">
						<DialogTitle className="text-3xl font-bold tracking-tight">
							{newStory.title}
						</DialogTitle>
						<DialogDescription className="text-base text-muted-foreground">
							Configure your story settings before you begin writing
						</DialogDescription>
					</div>

					<Badge
						variant="secondary"
						className="px-4 py-1.5 text-sm bg-gradient-to-r from-muted/50 to-muted hover:from-muted hover:to-muted/50 transition-colors"
					>
						{newStory.passage}
					</Badge>
				</DialogHeader>

				<div className="space-y-6 py-4">
					<div className="space-y-2">
						<h3 className="text-sm font-semibold tracking-tight">
							Story Summary
						</h3>
						<ScrollArea className="h-[120px] rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
							<div className="p-4">
								<p className="text-sm text-muted-foreground leading-relaxed">
									{newStory.summary}
								</p>
							</div>
						</ScrollArea>
					</div>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<div className="grid grid-cols-2 gap-6">
							<FormField
								control={form.control}
								name="genre"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Genre</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a genre" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="fantasy">Fantasy</SelectItem>
												<SelectItem value="sci-fi">Science Fiction</SelectItem>
												<SelectItem value="mystery">Mystery</SelectItem>
												<SelectItem value="horror">Horror</SelectItem>
												<SelectItem value="romance">Romance</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="length"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Story Length</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select length" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="short">Short</SelectItem>
												<SelectItem value="medium">Medium</SelectItem>
												<SelectItem value="long">Long</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="timePeriod"
								render={({ field }) => (
									<FormItem className="col-span-2">
										<FormLabel>Time Period</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select time period" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="modern">Modern</SelectItem>
												<SelectItem value="historical">Historical</SelectItem>
												<SelectItem value="space-age">Space Age</SelectItem>
												<SelectItem value="magical">Magical</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<Button type="submit" size="lg" className="mt-4 w-full col-span-2">
							{isLoading ? (
								<>
									<Loader
										size={20}
										strokeWidth={1.2}
										className="mr-2  animate-spin"
									/>
									<span>Crafting your story...</span>
								</>
							) : (
								<>
									<Pencil size={20} strokeWidth={1.2} className="mr-2 " />
									<span>Begin Your Journey</span>
								</>
							)}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateStoryDialog;
