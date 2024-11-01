"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import Image from "next/image";

const languages = [
  { code: "en", name: "English", flag: "https://images.unsplash.com/photo-1628324214710-8882074b83ce?w=32&h=32&q=80&fit=crop" },
  { code: "sr", name: "Serbian", flag: "https://images.unsplash.com/photo-1632758215361-0a45632b0bf5?w=32&h=32&q=80&fit=crop" },
  { code: "de", name: "German", flag: "https://images.unsplash.com/photo-1527866959252-deab85ef7d1b?w=32&h=32&q=80&fit=crop" },
  { code: "fr", name: "French", flag: "https://images.unsplash.com/photo-1576764402988-7143f9cca90a?w=32&h=32&q=80&fit=crop" },
  { code: "uk", name: "Ukrainian", flag: "https://images.unsplash.com/photo-1564594331295-9e4e7b57e0b1?w=32&h=32&q=80&fit=crop" },
];

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex gap-6 md:gap-10">
          <h2 className="text-lg font-semibold">Toilet Feedback</h2>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`relative h-8 w-8 overflow-hidden rounded-full transition-transform hover:scale-110 ${
                  language === lang.code ? "ring-2 ring-primary" : ""
                }`}
              >
                <Image
                  src={lang.flag}
                  alt={lang.name}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </button>
            ))}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}