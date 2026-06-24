import { parseBiodata } from "./biodataParser";

export function parseTelegramHtml(html: string) {
  const parser = new DOMParser();

  const doc = parser.parseFromString(
    html,
    "text/html"
  );

  const messages = doc.querySelectorAll(".message:not(.service)");

  const profiles: any = [];

  messages.forEach((msg, index) => {

    const textElement = msg.querySelector(".text");

    if (!textElement) return;


    const rawHtml = textElement.innerHTML;


    if (!rawHtml.trim()) return;


    profiles.push(parseBiodata(rawHtml, index + 1));

  });

  return profiles;
}