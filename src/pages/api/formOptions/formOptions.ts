import { NextApiRequest, NextApiResponse } from "next";

export const LOOKING_FOR_OPTIONS = [
  { value: "bride", label: "Bride" },
  { value: "groom", label: "Groom" },
];

export const AGE_OPTIONS = [
  { value: "18", label: "18 yrs" },
  { value: "19", label: "19 yrs" },
  { value: "20", label: "20 yrs" },
];

export const RELIGION_OPTIONS = [
  { value: "hindu", label: "Hindu" },
  { value: "muslim", label: "Muslim" },
  { value: "christian", label: "Christian" },
  { value: "sikh", label: "Sikh" },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    LOOKING_FOR_OPTIONS,

    AGE_OPTIONS,

    RELIGION_OPTIONS,
  });
}
