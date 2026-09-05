import PublicLayout from "@/components/layout/PublicLayout";
import ProfileContainer from "@/components/profile/ProfileContainer";
import { ProfileFilter } from "@/components/profile/ProfileFilter";
import { GetMatchedProfilesProps, GetProfilesProps } from "@/lib/modules/profile/profile.types";
import { useGetProfilesQuery } from "@/redux/features/profile/srevices";
import { useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import style from "./Profile.module.css";

const MatchedProfilePage = () => {
  const searchParams = useSearchParams();

  const initialFilters = useMemo<GetMatchedProfilesProps>(() => {
    const ageValues = searchParams
      .getAll("preferredAge[]")
      .map(Number);

    return {
      action: "matches",
      looking_for:
        searchParams.get("looking_for") || undefined,

      preferredAge:
        ageValues.length === 2
          ? [ageValues[0], ageValues[1]]
          : undefined,

      req_occupation: searchParams.getAll("req_occupation[]"),

      exclude_gotra: searchParams.getAll("exclude_gotra[]"),
    };
  }, [searchParams]);

  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState<GetMatchedProfilesProps>(initialFilters);

  /**
   * Sync URL filters when URL changes
   */
  useEffect(() => {
    setFilters(initialFilters);
    setPage(1);
  }, [initialFilters]);

  const { data, isFetching } =
    useGetProfilesQuery(
      {
        ...filters,
        page,
        limit: 10,
      },
      {
        refetchOnMountOrArgChange: true,
      }
    );

  const userList = data?.data || [];
  const pagination = data?.pagination || {};

  const getProfiles = useCallback(
    (newPage: number) => {
      setPage(newPage);
    },
    []
  );

  const filterDataHandler = useCallback(
    (query: GetProfilesProps) => {
      setPage(1);

      setFilters({ ...query, action: "matches", });
    }, []);

  return (
    <PublicLayout
      headerSection={
        <div className={style.profilebanner} />
      }
    >
      <section className={style.profiles}>
        <div className={style.gridItem}>
          <ProfileFilter
            callingFrom="profilePage"
            filterDataHandler={filterDataHandler}
            initialFilters={initialFilters}
          />

          <ProfileContainer
            loading={isFetching}
            data={userList}
            pagination={pagination}
            getProfiles={getProfiles}
          />
        </div>
      </section>
    </PublicLayout>
  );
};

export default MatchedProfilePage;