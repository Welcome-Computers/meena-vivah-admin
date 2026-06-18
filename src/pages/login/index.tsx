import PublicLayout from "@/components/layout/PublicLayout";
import {  UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import OTP from "antd/es/input/OTP";
import { useRouter } from "next/router";
import { memo, useState } from "react";

const { Title } = Typography;

const PasswordLoginForm = memo(() => {
  const [otpField,setOTPField]=useState(false)
  const router = useRouter();

  const onFinish = (values: {
    username: string;
    password: string;
    remember?: boolean;
  }) => {
    console.log("Login Values:", values);
    router.push("/dashboard");
    // Call Login API here
  };

  return (
    <PublicLayout>
      <div className="login_page_container">
        <div className="login_form_container">
          <Title
            level={2}
            style={{
              textAlign: "center",
              marginBottom: 32,
            }}
          >
            Login
          </Title>

          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              remember: true,
            }}
          >
            <Form.Item
              label="Mobile"
              name="mobile"
              rules={[
                {
                  required: true,
                  message: "Please enter your mobile",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter mobile"
                size="large"
              />
            </Form.Item>

          {otpField &&  
           <OTP 
            style={{marginBottom:"1rem"}}
            // name="otp" 
            />
            }

            <Form.Item>
              <Button
                type="primary"
                // htmlType="submit"
                onClick={() => {
                  setOTPField(true)
                }}
                block
                size="large"
              >
                {otpField ? "Log In":"Send OTP"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </PublicLayout>
  );
});

PasswordLoginForm.displayName = "PasswordLoginForm";

export default PasswordLoginForm;
