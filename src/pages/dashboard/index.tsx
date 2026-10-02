import TopStatics from "@/components/dashboard/TopStatics";
import AdminLayout from "@/components/layout/AdminLayout";
import ProfileContainer from "@/components/profile/ProfileContainer";
import { useAuth } from "@/hook/useAuth";
import { GetMatchedProfilesProps } from "@/lib/modules/profile/profile.types";
import { getAgePreference } from "@/lib/utility/helper";
import { setProfileFilterValues } from "@/redux/features/profile";
import { useGetPrivateProfilesQuery, useGetProfilesQuery } from "@/redux/features/profile/srevices";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Row } from "antd";
import { useEffect, useRef, useState } from "react";

const Dashboard = () => {
  const status = {
    totalMembers: 120,
    boys: 70,
    girls: 50,
    matched: 18,
  };
  const dispatch = useAppDispatch() as any;
  const { userRole } = useAuth();

  const { profile_filter_values } = useAppSelector((state: any) => (state.profile));

  const [page, setPage] = useState(1);
  const LIMIT = 10

  const params = {
    page,
    ...(userRole === "admin" ? { limit: LIMIT } : {}),
    role: userRole ?? undefined,
  }

  const { data, isFetching, error, isSuccess } = useGetPrivateProfilesQuery(
    params,
    {
      refetchOnMountOrArgChange: true,
      skip: !userRole
    });

  const getProfiles = (page: number) => {
    setPage(page);
  };


  // MATCHED PROFILES FILTER HANDLER
  const userList = data?.data ?? [];
  const pagination = data?.pagination ?? {};

  const hasInitializedFilters = useRef(false);

  useEffect(() => {
    if (
      !isSuccess ||
      userList.length === 0 ||
      hasInitializedFilters.current
    ) {
      return;
    }

    const profile = userList[0];

    const filters: GetMatchedProfilesProps = {
      action: "matches",
      looking_for: profile.gender,
      preferredAge: getAgePreference({
        dob: profile.dob,
        gender: profile.gender,
      }),
      req_occupation: [],
      exclude_gotra: [
        profile.gm_gotra,
        profile.m_gotra,
        profile.self_gotra,
      ].filter(
        (value) => value !== undefined && value !== null && value !== ""
      ),
    };

    hasInitializedFilters.current = true;

    dispatch(setProfileFilterValues(filters));
  }, [isSuccess, userList, dispatch]);

  const { data: dataMatched, isFetching: isFetchingMatched } = useGetProfilesQuery(
    {
      ...profile_filter_values,
      action: "matches",
      page,
      limit: 10,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !userRole || !isSuccess
    }
  );


  return (
    <AdminLayout
      title="Dashboard">
      <div>
        {/* ================= STATUS ================= */}
        <Row gutter={[16, 16]}>
          <TopStatics status={status} />
        </Row>

        {userRole === "admin" ?
          <>
            {/* ================= TABLE 1 ================= */}
            <div>
              <ProfileContainer
                defaultShow="table"
                loading={isFetching}
                title={'Newly Registrations'}
                data={userList || []}
                // pagination={pagination}
                showAction={true}
                getProfiles={getProfiles} />
            </div>

          </> : null}

        {userRole === "profile" ?
          <>
            {/* ================= TABLE 1 ================= */}
            <div>
              <ProfileContainer
                defaultShow="table"
                loading={isFetching}
                title={'Your Posted Profiles'}
                data={userList || []}
                // pagination={pagination}
                showAction={true}
                getProfiles={getProfiles} />


              <ProfileContainer
                defaultShow="table"
                loading={isFetchingMatched}
                title={'Your matched profiles'}
                data={dataMatched?.data || []}
                // pagination={pagination}
                showAction={true}
                getProfiles={getProfiles} />
            </div>
          </> : null}

      </div>
    </AdminLayout>
  );
};

export default Dashboard;