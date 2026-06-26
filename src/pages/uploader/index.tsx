
import AdminLayout from "@/components/layout/AdminLayout";
import BiodataPreviewTable from "@/components/uploader/BiodataPreviewTable";
import BiodataUploader from "@/components/uploader/BiodataUploader";
import { appMessage } from "@/lib/utility/message";
import { useCreateBulkImportedProfilesMutation, useLazyGetImportedProfilesQuery, useMoveBulkImportedProfilesMutation } from "@/redux/features/importedProfile/srevices";

import { ParsedProfile } from "@/redux/types";
import { Button, Space } from "antd";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";



const Imports = () => {

  const [page, setPage] = useState(1);
  const [limit, setlimit] = useState(10);

  const [profiles, setProfiles] = useState<ParsedProfile[]>([]);

  const [fetchProfiles, { data, isLoading }] = useLazyGetImportedProfilesQuery();
  const [createImportedProfilesAction, { isLoading: isLoadingCreateUser }] = useCreateBulkImportedProfilesMutation();
  const [moveImportedProfilesAction, { isLoading: isLoadingProfiles }] = useMoveBulkImportedProfilesMutation();

  const fetchDraftsProfilesHandler = useCallback(async () => {
    try {
      const responce = await fetchProfiles({ page, limit }).unwrap()
      if (responce.success) {
        setProfiles(responce.data)
      }
    } catch (error) {

    }
  }, [page, limit, setProfiles])

  useEffect(() => {
    fetchDraftsProfilesHandler()
  }, [fetchDraftsProfilesHandler])


  const handleFromSubmit = useCallback(async (type: "permanent" | "draft") => {
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

    // console.log(updatedProfiles)
    // return;

    try {
      let res = null;
      if (type === "permanent") {
        res = await moveImportedProfilesAction(updatedProfiles).unwrap();
      } else {
        res = await createImportedProfilesAction(updatedProfiles).unwrap();
      }

      if (res.success) {
        appMessage.success("Profiles created successfully");
      } else {
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


  return (
    <AdminLayout
      breadcrumbItems={[{ title: "Dashboard", }, { title: "All Imports" }]}

      headerRightSec={<div>
        <Space orientation="horizontal">
          <Button danger onClick={() => setProfiles([])}>Clear</Button>
          <h3>Telegram Biodata Import</h3>
          <BiodataUploader
            onParsed={setProfiles} />
        </Space >
      </div>
      }
    >
      <div>
        <BiodataPreviewTable
          profiles={profiles}
          setProfiles={setProfiles}
          handleFromSubmit={handleFromSubmit}
        />
      </div>
    </AdminLayout >
  );
};

export default Imports;