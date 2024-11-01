"use client";

import { useState } from "react";
import { SmilePlus, Frown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import { cn } from "@/lib/utils";

type FeedbackItem = {
  id: string;
  label: keyof typeof translations.en;
  value: boolean | null;
};

const feedbackItems: FeedbackItem[] = [
  { id: "smell", label: "smell", value: null },
  { id: "cleanliness", label: "cleanliness", value: null },
  { id: "supplies", label: "supplies", value: null },
  { id: "cleaning", label: "cleaning", value: null },
];

export default function Home() {
  const [feedback, setFeedback] = useState<FeedbackItem[]>(feedbackItems);
  const { toast } = useToast();
  const { language } = useLanguage();

  const handleFeedback = (id: string, value: boolean) => {
    setFeedback((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, value } : item
      )
    );
  };

  const handleSubmit = async () => {
    if (feedback.some((item) => item.value === null)) {
      toast({
        title: "Error",
        description: "Please rate all items before submitting",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the feedback to your API
    console.log("Feedback submitted:", feedback);

    toast({
      title: translations[language as keyof typeof translations].thankYou,
    });

    // Reset feedback
    setFeedback(feedbackItems);
  };

  return (
    <div className="container max-w-2xl mx-auto p-4 space-y-8">
      <div className="grid gap-6">
        {feedback.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <h3 className="text-lg font-semibold mb-4">
              {translations[language as keyof typeof translations][item.label]}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => handleFeedback(item.id, true)}
                className={cn(
                  "flex flex-col items-center",
                  item.value === true && "text-orange-500"
                )}
              >
                <SmilePlus className="h-8 w-8 mb-2" />
                {translations[language as keyof typeof translations].satisfied}
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => handleFeedback(item.id, false)}
                className={cn(
                  "flex flex-col items-center",
                  item.value === false && "text-red-500"
                )}
              >
                <Frown className="h-8 w-8 mb-2" />
                {translations[language as keyof typeof translations].unsatisfied}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button
        className="w-full"
        size="lg"
        onClick={handleSubmit}
      >
        {translations[language as keyof typeof translations].submit}
      </Button>
    </div>
  );
}