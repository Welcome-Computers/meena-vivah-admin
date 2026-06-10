import {
  Col,
  InputNumber,
  Row,
  Slider,
} from "antd";
import { memo } from "react";

interface IProps {
  value?: [number, number];
  onChange?: (
    value: [number, number]
  ) => void;

  min?: number;
  max?: number;
}


const RangeSliderSelector = memo(
  ({
    value = [18, 80],
    onChange,
    min = 18,
    max = 80,
  }: IProps) => {

    const triggerChange = (
      newValue: [number, number]
    ) => {
      onChange?.(newValue);
    };

    return (
      <>
        <Slider
          range
          min={min}
          max={max}
          value={value}
          onChange={(v) => {
            if (v[1] <= 25) return;
            triggerChange(
              v as [number, number]
            )
          }
          }
        />

        <Row gutter={10}>
          <Col span={12}>
            <InputNumber
              min={min}
              max={max}
              value={value[0]}
              style={{
                width: "100%",
              }}
              placeholder="Min Age"
              onChange={(v) =>
                triggerChange([
                  Number(v),
                  value[1],
                ])
              }
            />
          </Col>

          <Col span={12}>
            <InputNumber
              min={min}
              max={max}
              value={value[1]}
              style={{
                width: "100%",
              }}
              placeholder="Max Age"
              onChange={(v) => {
                if (Number(v) <= 25) {
                  triggerChange([
                    value[0], 25,])
                } else {

                  triggerChange([
                    value[0],
                    Number(v),
                  ])
                }
              }}
            />
          </Col>
        </Row>
      </>
    );
  }
);

RangeSliderSelector.displayName =
  "RangeSliderSelector";

export default RangeSliderSelector;