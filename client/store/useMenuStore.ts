import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useMenuStore = create()(
  persist(
    (set) => ({
      loading: false,
      menu: null,
    }),
    {
      name: "menuStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
