import AdminLayout from "@/components/layout/AdminLayout";

import {
  Row,
  Typography
} from "antd";

import TopStatics from "@/components/dashboard/TopStatics";
import ProfileContainer from "@/components/profile/ProfileContainer";
import { useGetUsersQuery } from "@/redux/features/profile";
import { useState } from "react";

const { Title } = Typography;

const Dashboard = () => {
  const stats = {
    totalMembers: 120,
    boys: 70,
    girls: 50,
    matched: 18,
  };


  const [page, setPage] = useState(1);

  const { data, isLoading, error, } = useGetUsersQuery({ page, limit: 10 });

  const userList = data?.data || [];
  const pagination = data?.pagination || {};

  const getUsers = (page: number) => {
    setPage(page);
  };



  return (
    <AdminLayout>
      <div>
        <Title level={4}>
          Dashboard Overview
        </Title>

        {/* ================= STATS ================= */}
        <Row gutter={16}>
          <TopStatics stats={stats} />
        </Row>

        {/* ================= TABLE 1 ================= */}
        <div style={{ marginTop: 30, }}>
          <ProfileContainer
            defaultShow="table"
            loading={isLoading}
            title={'Last 15 Days New Registrations'}
            data={userList || []}
            pagination={pagination}
            getUsers={getUsers} />
        </div>

        {/* ================= TABLE 2 ================= */}
        <div style={{ marginTop: 30, }}>
          <ProfileContainer
            title={'Last 15 Days Updates'}
            loading={isLoading}
            defaultShow="table"
            data={userList || []}
            pagination={pagination}
            getUsers={getUsers} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;