import CopyrightSection from "@/components/home/CopyrightSection";
import PublicLayout from "@/components/layout/PublicLayout";
import { useGetProfilesQuery } from "@/redux/features/profile/srevices";
import Link from "next/link";
import { useState } from "react";

const Home = () => {
  const [page, setPage] = useState(1);

  const { data, isFetching, error, } = useGetProfilesQuery({ page, limit: 10 });

  const userList = data?.data || [];
  const pagination = data?.pagination || {};

  const getProfiles = (page: number) => {
    setPage(page);
  };

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

export default Home;