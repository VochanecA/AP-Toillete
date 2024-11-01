"use client";

import { create } from "zustand";

type LanguageStore = {
  language: string;
  setLanguage: (language: string) => void;
};

export const useLanguage = create<LanguageStore>((set) => ({
  language: "en",
  setLanguage: (language) => set({ language }),
}));