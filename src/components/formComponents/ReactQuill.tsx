"use client";

import dynamic from "next/dynamic";

const ReactQuill = dynamic(
  () => import("react-quill-new"),
  { ssr: false }
);

interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

export default function RichTextEditor({
  value = "",
  onChange,
}: Props) {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      className="my_ReactQuill"
    />
  );
}