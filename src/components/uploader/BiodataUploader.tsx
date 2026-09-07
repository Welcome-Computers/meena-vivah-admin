"use client";

import { parseTelegramHtml } from "@/lib/helpers_uploader/telegramParser";
import { ParsedProfile } from "@/redux/features/shared/types";
import { Dispatch, SetStateAction } from "react";

interface Props {
  onParsed: Dispatch<SetStateAction<ParsedProfile[]>>;
}

export default function BiodataUploader({
  onParsed,
}: Props) {

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;
      const html = await file.text();
      // console.log("HTML length:", html.length);
      const profiles = parseTelegramHtml(html);
      // console.log("Parsed profiles:", profiles);
      const updatedProfile = profiles.map((item: any, index: any) => {
        return { ...item, temp_id: index + 1 }
      })
      onParsed(updatedProfile);
      e.target.value = "";
    } catch (error) {
      console.error("++ BIODATA ERROR ++", error);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".html"
        onChange={handleFileChange}
      />
    </div>
  );
}