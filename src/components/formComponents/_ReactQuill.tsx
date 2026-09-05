"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

const ReactQuill = dynamic(
  () => import("react-quill-new"),
  { ssr: false }
);

interface Props {
  value?: string;
  onChange?: (value: string) => void;
  isHtml?: boolean;
}


export default function RichTextEditor({
  value = "",
  onChange,
  isHtml = false,
}: Props) {


  const editorValue = useMemo(() => {

    if (!isHtml)
      return value;


    // make Telegram html usable in Quill
    const parser = new DOMParser();

    const doc = parser.parseFromString(value, "text/html");

    return doc.body.innerHTML;

  }, [value, isHtml]);


  return (
    <ReactQuill
      theme="snow"
      value={editorValue}
      onChange={onChange}
      className="my_ReactQuill"
    />
  );
}