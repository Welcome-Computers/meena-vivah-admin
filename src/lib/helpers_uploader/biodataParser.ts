import { ParsedProfile } from "@/redux/types";
import { extractDob, extractFatherName, extractMobile, extractName } from "./regex";

export const parseBiodata = (
  text: string,
  index: number
): ParsedProfile => {

  return {
    name: extractName(text),
    dob: extractDob(text),
    mobile: extractMobile(text),
    fathersname: extractFatherName(text),
    otherinfo: text,
  };
};


