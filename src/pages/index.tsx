import CopyrightSection from "@/components/home/CopyrightSection";
import { HeroSection } from "@/components/home/HeroSection";
import { FooterComponent } from "@/components/layout/Footer";
import PublicLayout from "@/components/layout/PublicLayout";
import ProfileContainer from "@/components/profile/ProfileContainer";
import { useGetProfilesQuery } from "@/redux/features/profile/srevices";
import { useState } from "react";

const Home = () => {
  const [page, setPage] = useState(1);

  const { data, isFetching, isLoading, error, } = useGetProfilesQuery({ page, limit: 10 });

  const userList = data?.data || [];
  const pagination = data?.pagination || {};

  const getProfiles = (page: number) => {
    setPage(page);
  };


  return (
    <PublicLayout
      headerSection={
        <>
          <HeroSection />
          <FooterComponent />
        </>
      }>

      <div style={{ marginTop: 30 }}>
        <ProfileContainer
          title="Latest Profiles"
          loading={isLoading || isFetching}
          data={userList}
          pagination={pagination}
          getProfiles={getProfiles}
        // defaultShow={"table"}
        />
      </div>

      <CopyrightSection />
    </PublicLayout>
  );
};

export default Home;