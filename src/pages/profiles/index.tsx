import axios from "axios";
import { useEffect, useState } from "react";

import AdminLayout from "@/components/layout/AdminLayout";

import ProfileContainer from "@/components/profile/ProfileContainer";
import { IUser } from "@/redux/types";
import { message } from "antd";
import Title from "antd/es/typography/Title";



const Dashboard = () => {

  const [data, setData] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    "total": 6,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  });

  const getUsers = async (
    page = pagination.page,
    limit = pagination.limit
  ) => {
    try {
      setLoading(true);

      const response = await axios.get(
        `http://localhost:3005/api/user?page=${page}&limit=${limit}`
      );

      const result = response?.data;

      if (result?.success) {
        setData(result?.data || []);

        setPagination(result?.pagination);
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch profiles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers(1);
  }, []);


  return (
    <AdminLayout>
      <div>
        <Title level={5} style={{ marginBottom: 16 }}>
          All Profiles
        </Title>

        <ProfileContainer
          loading={loading}
          data={data}
          pagination={pagination}
          getUsers={getUsers} />

      </div>
    </AdminLayout>
  );
};

export default Dashboard;