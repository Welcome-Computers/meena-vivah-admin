import { Flex, Space, Typography } from "antd";
import "./CopyrightSection.module.scss";

const { Text, Link } = Typography;

const CopyrightSection = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="copyright-section">
      <Flex
        align="center"
        justify="space-between"
        wrap="wrap"
        gap={16}
      >
        {/* Copyright */}
        <Text type="secondary">
          © {currentYear} Your Company Name. All rights reserved.
        </Text>

        {/* Links */}
        <Space size="large" wrap>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-and-conditions">
            Terms & Conditions
          </Link>
        </Space>

        {/* Social / Other Links */}
        <Space>
          <Link href="#">Facebook</Link>
          <Link href="#">Instagram</Link>
          <Link href="#">LinkedIn</Link>
        </Space>
      </Flex>
    </div>
  );
};

export default CopyrightSection;