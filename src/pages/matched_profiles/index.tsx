import PublicLayout from "@/components/layout/PublicLayout";
import ProfileContainer from "@/components/profile/ProfileContainer";
import { ProfileFilter } from "@/components/profile/ProfileFilter";
import { GetUsersProps } from "@/lib/modules/profile/profile.types";
import { getUsersAction } from "@/redux/features/profile/action";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import style from "./Profile.module.css";



const MatchedProfilePage = () => {


  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const filters = {
    looking_for: searchParams.get("looking_for"),
    preferredAge: searchParams.getAll("preferredAge[]").map(Number),
    req_occupation: searchParams.getAll("req_occupation[]"),
    exclude_gotra: searchParams.getAll("exclude_gotra[]"),
  };

  console.log({ filters })

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

  console.log({ userList })


  useEffect(() => {
    getUsers(1, 10);
  }, [getUsers]);

  const filterDataHandler = useCallback((query: GetUsersProps) => {
    dispatch(getUsersAction({ ...query, action: "matches", page: 1, limit: 10 }));
  }, [dispatch]);


  return (
    <PublicLayout
      headerSection={
        <>
          {/* banner */}

          <div className={style.profilebanner} />

        </>
      }
    >

      {/* showing profiles */}
      <section className={style.profiles}>
        {/* form gird */}
        <div className={style.gridItem}>
          <ProfileFilter
            callingFrom="profilePage"
            filterDataHandler={filterDataHandler} />
          <div>
            <ProfileContainer
              loading={loading}
              data={userList}
              pagination={pagination}
              getUsers={getUsers} />
          </div>
        </div>
      </section>

    </PublicLayout>
  );
};

export default MatchedProfilePage;
