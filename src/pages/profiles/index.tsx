
import AdminLayout from "@/components/layout/AdminLayout";

import ProfileContainer from "@/components/profile/ProfileContainer";
import { useGetUsersQuery } from "@/redux/features/profile";
import Title from "antd/es/typography/Title";
import { useState } from "react";



const Profiles = () => {

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
        <Title level={5} style={{ marginBottom: 16 }}>
          All Profiles
        </Title>

        <ProfileContainer
          defaultShow="table"
          showToggle={false}
          loading={isLoading}
          data={userList}
          pagination={pagination}
          getUsers={getUsers} />

      </div>
    </AdminLayout>
  );
};

export default Profiles;