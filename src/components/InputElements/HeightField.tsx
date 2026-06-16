import { Form, InputNumber } from "antd";
import { memo, useEffect, useState } from "react";

interface HeightFieldProps {
  name: string;
  label?: string;
}

const HeightField = memo(
  ({ name, label }: HeightFieldProps) => {
    const form = Form.useFormInstance();

    const cmValue = Form.useWatch(name, form);

    const [foot, setFoot] = useState<number | null>(null);
    const [inch, setInch] = useState<number | null>(null);

    const [lastUpdatedBy, setLastUpdatedBy] = useState<
      "cm" | "ft-inch" | null
    >(null);



    /**
     * CM -> Foot/Inch
     */
    // useEffect(() => {
    //   if (!cmValue && cmValue !== 0) {
    //     setFoot(null);
    //     setInch(null);
    //     return;
    //   }

    //   const totalInches =
    //     Number(cmValue) / 2.54;

    //   const ft =
    //     Math.floor(totalInches / 12);

    //   const inchVal =
    //     Math.round(totalInches % 12);

    //   setFoot(ft);
    //   setInch(inchVal);
    // }, [cmValue]);

    useEffect(() => {
      if (!cmValue && cmValue !== 0) {
        setFoot(null);
        setInch(null);
        return;
      }

      const totalInches = Number(cmValue) / 2.54;

      const ft = Math.floor(totalInches / 12);
      const inchVal = Math.round(totalInches % 12);

      setFoot(ft);
      setInch(inchVal);
    }, [cmValue]);

    /**
     * Foot/Inch -> CM
     */
    const updateCm = (
      ft: number | null,
      inchVal: number | null
    ) => {
      if (
        ft === null &&
        inchVal === null
      ) {
        form.setFieldValue(
          name,
          null
        );
        return;
      }

      const totalInches =
        (ft || 0) * 12 +
        (inchVal || 0);

      const cm = Math.round(
        totalInches * 2.54
      );

      form.setFieldValue(
        name,
        cm
      );
    };

    return (
      <Form.Item
        label={label}
        style={{
          marginBottom: 5,
        }}
      >

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "3fr 3fr 1fr 3fr",
            gap: 8,
          }}
        >
          {/* FOOT */}
          <div>
            <label>Foot</label>
            <InputNumber
              min={0}
              value={foot}
              placeholder="Foot"
              style={{
                width: "100%",
              }}
              onChange={(value) => {
                const ft = Number(value);

                setFoot(ft);

                updateCm(
                  ft,
                  inch
                );
              }}
            />
          </div>

          {/* INCH */}
          <div>
            <label>Inch</label>
            <InputNumber
              min={0}
              max={11}
              value={inch}
              placeholder="Inch"
              style={{
                width: "100%",
              }}
              onChange={(value) => {
                const inchVal = Number(value);

                setLastUpdatedBy("ft-inch");
                setInch(inchVal);

                updateCm(foot, inchVal);
              }}
            />
          </div>
          <div
            style={{
              textAlign: "center",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            =
          </div>         {/* CM */}
          <div>
            <label>Foot</label>
            <Form.Item noStyle name={name}>
              <InputNumber
                min={0}
                placeholder="CM"
                style={{ width: "100%" }}
                onChange={() => {
                  setLastUpdatedBy("cm");
                }}
              />
            </Form.Item>
          </div>
        </div>
      </Form.Item>
    );
  }
);

HeightField.displayName =
  "HeightField";

export default HeightField;