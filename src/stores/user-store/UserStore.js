import { create } from "zustand";

export const useUserStore = create((set) => ({
  token: null,
  isLogin: false,
  checkLogin: () => {
    const token = localStorage.getItem("token");
    if (token) {
      set({ token, isLogin: true });
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, isLogin: false });
  },
}));
