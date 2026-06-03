import PublicLayout from "@/components/layout/PublicLayout";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import { memo } from "react";

const LoginForm = memo(() => {
  return (
    <PublicLayout>
      <h2 style={{ fontSize: "22px", textAlign: "center", margin: "20px" }}>
        Login
      </h2>

      <Form style={{ width: "30%", padding: "10px", margin: "auto" }}>
        <Form.Item
          name="mobile"
          rules={[{ required: true, message: "enter mobile number" }]}
          style={{ marginBottom: "6px" }}
          label="Mobile Number"
        >
          <Input size="small" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "enter password" }]}
          style={{ marginBottom: "6px" }}
          label="Password"
        >
          <Input.Password size="small" />
        </Form.Item>

        {/* forgot paswrod links */}
        <div style={{ padding: "20px", textAlign: "center" }}>
          <Link href="/dashboard" style={{ color: "#1677ff", margin: "5px", padding: "3px" }} >Dashboard</Link>
        </div>

        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "auto", width: "100%" }}
        >
          Log In
        </Button>
      </Form>
    </PublicLayout>
  );
});

export default LoginForm;











