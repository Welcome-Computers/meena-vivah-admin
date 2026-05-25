import { memo, useState } from "react";
import InputField from "../InputElements/InputField";
import style from "../../pages/biodata/style.module.css";
import { OtheGotraDetails } from "./OtherGotraDetails";
import { GotraField } from "./Gotra/GotraField";

const GotraDetials = memo((props: any) => {
  const { label, name, showCount = false, form, rules, ...rest } = props;

  const [suggestGotra, setSuggestGotra] = useState<string[]>([]);
  const [activatedField, setActivatedField] = useState<string>("");

  const gotraOptions = [
    "Bhardwaj",
    "Vashistha",
    "Kashyap",
    "Atri",
    "Gautam",
    "Kaushik",
    "Shandilya",
    "Parashar",
    "Agastya",
    "Jamadagni",
  ];

  const GOTRA_FIELDS = [
    "gotra_self",
    "gotra_mother",
    "gotra_grandmother",
    "gotra_grandmother_maternal",
  ];

  // Duplicate value check
  const gotraValidationRules = (_: any, inputValue: any) => {
    const InputValue = inputValue?.trim().toLowerCase();
    if (!inputValue) {
      return Promise.resolve();
    }

    const hasDuplicate =
      GOTRA_FIELDS.map((field: string) => form.getFieldValue(field))
        .filter(Boolean)
        .map((field) => field.trim().toLowerCase())
        .filter((value) => InputValue === value).length > 1;

    if (hasDuplicate) {
      return Promise.reject("duplicate value not allowed");
    }

    return Promise.resolve();
  };

  // filter suggestion values
  const handleInputValue = (value: string, fieldName: string) => {
    setActivatedField(fieldName);
    setSuggestGotra(
      value
        ? gotraOptions.filter((item: string) =>
            item.toLowerCase().includes(value.trim().toLowerCase()),
          )
        : [],
    );
  };

  // set inputfield value
  const handleSelectedItem = (value: any) => {
    form.setFieldValue(activatedField, value);
    setSuggestGotra([]);
    setActivatedField("");
  };

  const gotraField = [
    {
      name: "gotra_self",
      label: "Self",
      dependencies: [
        "gotra_mother",
        "gotra_grandmother",
        "gotra_grandmother_maternal",
      ],
    },
    {
      name: "gotra_mother",
      label: "Mother",
      dependencies: [
        "gotra_self",
        "gotra_grandmother",
        "gotra_grandmother_maternal",
      ],
    },
    {
      name: "gotra_grandmother",
      label: "Grand Mother",
      dependencies: [
        "gotra_self",
        "gotra_mother",
        "gotra_grandmother_maternal",
      ],
    },
    {
      name: "gotra_grandmother_maternal",
      label: "MaternalGrandmother",
      dependencies: ["gotra_self", "gotra_mother", "gotra_grandmother"],
    },
  ];

  return (
    <div className={style["form-container"]}>
      <p
        style={{ fontSize: "14px", margin: "10px 0 5px 0" }}
        className={style["form-title"]}
      >
        Gotra
      </p>

      {/*  gotra details fields */}
      <div>
        {gotraField.map((item) => (
          <GotraField
            key={item.name}
            name={item.name}
            label={item.label}
            dependencies={item.dependencies}
            gotraValidationRules={gotraValidationRules}
            activatedField={activatedField}
            suggestGotra={suggestGotra}
            handleSelectedItem={handleSelectedItem}
            setSuggestGotra={setSuggestGotra}
            handleInputValue={handleInputValue}
            setActivatedField={setActivatedField}
          />
        ))}
      </div>

      {/* other gotra details and  button  */}
      <OtheGotraDetails form={form} GOTRA_FIELDS={GOTRA_FIELDS} 
      />

      {/* pereferences */}
      <InputField
        name="preferences"
        label="Preferences"
        rules={[
          { max: 100, message: "Maximum 50 characters" },
          { pattern: /^[a-zA-Z\s]+$/, message: "Only letters allowed" },
        ]}
      />
    </div>
  );
});

GotraDetials.displayName = "GotraDetials";
export default GotraDetials;






// import { memo, useState } from "react";
// import InputField from "../InputElements/InputField";
// import style from "../../pages/biodata/style.module.css";
// import { OtheGotraDetails } from "./OtherGotraDetails";
// import { GotraDropDown } from "./Gotra/GotraDropDown";

// const GotraDetials = memo((props: any) => {
//   const { label, name, showCount = false, form, rules, ...rest } = props;

//   const [suggestGotra, setSuggestGotra] = useState<string[]>([]);
//   const [activatedField, setActivatedField] = useState<string>("");

//   const gotraOptions = [
//     "Bhardwaj",
//     "Vashistha",
//     "Kashyap",
//     "Atri",
//     "Gautam",
//     "Kaushik",
//     "Shandilya",
//     "Parashar",
//     "Agastya",
//     "Jamadagni",
//   ];

//   const GOTRA_FIELDS=["gotra_self","gotra_mother","gotra_grandmother","gotra_grandmother_maternal"]

//   // Duplicate value check
//     const gotraValidationRules = (_: any, inputValue: any) => {

