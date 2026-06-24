import dayjs from "dayjs";
export const cleanText = (value?: string) =>
  value
    ?.replace(/&nbsp;/g, " ")
    ?.replace(/\s+/g, " ")
    ?.trim() || "";

export const extractMobile = (text: string) => {
  const match = text.match(
    /\b(?:\+91)?[\s-]?(?:0)?([6-9]\d{9})\b/
  );

  return match?.[1] || "";
};


export function extractDob(
  text: string
) {

  const patterns = [

    // 29.01.1990 / 29-01-1990 / 29/01/1990
    /\b(\d{1,2}[./-]\d{1,2}[./-]\d{2,4})\b/i,


    // 17 November 1992
    /\b(\d{1,2}\s+[A-Za-z]+\s+\d{2,4})\b/i,


    // March 1990
    /\b([A-Za-z]+\s+\d{4})\b/i,

  ];


  for (
    const pattern of patterns
  ) {

    const match =
      text.match(pattern);


    if (!match)
      continue;


    const rawDate =
      match[1];


    const formats = [
      "DD.MM.YYYY",
      "DD-MM-YYYY",
      "DD/MM/YYYY",
      "DD MMMM YYYY",
      "MMMM YYYY",
    ];


    for (
      const format of formats
    ) {

      const date =
        dayjs(
          rawDate,
          format,
          true
        );


      if (date.isValid()) {

        return date.format(
          "YYYY, MMM, DD"
        );

      }
    }
  }


  return "";
}


export function extractGotras(text: string) {
  const result = {
    self: "",
    mother: "",
    grandmother: "",
  };

  // Format 1
  const self =
    text.match(/self\s*[:-]?\s*([a-z ]+)/i)?.[1];

  const mother =
    text.match(/mother\s*[:-]?\s*([a-z ]+)/i)?.[1];

  const gm =
    text.match(
      /(g\/?mother|grandmother|dadi)\s*[:-]?\s*([a-z ]+)/i
    )?.[2];

  if (self) result.self = cleanText(self);
  if (mother) result.mother = cleanText(mother);
  if (gm) result.grandmother = cleanText(gm);

  // fallback
  if (
    !result.self &&
    text.match(/gotra/i)
  ) {
    const gotraLine =
      text.match(
        /gotra[^:\n]*[:\-]?\s*([^\n]+)/i
      )?.[1];

    if (gotraLine) {
      const parts = gotraLine
        .split(/[,/]/)
        .map(v => cleanText(v))
        .filter(Boolean);

      result.self = parts[0] || "";
      result.mother = parts[1] || "";
      result.grandmother = parts[2] || "";
    }
  }

  return result;
}

export const extractName = (
  text: string
) => {

  const clean = text
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?p[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

  const patterns = [

    // Name:- Hariom Meena DOB...
    /(?:name|boy\s*name|groom\s*name|girl\s*name)\s*[-:.]*\s*([^,\n]+?)(?=\s*(?:dob|d\.o\.b|date|height|education|colour|occupation|job|father|gotra|address|contact|mobile|$))/i,


    // 1-Name:- dinesh kumar
    /\d+\s*[-.)]?\s*name\s*[-:.]*\s*([a-z .]+?)(?=\s*(?:dob|d\.o\.b|height|education|occupation|father|gotra|address|contact|$))/i,


    // "A suitable match is required for my son: Hariom Meena DOB"
    /(?:son|daughter|boy|girl).*?(?:required|match)?\s*[:\-]?\s*([a-z .]+?)(?=\s*(?:dob|d\.o\.b|height|education|occupation|father|gotra|$))/i,


    // Mahesh Meena<br>Father...
    /^([a-z .]{3,50}?)(?=\s*(?:father|dob|height|qualification|education|occupation))/i,

  ];


  for (const p of patterns) {

    const match = clean.match(p);

    if (match) {

      return match[1]
        .trim()
        .replace(
          /^(mr|mrs|ms|dr)\.?\s*/i,
          ""
        );
    }
  }


  return "";
};

export const extractFatherName = (
  text: string
) => {

  const clean = text
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .replace(
      /([a-z])Father/i,
      "$1 Father"
    )
    .trim();


  const patterns = [

    // 7- Name of Father:- Late Shri Ishwar Lal Meena
    /\d*\s*name\s+of\s+father\s*[-:.]*\s*((?:late\s+)?[a-z .]+?)(?=\s*(?:occupation|dob|height|education|gotra|address|contact|mobile|$))/i,


    // Father- H L Meena Deputy Secretary...
    /father(?:'s)?\s*(?:name)?\s*[-:.&]*\s*([a-z .]+?)(?=\s*(?:occupation|dob|height|education|qualification|gotra|address|contact|mobile|native|present|preference|$))/i,


    // Father's Name: Mr. Inderpal Meena
    /father'?s?\s+name\s*[-:.]*\s*([a-z .]+?)(?=\s*(?:gotra|address|contact|mobile|occupation|dob|$))/i,


    // Father name Gopal Lal Meena DOB
    /father'?s?\s+name\s+([a-z .]+?)\s*(?=dob|height|qualification|education|occupation|gotra|$)/i,


    // fallback
    /father\s*[-:]\s*([a-z .]+?)(?=\s*(?:,|<|$))/i,

  ];


  for (const pattern of patterns) {

    const match =
      clean.match(pattern);


    if (match) {

      return match[1]
        .trim()
        .replace(
          /^(mr|mrs|ms|shri|dr)\.?\s*/i,
          ""
        );

    }
  }


  return "";
};
