import dayjs from "@/lib/dayjs";

export function createKeywordRegex(keywords: string[]) {
  const escaped = [...keywords]
    .sort((a, b) => b.length - a.length) // longest first
    .map(keyword =>
      keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    );

  return `(?:${escaped.join("|")})\\s*[:\\-.&]*\\s*(.*)`;
}

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

const dobKeywords = [
  "DOB",
  "D.O.B:",
  "D.O.B",
  "D.O.B.",
  "D.O.B:-",
  "D.O.B.:",
  "D.O.B -",
  "DOB:",
  "DOB-",
  "DOB :",
  "Date of Birth",
  "Date of birth",
  "Birth Date",
  "जन्म तिथि",
  "जन्मदिन",
];

export function extractDob(text: string) {
  const keywordPattern = new RegExp(
    createKeywordRegex(dobKeywords),
    "i"
  );

  const keywordMatch = text.match(keywordPattern);

  const searchText = keywordMatch
    ? keywordMatch[1].substring(0, 80)
    : text;

  const datePatterns = [
    {
      // 29.01.1990 / 5-08-1993 / 26.10.91 / 02/4/92
      regex: /\b(\d{1,2}[./-]\d{1,2}[./-]\d{2,4})\b/i,
      formats: [
        "DD.MM.YYYY",
        "D.MM.YYYY",
        "DD.MM.YY",
        "D.MM.YY",

        "DD-MM-YYYY",
        "D-MM-YYYY",
        "DD-MM-YY",
        "D-MM-YY",

        "DD/MM/YYYY",
        "D/MM/YYYY",
        "DD/MM/YY",
        "D/MM/YY",
      ],
    },

    {
      // 26.1 95
      regex: /\b(\d{1,2}[./-]\d{1,2}\s+\d{2,4})\b/i,
      normalize: (d: string) => d.replace(/\s+/, "."),
      formats: [
        "DD.MM.YY",
        "D.MM.YY",
        "DD.MM.YYYY",
        "D.MM.YYYY",
      ],
    },

    {
      // 07071992
      regex: /\b(\d{8})\b/,
      formats: ["DDMMYYYY"],
    },

    {
      // 19th Aug, 1990
      regex:
        /\b(\d{1,2}(?:st|nd|rd|th)?\s+[A-Za-z]{3,9},?\s+\d{2,4})\b/i,

      normalize: (d: string) =>
        d
          .replace(/\b(\d{1,2})(st|nd|rd|th)\b/i, "$1")
          .replace(",", "")
          .replace(/\s+/g, " ")
          .trim(),

      formats: [
        "DD MMM YYYY",
        "D MMM YYYY",

        "DD MMM YY",
        "D MMM YY",

        "DD MMMM YYYY",
        "D MMMM YYYY",

        "DD MMMM YY",
        "D MMMM YY",
      ],
    },

    {
      // 16 OCT 1990 / 10 Feb 91 / 17 November 1992
      regex:
        /\b(\d{1,2}\s+[A-Za-z]{3,9}\s+\d{2,4})\b/i,

      normalize: (d: string) =>
        d
          .toLowerCase()
          .replace(/\b\w/g, (c) => c.toUpperCase()),

      formats: [
        "DD MMM YYYY",
        "D MMM YYYY",

        "DD MMM YY",
        "D MMM YY",

        "DD MMMM YYYY",
        "D MMMM YYYY",

        "DD MMMM YY",
        "D MMMM YY",
      ],
    },

    {
      // September 1996 / Nov 93
      regex: /\b([A-Za-z]{3,9}\s+\d{2,4})\b/i,

      normalize: (d: string) =>
        d
          .toLowerCase()
          .replace(/\b\w/g, (c) => c.toUpperCase()),

      formats: [
        "MMM YYYY",
        "MMMM YYYY",
        "MMM YY",
        "MMMM YY",
      ],
    },

    {
      // 1990
      regex: /\b((?:19|20)\d{2})\b/,
      formats: ["YYYY"],
    },
  ];

  for (const item of datePatterns) {
    const match = searchText.match(item.regex);

    if (!match) continue;

    const rawDate = match[1];

    const normalizedDate = item.normalize
      ? item.normalize(rawDate)
      : rawDate;

    for (const format of item.formats) {
      const date = dayjs(
        normalizedDate,
        format,
        true
      );

      if (date.isValid()) {
        return date.format("YYYY-MM-DD");
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

export const nameKeywords = [
  "Candidate Name",
  "Bride Name",
  "Groom Name",
  "Boy Name",
  "Girl Name",
  "Name of Boy",
  "Name of Girl",
  "Profile Name",
  "Full Name",
  "Name :",
  "Name:-",
  "Name:",
  "Name-",
  "Name",
  "Boy",
  "Girl",
];


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
        .replace(/^(mr|mrs|ms|dr)\.?\s*/i, "")
        .replace(/\s+\d+.*$/, "")
        .trim();
    }
  }


  return "";
};

export const fatherKeywords = [
  "Father",
  "Father Name",
  "Father's Name",
  "Fathers Name",
  "Name of Father",
  "Father Name &",
  "*Father*:",
  "Father:",
  "Father-",
  "Father:-",
  "S/O",
  "S/o",
  "पिता",
  "पिता का नाम",
];

export function extractFatherName(text: string) {
  const clean = text
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .replace(/([a-z])Father/gi, "$1 Father")
    .trim();

  const keywordPattern = new RegExp(
    createKeywordRegex(fatherKeywords),
    "i"
  );

  const keywordMatch = clean.match(keywordPattern);

  const searchText = keywordMatch
    ? keywordMatch[1].substring(0, 60)
    : clean;

  const patterns = [
    // Late Shri Ishwar Lal Meena
    /\b((?:late\s+)?(?:shri\s+)?(?:mr\.?\s+)?(?:dr\.?\s+)?[A-Za-z.\s]{3,80})/i,

    // H. L. Meena
    /\b([A-Za-z]+(?:\s+[A-Za-z.]+){1,5})/,

    // Hindi names
    /\b([\u0900-\u097F\s]{3,60})/,
  ];

  const stopWords =
    /\b(occupation|education|qualification|height|dob|date of birth|gotra|address|mobile|contact|phone|email|native|present|village|district|married|brother|sister)\b/i;

  for (const pattern of patterns) {
    const match = searchText.match(pattern);

    if (!match) continue;

    let fatherName = match[1];

    // Remove everything after stop word
    fatherName = fatherName.replace(stopWords, "");

    // Remove titles
    fatherName = fatherName.replace(
      /\b(mr|mrs|ms|dr)\.?\s*/gi,
      ""
    );

    fatherName = fatherName
      .replace(/\s+/g, " ")
      .trim();

    if (fatherName.length >= 3) {
      return fatherName;
    }
  }

  return "";
}

