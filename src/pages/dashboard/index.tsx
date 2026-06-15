import AdminLayout from "@/components/layout/AdminLayout";

import {
  Row,
  Typography
} from "antd";

import TopStatics from "@/components/dashboard/TopStatics";
import ProfileContainer from "@/components/profile/ProfileContainer";
import { useGetUsersQuery } from "@/redux/features/profile";
import { useRouter } from "next/router";
import { useState } from "react";

const { Title } = Typography;

const Dashboard = () => {
  const stats = {
    totalMembers: 120,
    boys: 70,
    girls: 50,
    matched: 18,
  };

  const router = useRouter()

  const [page, setPage] = useState(1);

  const { data, isFetching, error, } = useGetUsersQuery({ page, limit: 10 });

  const userList = data?.data || [];
  const pagination = data?.pagination || {};

  const getUsers = (page: number) => {
    setPage(page);
  };



  return (
    <AdminLayout
      title="Dashboard Overview"
    >
      <div>
        {/* ================= STATS ================= */}
        <Row gutter={16}>
          <TopStatics stats={stats} />
        </Row>

        {/* ================= TABLE 1 ================= */}
        <div style={{ marginTop: 30, }}>
          <ProfileContainer
            defaultShow="table"
            loading={isFetching}
            title={'Last 15 Days New Registrations'}
            data={userList || []}
            pagination={pagination}
            showAction={true}
            getUsers={getUsers} />
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
            getUsers={getUsers} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;