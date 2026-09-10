import TopStatics from "@/components/dashboard/TopStatics";
import AdminLayout from "@/components/layout/AdminLayout";
import ProfileContainer from "@/components/profile/ProfileContainer";
import { useAuth } from "@/hook/useAuth";
import { useGetPrivateProfilesQuery } from "@/redux/features/profile/srevices";
import { Row } from "antd";
import { useState } from "react";

const Dashboard = () => {
  const status = {
    totalMembers: 120,
    boys: 70,
    girls: 50,
    matched: 18,
  };
  const { userRole } = useAuth();

  const [page, setPage] = useState(1);
  const LIMIT = 10

  const params = {
    page,
    ...(userRole === "admin" ? { limit: LIMIT } : {}),
    role: userRole ?? undefined,
  }

  const { data, isFetching, error, } = useGetPrivateProfilesQuery(
    params,
    {
      refetchOnMountOrArgChange: true,
      skip: !userRole
    });

  const userList = data?.data || [];
  const pagination = data?.pagination || {};

  const getProfiles = (page: number) => {
    setPage(page);
  };

  // useEffect(() => {
  //   if (error?.status === 401) {
  //     router.push("/login");
  //   }
  // }, [error]);


  return (
    <AdminLayout title="Dashboard Overview">
      <div>
        {/* ================= STATUS ================= */}
        <Row gutter={[16, 16]}>
          <TopStatics status={status} />
        </Row>

        {userRole === "admin" ?
          <>
            {/* ================= TABLE 1 ================= */}
            <div>
              <ProfileContainer
                defaultShow="table"
                loading={isFetching}
                title={'Newly Registrations'}
                data={userList || []}
                // pagination={pagination}
                showAction={true}
                getProfiles={getProfiles} />
            </div>

          </> : null}

        {userRole === "profile" ?
          <>
            {/* ================= TABLE 1 ================= */}
            <div>
              <ProfileContainer
                defaultShow="table"
                loading={isFetching}
                title={'Your Posted Profiles'}
                data={userList || []}
                // pagination={pagination}
                showAction={true}
                getProfiles={getProfiles} />
            </div>
          </> : null}

      </div>
    </AdminLayout>
  );
};

export default Dashboard;