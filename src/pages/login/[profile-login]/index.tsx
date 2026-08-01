import PublicLayout from "@/components/layout/PublicLayout";
import { getDeviceId } from "@/lib/utility/helper";
import { appMessage } from "@/lib/utility/message";
import { Button, Form, Input, Typography } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import {
  memo,
  useEffect,
  useState,
} from "react";

const { Title, Text } = Typography;

interface OtpFormValues {
  otp: string;
}

const OtpLoginForm = memo(() => {
  const router = useRouter();

  const [clicked, setClicked] = useState(false);
  const [form] = Form.useForm<OtpFormValues>();

  // Get mobile from URL
  const mobile =
    typeof router.query.mobile === "string"
      ? router.query.mobile
      : "";

  const onFinish = async (values: OtpFormValues) => {
    if (!mobile) {
      appMessage.error("Mobile number is missing");
      return;
    }

    setClicked(true);

    try {

      const deviceName = getDeviceId();

      const result = await signIn("sign_in_profile", {
        mobile,
        otp: values.otp,
        deviceName,
        redirect: false,
      });

      // console.log("OTP Login response:", result);

      if (result?.error) {
        appMessage.error(result.error);
        return;
      }

      if (result?.ok) {
        sessionStorage.setItem("admin_session", "active");

        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("OTP Login error:", error);

      appMessage.error(
        error?.message || "Something went wrong"
      );
    } finally {
      setClicked(false);
    }
  };

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
              marginBottom: 16,
            }}
          >
            Verify OTP
          </Title>

          <Text
            type="secondary"
            style={{
              display: "block",
              textAlign: "center",
              marginBottom: 32,
            }}
          >
            Enter the OTP sent to {mobile}
          </Text>

          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              label="OTP"
              name="otp"
              rules={[
                {
                  required: true,
                  message: "Please enter OTP",
                },
              ]}
            >
              <Input.OTP
                length={6}
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                loading={clicked}
                htmlType="submit"
                block
                size="large"
              >
                Verify OTP & Login
              </Button>
            </Form.Item>
          </Form>

          <Button
            type="link"
            onClick={() => router.push("/login")}
            block
          >
            Change Mobile Number
          </Button>

        </div>
      </div>
    </PublicLayout>
  );
});

OtpLoginForm.displayName = "OtpLoginForm";

export default OtpLoginForm;