import { User } from "../../_db.types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useUser } from "@clerk/clerk-react";
import { useCallback, useEffect, useState } from "react";
import { create_profile, get_profile } from "~/actions/user.action";

// ~ =============================================>
// ~ ======= profile store  -->
// ~ =============================================>
type ProfileStore = {
  profile: User | null;
  getProfile: () => Promise<User | null>;
  setProfile: (user: User | null) => void;
};

const profileStore = create<ProfileStore>()(
  persist(
    (set, get) => ({
      profile: null,
      getProfile: async () => {
        return get().profile;
      },
      setProfile: (profile) => {
        set({ profile });
      },
    }),
    {
      name: "profile-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

// ~ =============================================>
// ~ ======= profile hook  -->
// ~ =============================================>
const useProfile = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { profile, setProfile, getProfile: getFromStore } = profileStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [exists, setExists] = useState<boolean>(false);

  const getProfile = useCallback(async () => {
    try {
      if (user) {
        const exists = !!user.publicMetadata.profile_id;

        // ~ ======= create user if user does not exist -->
        if (!exists && user.primaryEmailAddressId) {
          const profile = await create_profile({
            first_name: user.firstName || "User",
            last_name: user.lastName || "",
            auth_id: user.id,
            email: user.primaryEmailAddressId,
            profile_img: user.imageUrl,
          });
          return profile && setProfile(profile);
        }
        // ~ ======= if uer exists fetch user -->
        const profile = await get_profile(user.publicMetadata.profile_id);
        return profile && setProfile(profile);
      }
    } catch (error: unknown) {
      console.log(error);
    }
  }, [user?.id]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const prof = await getFromStore();

      if (isLoaded && isSignedIn && user?.id !== prof?.auth_id) {
        console.log("get_profile called");
        await getProfile();
      } else if (!isSignedIn && isLoaded) {
        setProfile(null);
        console.log("User not logged in");
      }
    })();

    setIsLoading(false);
  }, [user?.id, getProfile, isSignedIn]);

  return {
    profile,
    setProfile,
    isLoading,
  };
};

export default useProfile;
