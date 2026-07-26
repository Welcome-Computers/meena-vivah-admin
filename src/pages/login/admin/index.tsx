import PublicLayout from "@/components/layout/PublicLayout";
import { useAdminLoginMutation } from "@/redux/features/login";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { useRouter } from "next/router";
import { memo } from "react";

const { Title } = Typography;


const PasswordLoginForm = memo(() => {
  const router = useRouter();
  const [adminLogin] = useAdminLoginMutation();

  const onFinish = async (values: {
    mobile: number;
    password: any;
    remember?: boolean;
  }) => {

    if (!values.mobile || !values.password) {
      appMessage.error("Mobile and Password are required");
      return;
    }
    try {
      const res = await adminLogin(values).unwrap();
      if (res.success) {
        appMessage.success(res.message);
        router.push("/dashboard");
      }
    } catch (error: any) {
      appMessage.error(
        error?.data?.message ||
        error?.response?.data?.message ||
        "Something went wrong",
      );
    }
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

            <div
              style={{
                textAlign: "right",
                marginBottom: 16,
              }}
            >
              <a href="/forgot-password">Forgot Password?</a>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => {
                }}
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
