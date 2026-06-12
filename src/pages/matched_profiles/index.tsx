import PublicLayout from "@/components/layout/PublicLayout";
import ProfileContainer from "@/components/profile/ProfileContainer";
import { ProfileFilter } from "@/components/profile/ProfileFilter";
import { GetUsersProps } from "@/lib/modules/profile/profile.types";
import { useGetUsersQuery } from "@/redux/features/profile";
import { useAppDispatch } from "@/redux/hooks";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import style from "./Profile.module.css";



const MatchedProfilePage = () => {


  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();


  const searchfilters = {
    looking_for: searchParams.get("looking_for"),
    preferredAge: searchParams.getAll("preferredAge[]").map(Number),
    req_occupation: searchParams.getAll("req_occupation[]"),
    exclude_gotra: searchParams.getAll("exclude_gotra[]"),
  };

  const [filters, setFilters] = useState<any>(searchfilters);
  const [page, setPage] = useState(1);

  const { data, isLoading, error, } = useGetUsersQuery({ ...filters, page, limit: 10 });

  const userList = data?.data || [];
  const pagination = data?.pagination || {};

  const getUsers = (page: number) => {
    setPage(page);
  };


  const filterDataHandler = useCallback((query: GetUsersProps) => {
    setFilters({ ...query, action: "matches", page: 1, limit: 10 });
  }, [dispatch]);


  return (
    <PublicLayout
      headerSection={
        <div className={style.profilebanner} />
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
              loading={isLoading}
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
