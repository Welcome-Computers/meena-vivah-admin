import { appMessage } from "@/lib/utility/message";
import { useCreateGotraMutation, useGetGotrasQuery } from "@/redux/features/masterGotra/services";
import { Form } from "antd";
import { memo, useState } from "react";
import style from "../../pages/profiles/style.module.css";
import InputField from "../InputElements/InputField";
import { SelectOption } from "../InputElements/SearchableSelectField";
import { GotraField } from "./Gotra/GotraField";
import { OtheGotraDetails } from "./OtherGotraDetails";

const GotraDetials = memo((props: any) => {

  const { label, name, showCount = false, rules, isGotraLoading, ...rest } = props;

  const form = Form.useFormInstance();

  const fromData = Form.useWatch(null, form)

  // console.log(fromData)

  const [suggestGotra, setSuggestGotra] = useState<string[]>([]);
  const [activatedField, setActivatedField] = useState<string>("");

  const GOTRA_FIELDS = ["gotra_self", "gotra_mother", "gotra_grandmother", "gotra_grandmother_maternal"];

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


  const { gotra_self,
    gotra_mother,
    gotra_grandmother,
    gotra_grandmother_maternal } = fromData || {}

  const otherGotraDependencies = [
    "gotra_self",
    "gotra_self",
    "gotra_grandmother",
    "gotra_grandmother_maternal",
  ]

  const { data, isLoading, refetch } = useGetGotrasQuery({});
  const [createGotra] = useCreateGotraMutation();


  const gottraOptions =
    data?.map((item: any) => ({
      label: item.name,
      value: item.code,
      disabled: [
        gotra_self,
        gotra_mother,
        gotra_grandmother,
        gotra_grandmother_maternal
      ]?.includes(
        item.code
      ),
    })) || [];

  const handleCreateGotra = async (value: string): Promise<SelectOption | void> => {
    try {

      const res = await createGotra({ name: value, }).unwrap();

      if (res?.success) {
        appMessage.success(
          "Gotra added successfully"
        );

        await refetch();
        return {
          label: res?.data?.[0]?.name,
          value: res?.data?.[0]?.code,
        };

      }
    } catch (error: any) {
      appMessage.error(
        error?.data?.message ||
        "Failed to add gotra"
      );
    }
  };

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
            isGotraLoading={isGotraLoading}
            dependencies={item.dependencies}
            gotraValidationRules={gotraValidationRules}
            activatedField={activatedField}
            suggestGotra={suggestGotra}
            handleSelectedItem={handleSelectedItem}
            setSuggestGotra={setSuggestGotra}
            handleInputValue={handleInputValue}
            setActivatedField={setActivatedField}
            handleCreateGotra={handleCreateGotra}
            gottraOptions={gottraOptions}
          />
        ))}
      </div>

      {/* other gotra details and  button  */}
      <OtheGotraDetails
        handleCreateGotra={handleCreateGotra}
        gottraOptions={gottraOptions}
        dependencies={otherGotraDependencies}
        isGotraLoading={isGotraLoading}
        handleInputValue={handleInputValue}
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


