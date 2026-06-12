import { HeroSection } from "@/components/home/HeroSection";
import { FooterComponent } from "@/components/layout/Footer";
import PublicLayout from "@/components/layout/PublicLayout";
import ProfileContainer from "@/components/profile/ProfileContainer";
import { useGetUsersQuery } from "@/redux/features/profile";
import { useState } from "react";

const Home = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error, } = useGetUsersQuery({ page, limit: 10 });

  const userList = data?.data || [];
  const pagination = data?.pagination || {};

  const getUsers = (page: number) => {
    setPage(page);
  };

  return (
    <PublicLayout
      headerSection={
        <>
          <HeroSection />
          <FooterComponent />
        </>
      }
    >
      <div style={{ marginTop: 30 }}>
        <ProfileContainer
          title="Latest Profiles"
          loading={isLoading}
          data={userList}
          pagination={pagination}
          getUsers={getUsers}
        />
      </div>
    </PublicLayout>
  );
};

export default Home;