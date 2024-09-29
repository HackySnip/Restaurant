import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { SignupInputState } from "@/schema/userSchema";

const API_END_POINT = "http://localhost:800/api/v1/user";
axios.defaults.withCredentials = true;

export const useUserStore = create()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      loading: false,
      signup: async (input: SignupInputState) => {
        try {
          set({ loading: true });
          const response = axios.post(`${API_END_POINT}/signup`, input, {
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (error) {}
      },
    }),
    {
      name: "user-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
