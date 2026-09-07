
import AdminLayout from "@/components/layout/AdminLayout";

import ProfileContainer from "@/components/profile/ProfileContainer";
import { STATUS_TYPES } from "@/lib/modules/admin/admin.types";
import { useGetPrivateProfilesQuery } from "@/redux/features/profile/srevices";
import { Button } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";



const Profiles = () => {

  const [status, setStatus] = useState<STATUS_TYPES[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const router = useRouter();

  const { data, isFetching, error, } = useGetPrivateProfilesQuery({ status, page, limit });

  const profilsList = data?.data || [];
  const pagination = data?.pagination || {};

  const getProfiles = (
    page: number,
    pageSize?: number,
    status?: STATUS_TYPES[]) => {
    setPage(page);
    if (status) {
      setStatus(status)
    }
    if (pageSize) {
      setLimit(pageSize)
    }
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