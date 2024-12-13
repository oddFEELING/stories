import { useCallback } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { get_story_by_id } from "~/actions/story.action";
import { queryClient } from "~/components/layouts/app-layout";
import { Story } from "../../_db.types";

// ~ =============================================>
// ~ ======= types   -->
// ~ =============================================>
type NowReadingStore = {
  // ~ ======= show/hide -->
  showNowReading: boolean; // show or hide dialog
  setShowNowReading: (showNowReading: boolean) => void; // set explicitly show or hide
  toggleShowNowReading: () => void;

  // ~ ======= current story details -->
  currentStory: Partial<Story> | null;
  setCurrentStory: (currentStory: Partial<Story>) => void;
  currentChapter: Partial<Story["chapters"][0]> | null;
  setCurrentChapter: (currentChapter: Partial<Story["chapters"][0]>) => void;

  // ~ ======= sheet state  -->
  currentTab: "cover" | "content";
  setCurrentTab: (currentTab: "cover" | "content") => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  volumeLevel: number;
  setVolumeLevel: (volumeLevel: number) => void;
  currentSeek: number; // progress of the audio
  setCurrentSeek: (currentSeek: number) => void; // set the progress of the audio
};

// ~ =============================================>
// ~ ======= store  -->
// ~ =============================================>
const nowReadingStore = create<NowReadingStore>()(
  persist(
    (set, get) => ({
      showNowReading: false,
      setShowNowReading: (showNowReading: boolean) => set({ showNowReading }),
      toggleShowNowReading: () =>
        set((state) => ({ showNowReading: !state.showNowReading })),

      currentStory: null,
      setCurrentStory: (currentStory) => set(() => ({ currentStory })),

      currentChapter: null,
      setCurrentChapter: (currentChapter) => set(() => ({ currentChapter })),

      currentTab: "cover",
      setCurrentTab: (currentTab) => set(() => ({ currentTab })),

      isPlaying: false,
      setIsPlaying: (isPlaying) => set(() => ({ isPlaying })),
      volumeLevel: 0.5,
      setVolumeLevel: (volumeLevel) => set(() => ({ volumeLevel })),
      currentSeek: 0,
      setCurrentSeek: (currentSeek) => set(() => ({ currentSeek })),
    }),

    {
      name: "now-reading-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

// ~ =============================================>
// ~ ======= hook  -->
// ~ =============================================>
const useNowReading = () => {
  const nowReadingStoreData = nowReadingStore();

  // ~ ======= get chapter content -->
  const getChapterContent = useCallback(async () => {
    if (!nowReadingStoreData.currentStory?._id) return;
    const response = await queryClient.fetchQuery({
      queryKey: ["data", nowReadingStoreData.currentStory?._id],
      queryFn: async () => {
        if (!nowReadingStoreData.currentStory?._id)
          throw new Error("No story ID");
        return await get_story_by_id(nowReadingStoreData.currentStory._id);
      },
    });

    if (!response) return;
    nowReadingStoreData.setCurrentStory({
      id: response._id as string,
      title: response.title,
      owner: response.owner.toString(),
    });
  }, [nowReadingStoreData.currentStory, nowReadingStoreData.currentChapter]);

  return { ...nowReadingStoreData, getChapterContent };
};

export default useNowReading;
