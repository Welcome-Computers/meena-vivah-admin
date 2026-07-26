import TopStatics from "@/components/dashboard/TopStatics";
import AdminLayout from "@/components/layout/AdminLayout";
import ProfileContainer from "@/components/profile/ProfileContainer";
import { useAuth } from "@/hook/useAuth";
import { useGetProfilesQuery } from "@/redux/features/profile/srevices";
import { Row } from "antd";
import { useState } from "react";

const Dashboard = () => {
  const stats = {
    totalMembers: 120,
    boys: 70,
    girls: 50,
    matched: 18,
  };
  const { userRole } = useAuth();

  const [page, setPage] = useState(1);

  const { data, isFetching, error, } = useGetProfilesQuery(
    { page, limit: 10, role: userRole ?? undefined },
    {
      refetchOnMountOrArgChange: true,
      skip: !userRole
    });

  const userList = data?.data || [];
  const pagination = data?.pagination || {};

  const getProfiles = (page: number) => {
    setPage(page);
  };



  return (
    <AdminLayout title="Dashboard Overview">
      <div>
        {/* ================= STATS ================= */}
        <Row gutter={16}>
          <TopStatics stats={stats} />
        </Row>

        {userRole === "admin" ?
          <>
            {/* ================= TABLE 1 ================= */}
            <div style={{ marginTop: 30, }}>
              <ProfileContainer
                defaultShow="table"
                loading={isFetching}
                title={'Last 15 Days New Registrations'}
                data={userList || []}
                pagination={pagination}
                showAction={true}
                getProfiles={getProfiles} />
            </div>

            {/* ================= TABLE 2 ================= */}
            <div style={{ marginTop: 30, }}>
              <ProfileContainer
                title={'Last 15 Days Updates'}
                loading={isFetching}
                defaultShow="table"
                data={userList || []}
                pagination={pagination}
                showAction={true}
                getProfiles={getProfiles} />
            </div>
          </> : null}

        {userRole === "profile" ?
          <>
            {/* ================= TABLE 1 ================= */}
            <div style={{ marginTop: 30, }}>
              <ProfileContainer
                defaultShow="table"
                loading={isFetching}
                title={'Last 15 Days New Registrations'}
                data={userList || []}
                pagination={pagination}
                showAction={true}
                getProfiles={getProfiles} />
            </div>
          </> : null}

      </div>
    </AdminLayout>
  );
};

export default Dashboard;