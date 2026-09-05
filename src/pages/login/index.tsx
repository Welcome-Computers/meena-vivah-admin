import PublicLayout from "@/components/layout/PublicLayout";
import { getDeviceId } from "@/lib/utility/helper";
import { appMessage } from "@/lib/utility/message";

import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";

const { Title } = Typography;

interface GetOtpFormValues {
  mobile: string;
}

const GetOtpForm = memo(() => {
  const router = useRouter();

  const [clicked, setClicked] = useState(false);
  const [form] = Form.useForm<GetOtpFormValues>();

  const onFinish = async (values: GetOtpFormValues) => {
    setClicked(true);

    try {

      const deviceName = getDeviceId();

      const result = await signIn("sign_take_otp", {
        mobile: values.mobile,
        deviceName,
        redirect: false,
      });

      // console.log("Get OTP response:", result);

      if (result?.error) {
        appMessage.error(result.error);
        return;
      }

      if (result?.ok) {
        // OTP successfully sent
        appMessage.success("OTP sent successfully");

        // Go to OTP verification page
        router.push(
          `/login/profile-login?mobile=${encodeURIComponent(values.mobile)}`
        );
      }
    } catch (error: any) {
      console.error("Get OTP error:", error);

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
              marginBottom: 32,
            }}
          >
            Get OTP
          </Title>

          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            // initialValues={{ mobile: "9828784536" }}
            initialValues={{ mobile: "9971043505" }}
          >
            <Form.Item
              label="Mobile"
              name="mobile"
              rules={[
                {
                  required: true,
                  message: "Please enter your mobile",
                },
                {
                  pattern: /^[6-9]\d{9}$/,
                  message: "Please enter a valid mobile number",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter mobile number"
                size="large"
                maxLength={10}
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
                Get OTP
              </Button>
            </Form.Item>
          </Form>

        </div>
      </div>
    </PublicLayout>
  );
});

GetOtpForm.displayName = "GetOtpForm";

export default GetOtpForm;