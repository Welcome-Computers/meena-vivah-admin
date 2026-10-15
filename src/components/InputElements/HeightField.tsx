import { cmToFeetInch } from "@/lib/utility/helper";
import { Form, FormInstance, InputNumber } from "antd";
import { memo, useEffect, useRef, useState } from "react";

interface HeightFieldProps {
  name: string;
  label?: string;
  form: FormInstance
}

const HeightField = ({ name, label, form }: HeightFieldProps) => {
  // const form = Form.useFormInstance();

  const inchInputRef = useRef<any>(null);
  const footInputRef = useRef<any>(null);

  // ============================================================
  // 3 LOCAL STATES
  // ============================================================

  const [foot, setFoot] = useState<number | null>(null);
  const [inch, setInch] = useState<number | null>(null);
  const [cm, setCm] = useState<number | null>(null);

  useEffect(() => {
    form.setFieldValue(name, cm);
  }, [name, cm])

  // ============================================================
  // FORM VALUE
  //
  // Form value is CM
  // ============================================================

  const formCmValue = Form.useWatch(name, form);
  // console.log("formCmValue", cm)

  // ============================================================
  // INITIAL / EDIT DATA
  //
  // If Form already contains CM value,
  // convert it into Foot + Inch.
  // ============================================================

  useEffect(() => {
    if (
      formCmValue === undefined ||
      formCmValue === null ||
      formCmValue === ""
    ) {
      setCm(null);
      setFoot(null);
      setInch(null);

      return;
    }

    const cmValue = Number(
      formCmValue
    );

    if (Number.isNaN(cmValue)) {
      return;
    }

    setCm(cmValue);

    const {
      feet,
      inches,
    } = cmToFeetInch(cmValue);

    setFoot(feet);
    setInch(inches);
  }, [formCmValue]);

  // ============================================================
  // FOOT + INCH -> CM
  // ============================================================

  const updateFromFootInch = (
    ft: number | null,
    inchValue: number | null
  ) => {
    // ----------------------------------------------------------
    // Both empty
    // ----------------------------------------------------------

    if (
      ft === null &&
      inchValue === null
    ) {
      setCm(null);

      // form.setFieldValue(name, null);

      return;
    }

    // ----------------------------------------------------------
    // Empty value = 0
    // ----------------------------------------------------------

    const feetValue = ft ?? 0;
    const inchesValue =
      inchValue ?? 0;

    // ----------------------------------------------------------
    // Foot + Inch -> Total Inches
    // ----------------------------------------------------------

    const totalInches =
      feetValue * 12 +
      inchesValue;

    // ----------------------------------------------------------
    // Inches -> CM
    // ----------------------------------------------------------

    const cmValue = Math.round(totalInches * 2.54);

    // ----------------------------------------------------------
    // Update CM local state
    // ----------------------------------------------------------

    setCm(cmValue);

    // ----------------------------------------------------------
    // Update Form CM value
    // ----------------------------------------------------------
    // debugger;
    // form.setFieldValue(name, cmValue);
  };

  // ============================================================
  // FOOT CHANGE
  // ============================================================

  const handleFootChange1 = (
    value: number | null
  ) => {
    setFoot(value);

    updateFromFootInch(value, inch);
  };

  const handleFootChange = (value: number | null) => {
    setFoot(value);

    // Decimal value entered in foot
    if (value != null && !Number.isInteger(value)) {
      const feet = Math.floor(value);
      const inches = Math.round((value - feet) * 12);

      setFoot(feet);
      setInch(inches);
      updateFromFootInch(feet, inches);
      return;
    }

    updateFromFootInch(value, inch);
  };

  // ============================================================
  // INCH CHANGE
  // ============================================================

  const handleInchChange = (
    value: number | null
  ) => {
    setInch(value);
    updateFromFootInch(foot, value);
  };

  const handleInchChange1 = (value: number | null) => {
    if (value != null && !Number.isInteger(value)) {
      const feet = Math.floor(value);
      const inches = Math.round((value - feet) * 12);

      setFoot(feet);
      setInch(inches);
      updateFromFootInch(feet, inches);
      return;
    }

    setInch(value);
    updateFromFootInch(foot, value);
  };


  // ============================================================
  // CM -> FOOT + INCH
  // ============================================================

  const handleCmChange = (
    value: number | null
  ) => {
    // ----------------------------------------------------------
    // Update CM state
    // ----------------------------------------------------------

    setCm(value);

    // ----------------------------------------------------------
    // Empty CM
    // ----------------------------------------------------------

    if (
      value === null ||
      value === undefined
    ) {
      setFoot(null);
      setInch(null);

      // form.setFieldValue(name, null);

      return;
    }

    // ----------------------------------------------------------
    // Update Form
    // ----------------------------------------------------------

    // form.setFieldValue(name, value);

    // ----------------------------------------------------------
    // CM -> Foot + Inch
    // ----------------------------------------------------------

    const { feet, inches } = cmToFeetInch(value);

    setFoot(feet);
    setInch(inches);
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <>
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
          {/* ====================================================
              FOOT
          ==================================================== */}

          <div>
            <label>Foot</label>

            {/* <InputNumber
              min={0}
              max={8}
              value={foot}
              placeholder="Foot"
              style={{
                width: "100%",
              }}
              onChange={
                handleFootChange
              }
            /> */}
            <InputNumber
              ref={footInputRef}
              min={0}
              value={foot}
              placeholder="Foot"
              style={{ width: "100%" }}
              onKeyDown={(e) => {
                if (e.key === ".") {
                  setTimeout(() => {
                    inchInputRef.current?.focus();
                  }, 0);
                }
              }}
              onChange={handleFootChange}
            />
          </div>

          {/* ====================================================
              INCH
          ==================================================== */}

          <div>
            <label>Inch</label>

            {/* <InputNumber
              min={0}
              max={11}
              value={inch}
              placeholder="Inch"
              style={{
                width: "100%",
              }}
              onChange={
                handleInchChange
              }
            /> */}
            <InputNumber
              ref={inchInputRef}
              min={0}
              max={11}
              value={inch}
              placeholder="Inch"
              style={{ width: "100%" }}
              onKeyDown={(e) => {
                if (e.key === ".") {
                  e.preventDefault();
                }
              }}
              onChange={handleInchChange}
            />
          </div>

          {/* ====================================================
              =
          ==================================================== */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            =
          </div>

          {/* ====================================================
              CM
          ==================================================== */}

          <div>
            <label>CM</label>
            <Form.Item
              name={name}>
              <InputNumber
                min={0}
                value={cm}
                placeholder="CM"
                style={{
                  width: "100%",
                }}
                onChange={
                  handleCmChange
                }
              />
            </Form.Item>
          </div>
        </div>
      </Form.Item>
    </>
  );
};

HeightField.displayName = "HeightField";

export default memo(HeightField);