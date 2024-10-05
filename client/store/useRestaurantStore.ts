import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "sonner";

const API_END_POINT = "http://localhost:8000/api/v1/restaurant";
axios.defaults.withCredentials = true;

export const useRestaurantStore = create<any>()(
  persist(
    (set) => ({
      loading: false,
      restaurant: null,
      searchedRestaurant: null,
      createRestaurant: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message);
          console.error(error);
          set({ loading: false });
        }
      },
      getRestaurant: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_END_POINT}/`);
          if (response.data.success) {
            set({ loading: false, restaurant: response.data.restaurant });
          }
        } catch (error: any) {
          if (error.response?.status === 404) {
            set({ restaurant: null });
          }
          set({ loading: false });
          console.error(error);
        }
      },
      updateRestaurant: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.put(`${API_END_POINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            set({ loading: false });
            toast.success(response.data.message);
          }
        } catch (error: any) {
          set({ loading: false });
          console.error(error);
        }
      },
      searchRestaurant: async (
        searchText: string,
        searchQuery: string,
        selectedCuisines: any
      ) => {
        try {
          set({ loading: true });
          const params = new URLSearchParams();
          params.set("searchQuery", searchQuery);
          params.set("selectedCuisines", selectedCuisines);
          const response = await axios.get(
            `${API_END_POINT}/search/${searchText}?${params}`
          );
          if (response.data.success) {
            set({
              loading: false,
              searchedRestaurant: response.data.restaurants,
            });
            toast.success(response.data.message);
          }
        } catch (error) {
          set({ loading: false });
          console.error(error);
        }
      },
      addMenuToRestaurant: (menu: any) => {
        set((state: any) => ({
          restaurant: state.restaurant
            ? { ...state.restaurant, menus: [...state.restaurant.menus, menu] }
            : null,
        }));
      },
      updateMenuToRestaurant: (updatedMenu: any) => {
        set((state: any) => {
          if (state.restaurant) {
            const updatedMenuList = state.restaurant.menus.map((menu: any) =>
              menu?._id === updatedMenu?._id ? updatedMenu : null
            );
            return {
              restaurant: {
                ...state.restaurant,
                menus: updatedMenuList,
              },
            };
          }
        });
      },
    }),
    {
      name: "restaurant-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
