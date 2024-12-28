import { create } from "zustand";

export const themeStore = create((set) => {
  const defaultTheme = "lemonade"; 
  document.documentElement.setAttribute("data-theme", defaultTheme); 
  
  return {
    theme: defaultTheme, 
    setTheme: (newTheme) => {
      document.documentElement.setAttribute("data-theme", newTheme);
      set({ theme: newTheme });
    },
  };
});
