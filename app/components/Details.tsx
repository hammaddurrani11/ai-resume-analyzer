import React from "react";
import { cn } from "~/libs/utils";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionContent,
} from "./Accordion";

type Tip = {
  type: "good" | "improve";
  tip: string;
  explanation: string;
};

/**
 * ScoreBadge: small badge that shows score/100 with colored background and icon
 */
const ScoreBadge: React.FC<{ score: number }> = ({ score }) => {
  const variant = score > 69 ? "green" : score > 39 ? "yellow" : "red";

  const bg =
    variant === "green" ? "bg-green-100" : variant === "yellow" ? "bg-amber-100" : "bg-red-100";
  const textColor =
    variant === "green" ? "text-green-700" : variant === "yellow" ? "text-amber-700" : "text-red-700";

  const Icon =
    variant === "green" ? (
      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
          clipRule="evenodd"
        />
      </svg>
    ) : variant === "yellow" ? (
      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 8h2v5H9V8zm0 7h2v2H9v-2z" />
      </svg>
    ) : (
      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.454 9.695c.75 1.333-.213 2.972-1.742 2.972H4.545c-1.53 0-2.492-1.639-1.742-2.972L8.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-8a1 1 0 01.993.883L11 6v4a1 1 0 01-1.993.117L9 10V6a1 1 0 011-1z"
          clipRule="evenodd"
        />
      </svg>
    );

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-md text-sm font-medium",
        bg
      )}
      aria-hidden
    >
      <span className={cn("inline-flex items-center", textColor)}>{Icon}</span>
      <span className={cn("ml-2 font-semibold", textColor)}>{score}/100</span>
    </span>
  );
};

/**
 * CategoryHeader: shows title and ScoreBadge side-by-side
 */
const CategoryHeader: React.FC<{ title: string; categoryScore: number }> = ({
  title,
  categoryScore,
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

/**
 * CategoryContent: renders tips grid and explanation boxes
 */
const CategoryContent: React.FC<{ tips: Tip[] }> = ({ tips }) => {
  if (!tips || tips.length === 0) {
    return <div className="text-sm text-gray-500">No tips available.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tips.map((t, idx) => (
          <div
            key={idx}
            className={cn(
              "flex items-start space-x-3 p-3 rounded-lg border bg-white",
              t.type === "good"
                ? "border-green-100"
                : "border-red-100"
            )}
          >
            <div
              className={cn(
                "shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                t.type === "good" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
              )}
            >
              {t.type === "good" ? (
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 8h2v5H9V8zm0 7h2v2H9v-2z" />
                </svg>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{t.tip}</p>
              <p className="mt-1 text-xs text-gray-500">{t.type === "good" ? "Good" : "Improve"}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {tips.map((t, idx) => (
          <div
            key={`ex-${idx}`}
            className={cn(
              "p-3 rounded-md border",
              t.type === "good"
                ? "bg-green-50 border-green-100 text-green-800"
                : "bg-red-50 border-red-100 text-red-800"
            )}
          >
            <p className="text-sm font-semibold">{t.type === "good" ? "Why this works" : "What's the issue"}</p>
            <p className="mt-1 text-sm text-gray-700">{t.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Details component
 * Expects a `feedback` prop of type `Feedback` (assumed globally defined)
 */
const Details: React.FC<{ feedback: Feedback }> = ({ feedback }) => {
  const sections = [
    { key: "toneAndStyle", title: "Tone & Style", data: feedback?.toneAndStyle },
    { key: "content", title: "Content", data: feedback?.content },
    { key: "structure", title: "Structure", data: feedback?.structure },
    { key: "skills", title: "Skills", data: feedback?.skills },
  ];

  return (
    <div className="w-full">
      <Accordion allowMultiple className="w-full">
        {sections.map((s) => (
          <AccordionItem key={s.key} id={s.key}>
            <AccordionHeader itemId={s.key}>
              <CategoryHeader title={s.title} categoryScore={s.data?.score ?? 0} />
            </AccordionHeader>
            <AccordionContent itemId={s.key}>
              <CategoryContent tips={s.data?.tips ?? []} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Details;
