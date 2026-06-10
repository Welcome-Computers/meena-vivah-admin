import AdminLayout from "@/components/layout/AdminLayout";

import {
  Row,
  Typography
} from "antd";

import TopStatics from "@/components/dashboard/TopStatics";
import ProfileContainer from "@/components/profile/ProfileContainer";
import { getUsersAction } from "@/redux/features/profile/action";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useCallback, useEffect } from "react";

const { Title } = Typography;

const Dashboard = () => {
  const stats = {
    totalMembers: 120,
    boys: 70,
    girls: 50,
    matched: 18,
  };


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
            loading={loading}
            title={'Last 15 Days New Registrations'}
            data={userList || []}
            pagination={pagination}
            getUsers={getUsers} />
        </div>

        {/* ================= TABLE 2 ================= */}
        <div style={{ marginTop: 30, }}>
          <ProfileContainer
            title={'Last 15 Days Updates'}
            loading={loading}
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