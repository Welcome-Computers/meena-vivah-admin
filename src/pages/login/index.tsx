import PublicLayout from "@/components/layout/PublicLayout";
import {
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Typography,
} from "antd";
import { useRouter } from "next/router";
import { memo } from "react";

const { Title } = Typography;

const LoginForm = memo(() => {

  const router = useRouter();

  const onFinish = (values: {
    username: string;
    password: string;
    remember?: boolean;
  }) => {
    console.log("Login Values:", values);
    router.push("/dashboard")
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
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please enter your username",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter username"
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

            <Form.Item
              name="remember"
              valuePropName="checked"
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <div
              style={{
                textAlign: "right",
                marginBottom: 16,
              }}
            >
              <a href="/forgot-password">
                Forgot Password?
              </a>
            </div>

            <Form.Item>
              <Button
                type="primary"
                // htmlType="submit"
                onClick={() => { router.push("/dashboard") }}
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

LoginForm.displayName = "LoginForm";

export default LoginForm;