//     const InputValue = inputValue?.trim().toLowerCase();
//       if (!inputValue) {
//         return Promise.resolve();
//     }

//     const hasDuplicate=GOTRA_FIELDS.map((field:string)=>form.getFieldValue(field)).
//     filter(Boolean).map((field)=>field.trim().toLowerCase()).
//     filter((value)=>InputValue === value).length > 1;

//     if (hasDuplicate) {
//       return Promise.reject("duplicate value not allowed");
//     }

//     return Promise.resolve();
//   };

//   // filter suggestion values
//   const handleInputValue = (value: string, fieldName: string) => {
//     setActivatedField(fieldName);
//     setSuggestGotra(value ?
//       gotraOptions.filter((item:string)=>item.toLowerCase().includes(value.trim().toLowerCase()))
//     :[] )

//   };

//   // set inputfield value
//   const handleSelectedItem = (value: any) => {
//     form.setFieldValue(activatedField, value);
//     setSuggestGotra([]);
//     setActivatedField("");
//   };

//   return (
//     <div className={style["form-container"]}>
//       <p
//         style={{ fontSize: "14px", margin: "10px 0 5px 0" }}
//         className={style["form-title"]}
//       >
//         Gotra
//       </p>

//       {/*  gotra details fields */}
//       <div>
//         <InputField
//           onChange={(e) => handleInputValue(e.target.value, "gotra_self")}
//           name="gotra_self"
//           label="Self"
//           dependencies={[
//             "gotra_mother",
//             "gotra_grandmother",
//             "gotra_grandmother_maternal",
//           ]}
//           rules={[
//             { required: true, message: "Enter Self Gotra Name" },
//             { max: 40, message: "Maximum 40 characters" },
//             { pattern: /^[a-zA-Z\s]+$/, message: "Only letters allowed" },
//             { validator: gotraValidationRules },
//           ]}
//         />
//         {activatedField === "gotra_self" && (
//           <GotraDropDown
//             suggestGotra={suggestGotra}
//             handleSelectedItem={handleSelectedItem}
//             setSuggestGotra={setSuggestGotra}
//           />
//         )}

//         <InputField
//           name="gotra_mother"
//           onChange={(e) => handleInputValue(e.target.value, "gotra_mother")}
//           label="Mother"
//           dependencies={[
//             "gotra_self",
//             "gotra_grandmother",
//             "gotra_grandmother_maternal",
//           ]}
//           rules={[
//             { required: true, message: "Enter Mother Gotra Name" },
//             { max: 50, message: "Maximum 50 characters" },
//             { pattern: /^[a-zA-Z\s]+$/, message: "Only letters allowed" },
//             { validator: gotraValidationRules },
//           ]}
//         />
//         {activatedField === "gotra_mother" && (
//           <GotraDropDown
//             suggestGotra={suggestGotra}
//             handleSelectedItem={handleSelectedItem}
//             setSuggestGotra={setSuggestGotra}
//           />
//         )}

//         <InputField
//           name="gotra_grandmother"
//           label="Grand Mother"
//           onChange={(e) => handleInputValue(e.target.value, "gotra_grandmother")}
//           dependencies={[
//             "gotra_self",
//             "gotra_mother",
//             "gotra_grandmother_maternal",
//           ]}
//           rules={[
//             { required: true, message: "Enter Grand_Mother Gotra Name" },
//             { max: 50, message: "Maximum 50 characters" },
//             { pattern: /^[a-zA-Z\s]+$/, message: "Only letters allowed" },
//             { validator: gotraValidationRules },
//           ]}
//         />
//         {activatedField === "gotra_grandmother" && (
//           <GotraDropDown
//             suggestGotra={suggestGotra}
//             handleSelectedItem={handleSelectedItem}
//             setSuggestGotra={setSuggestGotra}
//           />
//         )}
//         <InputField
//           name="gotra_grandmother_maternal"
//           onChange={(e) => handleInputValue(e.target.value, "gotra_grandmother_maternal")}
//           label="MaternalGrandmother"
//           dependencies={["gotra_self", "gotra_mother", "gotra_grandmother"]}
//           rules={[
//             {
//               required: true,
//               message: "Enter Grand_Mother_Maternal Gotra Name",
//             },
//             { max: 50, message: "Maximum 50 characters" },
//             { pattern: /^[a-zA-Z\s]+$/, message: "Only letters allowed" },
//             { validator: gotraValidationRules },
//           ]}
//         />

//         {activatedField === "gotra_grandmother_maternal" && (
//           <GotraDropDown
//             suggestGotra={suggestGotra}
//             handleSelectedItem={handleSelectedItem}
//             setSuggestGotra={setSuggestGotra}
//           />
//         )}
//       </div>

//       {/* other gotra details and  button  */}
//       <OtheGotraDetails form={form} GOTRA_FIELDS={GOTRA_FIELDS}/>

//       {/* pereferences */}
//       <InputField
//         name="preferences"
//         label="Preferences"
//         rules={[
//           { max: 100, message: "Maximum 50 characters" },
//           { pattern: /^[a-zA-Z\s]+$/, message: "Only letters allowed" },
//         ]}
//       />
//     </div>
//   );
// });

// GotraDetials.displayName = "GotraDetials";
// export default GotraDetials;
