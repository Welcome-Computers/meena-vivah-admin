import { Button, Form, Input } from "antd";
import Link from "next/link";
import { memo } from "react";

const loginForm = memo(() => {
  return (
    <>
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
<div>
    <Link href="sdfdsf" style={{ color: "#1677ff" ,margin:"5px" ,padding:"3px" }} >Login with otp</Link>
    <Link href="sdfdsf" style={{ color: "#1677ff" ,margin:"5px" ,padding:"3px" }} >Login with otp</Link>
</div>

        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "auto", width: "100%" }}
        >
          Log In
        </Button>
      </Form>
    </>
  );
});

loginForm.displayName = "loginForm";
export default loginForm;











