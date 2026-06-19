import { Skeleton, Space } from "antd";

const FormSkeleton = () => (
  <Space
    orientation="vertical"
    size={24}
    style={{ width: "100%" }}
  >
    {Array.from({ length: 12 }).map((_, index) => (
      <Skeleton.Input
        key={index}
        active
        block
        size="large"
      />
    ))}
  </Space>
);

export default FormSkeleton;