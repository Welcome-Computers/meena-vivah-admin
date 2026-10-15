import style from "@/styles/profileStyle.module.css";
import { Form } from "antd";
import { memo } from "react";
import InputField from "../InputElements/InputField";

const MobileDetails = memo((props: any) => {
  const { form } = props;

  // validation empty entries and max 3 mobile nummbers can add
  const mobileDetails = Form.useWatch("other_mobile", form) || [];
  const isDisabled = !(
    mobileDetails[mobileDetails.length - 1]?.mobile?.length > 9 &&
    mobileDetails.length < 3
  );

  return (
    <div className={style["form-container"]}>
      {/* pereferences */}
      <InputField
        name="preferences"
        label="Preferences"
        rules={[
          { max: 100, message: "Maximum 50 characters" },
        ]}
      />

      {/* <InputField
        name={"other_mobile"}
        rules={[
          {
            validator: async (_: any, value: any) => {
              if (!value) return Promise.resolve();

              const numbers = value
                .split(",")
                .map((num: string) => num.trim())
                .filter(Boolean);

              const uniqueNumbers = new Set(numbers);

              if (uniqueNumbers.size !== numbers.length) {
                return Promise.reject(
                  new Error("Duplicate mobile numbers are not allowed")
                );
              }

              for (const number of numbers) {
                if (!/^(\+91)?[6-9]\d{9}$/.test(number)) {
                  return Promise.reject(
                    new Error(
                      `Invalid mobile number: ${number}`
                    )
                  );
                }
              }

              return Promise.resolve();
            },
          },
        ]}
        label="Other Mobile"
        placeholder="e.g. 9988771234"
      /> */}

    </div>
  );
});

MobileDetails.displayName = "MobileDetails";
export default MobileDetails;
