
import AdminLayout from "@/components/layout/AdminLayout";
import BiodataPreviewTable from "@/components/uploader/BiodataPreviewTable";
import BiodataUploader from "@/components/uploader/BiodataUploader";
import { appMessage } from "@/lib/utility/message";
import { useCreateBulkImportedProfilesMutation, useLazyGetImportedProfilesQuery, useMoveBulkImportedProfilesMutation, useUpdateBulkImportedProfilesMutation } from "@/redux/features/importedProfile/srevices";
import { EditableProfile, PaginationState } from "@/redux/types";

import { Button, Space } from "antd";
import dayjs from "dayjs";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";



const Imports = () => {

  const [profiles, setProfiles] = useState<EditableProfile[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const [drawerWidth, setDrawerWidth] = useState<number>(900);


  const [fetchProfiles, { data, isLoading }] = useLazyGetImportedProfilesQuery();
  const [createImportedProfilesAction, { isLoading: isLoadingCreateUser }] = useCreateBulkImportedProfilesMutation();
  const [updateImportedProfilesAction, { isLoading: isLoadingUpdateUser }] = useUpdateBulkImportedProfilesMutation();
  const [moveImportedProfilesAction, { isLoading: isLoadingProfiles }] = useMoveBulkImportedProfilesMutation();

  // console.log(data)

  const fetchDraftsProfilesHandler = useCallback(async () => {
    try {
      const response = await fetchProfiles({
        page: pagination.page,
        limit: pagination.limit,
      }).unwrap()

      if (response.success) {

        const updatedProfiles = response?.data?.map((el: any) => {
          const { dob, ...rest } = el || {};

          // const dobValue = dob
          //   ? {
          //     year: dayjs(dob).year(),
          //     month: dayjs(dob).month() + 1, // dayjs month is 0-11
          //     day: dayjs(dob).date(),
          //   }
          //   : null;

          return {
            ...rest,
            dob,
          };
        });

        setProfiles(updatedProfiles)
      }
    } catch (error) {

    }
  }, [pagination, setProfiles])

  useEffect(() => {
    fetchDraftsProfilesHandler()
  }, [fetchDraftsProfilesHandler])

  const handleFromSubmit = useCallback(async (type: "permanent" | "draft") => {
    try {
      let res = null;

      if (type === "permanent") {

        const profileIds = profiles
          .map((p) => p.id)
          .filter((id): id is number => id !== undefined);

        res = await moveImportedProfilesAction(profileIds).unwrap();

      } else {

        const updatedProfiles = profiles.map((pData) => {
          const { dob, ...rest } = pData || {};
          const formattedDob = dob
            ? dayjs(dob, 'YYYY, MM, DD').format("YYYY-MM-DD")
            : undefined;

          const formData = {
            ...rest,
            dob: formattedDob,
          };
          return formData;
        })

        const hasImportedIds = updatedProfiles.some((el) => !el.id);

        if (hasImportedIds) {
          const profilesWithIds = updatedProfiles.filter(
            (p): p is typeof p & { id: number } => p.id !== undefined
          );
          res = await updateImportedProfilesAction(profilesWithIds).unwrap();
        } else {
          res = await createImportedProfilesAction(updatedProfiles).unwrap();
        }

      }

      if (res.success) {
        appMessage.success("Profiles created successfully");
      } else {

        const updatedProfiles = profiles.map((profile) => {
          const failedProfile = res.errors.find(
            (e: any) => e.id === profile.id
          );

          return {
            ...profile,
            errors: failedProfile?.error ?? [],
          };
        });

        setProfiles(updatedProfiles);

        appMessage.error(
          res.message || "Profiles not created"
        );
      }
    } catch (error: any) {
      appMessage.error(
        error?.data?.message ||
        error?.response?.data?.message ||
        "Something went wrong"
      );
    }
  }, [profiles]);

  useEffect(() => {
    if (data?.pagination) {
      setPagination(prev => ({
        ...prev,
        page: data.pagination.page,
        limit: data.pagination.limit,
        total: data.pagination.total,
        totalPages: data.pagination.totalPages,
      }));
    }
  }, [data]);

  useLayoutEffect(() => {
    if (containerRef.current) {
      setDrawerWidth(containerRef.current.offsetWidth);
    }
  }, [containerRef]);

  return (
    <AdminLayout
      breadcrumbItems={[{ title: "Dashboard", }, { title: "All Imports" }]}

      headerRightSec={<div>
        <Space orientation="horizontal">
          <Button type="primary" onClick={fetchDraftsProfilesHandler}>Get Draft Data</Button>
          <Button danger onClick={() => setProfiles([])}>Clear</Button>
          <h3>Telegram Biodata Import</h3>
          <BiodataUploader onParsed={setProfiles} />
        </Space >
      </div>
      }
    >
      <div ref={containerRef}>
        <BiodataPreviewTable
          profiles={profiles}
          setProfiles={setProfiles}
          handleFromSubmit={handleFromSubmit}
          refetchProfiles={fetchDraftsProfilesHandler}
          setPagination={setPagination}
          pagination={pagination}
          drawerWidth={drawerWidth}
        />
      </div>
    </AdminLayout >
  );
};

export default Imports;