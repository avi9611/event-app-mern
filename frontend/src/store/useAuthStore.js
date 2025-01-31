import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:5002" 
  : "https://event-app-mern-back.vercel.app/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      localStorage.setItem("user", JSON.stringify(res.data)); 
      get().connectSocket();
    } catch (err) {
      console.log("Error in checkAuth", err);
      set({ authUser: null });
      localStorage.removeItem("user"); 
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      console.log("Signup Response:", res.data);
      set({ authUser: res.data, selectedUser: null });
      localStorage.setItem("user", JSON.stringify(res.data)); 
      toast.success("Account Created Successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "signup error");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      localStorage.setItem("user", JSON.stringify(res.data)); 
      toast.success("Logged in successfully");
      get().connectSocket();
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "login error");
      return false;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      localStorage.removeItem("user"); 
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "logout error");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      localStorage.setItem("user", JSON.stringify(res.data)); 
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "profile update error");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
  
    const socket = io(BASE_URL, {
      transports: ['websocket', 'polling'],
      auth: {
        token: localStorage.getItem('token')
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
      withCredentials: true
    });
  
    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });
  
    socket.on("connect", () => {
      console.log("Socket connected successfully");
    });
  
    set({ socket: socket });
  
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));