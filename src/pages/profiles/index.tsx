import { useCallback, useEffect } from "react";

import AdminLayout from "@/components/layout/AdminLayout";

import ProfileContainer from "@/components/profile/ProfileContainer";
import { getUsersAction } from "@/redux/features/users/action";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Title from "antd/es/typography/Title";



const Profiles = () => {

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
        <Title level={5} style={{ marginBottom: 16 }}>
          All Profiles
        </Title>

        <ProfileContainer
          loading={loading}
          data={userList}
          pagination={pagination}
          getUsers={getUsers} />

      </div>
    </AdminLayout>
  );
};

export default Profiles;