"use client";

import { useEffect, useState } from "react";
import { toast as sonnerToast } from "sonner";

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

export function useToast() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return {
      toast: (props: ToastProps) => {},
      dismiss: (toastId?: string) => {},
    };
  }

  return {
    toast: ({ title, description, variant }: ToastProps) => {
      sonnerToast(title, {
        description,
        className: variant === "destructive" ? "bg-destructive text-destructive-foreground" : undefined,
      });
    },
    dismiss: sonnerToast.dismiss,
  };
}