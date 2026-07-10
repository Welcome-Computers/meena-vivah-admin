import { ParsedProfile } from "@/redux/types";
import { extractDob, extractFatherName, extractMobile, extractName } from "./regex";

export const parseBiodata = (
  text: string,
  index: number
): ParsedProfile => {

  function cleanText(text: string) {
    return text
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/\s+/g, " ")
      .trim();
  }

  const cleanTest = cleanText(text);

  const obj = {
    name: extractName(cleanTest),
    dob: extractDob(cleanTest),
    mobile: extractMobile(cleanTest),
    fathersname: extractFatherName(cleanTest),
    otherinfo: text,
  }

  return obj;
};


