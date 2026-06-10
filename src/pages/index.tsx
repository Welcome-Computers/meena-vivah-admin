
import { HeroSection } from "@/components/home/HeroSection";
import { FooterComponent } from "@/components/layout/Footer";
import PublicLayout from "@/components/layout/PublicLayout";
import ProfileContainer from "@/components/profile/ProfileContainer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useCallback, useEffect } from "react";

import { getUsersAction } from "@/redux/features/users/action";

const Home = () => {

  const dispatch = useAppDispatch();

  const {
    loading,
    userList,
    pagination,
  } = useAppSelector((state) => state.users);


  const getUsers = useCallback(
    (page: number, limit = 10) => {
      dispatch(getUsersAction({ page, limit }));
    },
    [dispatch]
  );

  useEffect(() => {
    getUsers(1, 10);
  }, [getUsers]);



  return (
    <PublicLayout
      headerSection={
        <>
          {/* hero section + banner image  */}
          <HeroSection />

          {/* FOOTER SECTION  */}
          <FooterComponent />
        </>
      }
    >


      {/* LATEST PROFILES  */}
      <div style={{ marginTop: 30, }}>
        <ProfileContainer
          title={'Latest Profiles'}
          loading={loading}
          data={userList || []}
          pagination={pagination}
          getUsers={getUsers} />
      </div>
    </PublicLayout>
  );
};

export default Home;
