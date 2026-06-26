import { ParsedProfile } from "@/redux/types";
import { extractDob, extractFatherName, extractMobile, extractName } from "./regex";

export const parseBiodata = (
  text: string,
  index: number
): ParsedProfile => {

  // const gotras = extractGotras(text);

  return {
    id: index,
    name: extractName(text),

    dob: extractDob(text),

    mobile: extractMobile(text),

    fathersname: extractFatherName(text),

    // self_gotra: gotras.self,

    // m_gotra: gotras.mother,

    // gm_gotra: gotras.grandmother,

    otherinfo: text,
  };
};


