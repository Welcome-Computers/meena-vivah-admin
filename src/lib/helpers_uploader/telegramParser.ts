import { parseBiodata } from "./biodataParser";

export function parseTelegramHtml(html: string) {
  const parser = new DOMParser();

  const doc = parser.parseFromString(html, "text/html");

  const messages = doc.querySelectorAll(".message:not(.service)");

  const profiles: any[] = [];

  let profileIndex = 1;

  messages.forEach((msg) => {
    const textElement = msg.querySelector(".text");

    if (!textElement) return;

    const rawHtml = textElement.innerHTML.trim();

    if (!rawHtml) return;

    // Split whenever a Telegram timestamp appears.
    // Example:
    // [18/02, 10:36 p.m.]
    // [18/02, 10:36 pm]
    // [18/02, 10:36 a.m.]
    const parts = rawHtml.split(
      /(?=\[\d{1,2}\/\d{1,2},\s+\d{1,2}:\d{2}\s*(?:a\.?m\.?|p\.?m\.?|am|pm)\])/i
    );

    parts.forEach((part) => {
      let content = part.trim();

      // Remove timestamp like:
      // [26/02, 5:19 p.m.]
      // [26/02, 5:19 pm]
      // [26/02, 5:19 a.m.]
      content = content.replace(
        /^\[\d{1,2}\/\d{1,2},\s+\d{1,2}:\d{2}\s*(?:a\.?m\.?|p\.?m\.?|am|pm)\]\s*\$?\s*/i,
        ""
      );

      profiles.push(parseBiodata(content, profileIndex++));
    });
  });

  return profiles;
}