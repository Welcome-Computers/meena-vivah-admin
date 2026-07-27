import CopyrightSection from "@/components/home/CopyrightSection";
import PublicLayout from "@/components/layout/PublicLayout";
import Link from "next/link";

const NotFoundPage = () => {

  return (
    <PublicLayout>

      <div style={{ marginTop: 30, textAlign: "center", height: 250 }}>

        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>
          Sorry, the page you are looking for does not exist.
        </p>

        <Link href="/">
          Go back to Home
        </Link>

      </div>

      <CopyrightSection />
    </PublicLayout>
  );
};

export default NotFoundPage;