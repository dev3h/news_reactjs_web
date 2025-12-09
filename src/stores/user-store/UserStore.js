import { create } from "zustand";
import postServices from "@/services/userServices/postServices";
import userAuthServices from "@/services/authServices/userAuthServices";
import groupServices from "@/services/userServices/groupServices";

export const useUserAuthStore = create((set) => ({
  token: JSON.parse(localStorage.getItem("user"))?.token,
  userInfo: null,
  isLogin: false,
  setToken: (token) => set({ token }),

  getUserInfo: async (token) => {
    try {
      const response = await userAuthServices.getUserInfo(token);
      if (response) {
        set({ userInfo: response.data });
      }
    } catch (error) {
      localStorage.removeItem("user");
      set({ userInfo: null, token: null, isLogin: false });
    }
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ token: null, userInfo: null, isLogin: false });
  },
}));

export const useUserStore = create((set) => ({
  groupCategories: [],
  groups: [],
  userIP: "",
  setGroupCategories: (groupCategories) => set({ groupCategories }),
  setUserIP: (userIP) => set({ userIP }),

  getGroupCategories: async () => {
    try {
      const response = await postServices.getGroupCategories();
      set({ groupCategories: response });
    } catch (error) {
      console.log(error);
    }
  },
  getAllGroups: async () => {
    try {
      const response = await groupServices.getAllGroups();
      set({ groups: response });
    } catch (error) {
      console.log(error);
      set({ groups: [] });
    }
  },
  getUserIP: async () => {
    try {
      const response = await fetch("/ipify");
      const data = await response.json();
      set({ userIP: data.ip });
    } catch (error) {
      console.error("Lỗi khi lấy địa chỉ IP:", error);
    }
  },
}));
