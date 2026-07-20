import PublicLayout from "@/components/layout/PublicLayout";
import { appMessage } from "@/lib/utility/message";
import { useAdminLoginMutation } from "@/redux/features/login";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, FormProps, Input, Typography } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";

const { Title } = Typography;

export interface LoginFormValues {
  mobile: string;
  password: string;
  remember?: boolean;
}


const PasswordLoginForm = memo(() => {
  const router = useRouter();
  const [adminLogin] = useAdminLoginMutation();

  // State and Hooks
  const [clicked, setClicked] = useState(false);
  const [form] = Form.useForm<LoginFormValues>();

  // Handle form submit
  const onFinish: FormProps<LoginFormValues>['onFinish'] = async (values: any) => {
    setClicked(true);
    try {
      const response: any = await signIn("sign_in", {
        mobile: values.mobile,
        password: values.password,
        redirect: false,
      });

      if (response?.error) {
        appMessage.error(response.error);
      } else {
        router.push(`/dashboard`);
      }
    } catch (error) {
      console.error("Sign-in error:", error);
    } finally {
      setClicked(false);
    }
  };

  // Reset clicked state on unmount
  useEffect(() => {
    return () => {
      setClicked(false);
    };
  }, []);

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
            Login Admin
          </Title>

          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              remember: true,
              mobile: 9784139574,
              password: "raj"
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

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter password"
                size="large"
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <div style={{ textAlign: "right", marginBottom: 16, }}>
              <a href="/forgot-password">Forgot Password?</a>
            </div>

            <Form.Item>
              <Button
                type="primary"
                loading={clicked}
                iconPlacement="end"
                htmlType="submit"
                block
                size="large"
              >
                Log In
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
