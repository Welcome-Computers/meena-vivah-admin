// src/components/home/CopyrightSection.tsx

import { Space } from "antd";
import Link from "next/link";
import styles from "./CopyrightSection.module.scss";


const CopyrightSection = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.copyrightSection}>
      <div className={styles.container}>
        {/* Copyright */}
        <div className={styles.copyrightText}>
          © {currentYear} Your Company Name. All rights reserved.
        </div>

        {/* Footer Links */}
        <Space
          className={styles.links}
          size="large"
          wrap
        >
          <Link href="/about" className={styles.link}>
            About Us
          </Link>

          <Link href="/contact" className={styles.link}>
            Contact Us
          </Link>

          <Link href="/privacy-policy" className={styles.link}>
            Privacy Policy
          </Link>

          <Link
            href="/terms-and-conditions"
            className={styles.link}
          >
            Terms & Conditions
          </Link>
          <Link
            href="/login/auth"
            className={styles.link}
          >
            Office
          </Link>
        </Space>
      </div>
    </footer>
  );
};

export default CopyrightSection;