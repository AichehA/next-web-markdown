"use client";
import { Docs } from "contentlayer/generated";
import { Icons } from "@/components/icons";
import { useReadingTimeToNumeric } from "@/hooks/use-reading-time";
import { dateToString } from "@/lib/utils";

export function PostsDateAndReadTime(doc: Docs, currentLang: string) {
  return (
    <div className="w-full text-sm font-medium leading-5 md:flex md:items-center md:justify-between">
      <span className="flex items-center mb-4">
        <Icons.calendarClock className="mr-1" width={20} height={20} />
        {dateToString(doc.date, currentLang)}
      </span>
      <span className="flex items-center mb-4">
        <Icons.hourglass className="mr-1" width={20} height={20} />
        {useReadingTimeToNumeric(doc.readTime)}{" "}
      </span>
    </div>
  );
}
