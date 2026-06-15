
import AdminLayout from "@/components/layout/AdminLayout";

import ProfileContainer from "@/components/profile/ProfileContainer";
import { useGetUsersQuery } from "@/redux/features/profile";
import { Button } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";



const Profiles = () => {

  const [page, setPage] = useState(1);

  const router = useRouter();

  const { data, isFetching, error, } = useGetUsersQuery({ page, limit: 10 });

  const profilsList = data?.data || [];
  const pagination = data?.pagination || {};

  const getProfiles = (page: number) => {
    setPage(page);
  };



  return (
    <AdminLayout
      breadcrumbItems={[
        {
          title: "Dashboard",
        },
        {
          title: "All Profiles",
        },
      ]}

      headerRightSec={<div><Button type="primary" onClick={() => router.push('/profiles/create_profile')}>Add New</Button></div>}
    >
      <div>
        <ProfileContainer
          defaultShow="table"
          showToggle={false}
          loading={isFetching}
          data={profilsList}
          pagination={pagination}
          showAction={true}
          getProfiles={getProfiles} />

      </div>
    </AdminLayout>
  );
};

export default Profiles;