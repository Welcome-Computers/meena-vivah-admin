import { useState } from "react";

interface GotraDropDownProps {
  suggestGotra: string[];
  handleSelectedItem: (value: string) => void;
  setSuggestGotra: any;
}

export const GotraDropDown = ({
  suggestGotra,
  handleSelectedItem,
  setSuggestGotra,
}: GotraDropDownProps) => {
  return (
    <div>
      {suggestGotra.length > 0 && (
        <div
          style={{
            maxHeight: "8rem",
            maxWidth: "75%",
            marginLeft: "auto",
            overflowY: "scroll",
            width: "100%",
            marginBottom: "2px",
            boxShadow: " rgba(0, 0, 0, 0.29) 0px 10px 36px 0px",
            cursor: "pointer",
            transition: "background 0.2s",
            borderRadius: "5px",
          }}
        >
          {suggestGotra.map((item: string, index: number) => (
            <li
              key={index}
              onClick={() => {
                handleSelectedItem(item);
                setSuggestGotra([]);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f5f5f5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "white";
              }}
              style={{
                textAlign: "center",
                backgroundColor: "white",
                fontSize: "14px",
              }}
            >
              {item}
            </li>
          ))}
        </div>
      )}
    </div>
  );
};
