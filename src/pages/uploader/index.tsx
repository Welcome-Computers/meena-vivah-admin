
import AdminLayout from "@/components/layout/AdminLayout";
import BiodataEdiableDrawer from "@/components/uploader/BiodataEdiableDrawer";
import BiodataPreviewTable from "@/components/uploader/BiodataPreviewTable";
import BiodataUploader from "@/components/uploader/BiodataUploader";
import { formatedEditableRecord } from "@/lib/utility/helper";
import { appMessage } from "@/lib/utility/message";
import { useCreateBulkImportedProfilesMutation, useDeleteImportedProfileMutation, useLazyGetImportedProfilesQuery, useMoveBulkImportedProfilesMutation, useUpdateBulkImportedProfilesMutation } from "@/redux/features/importedProfile/srevices";
import { EditableProfile } from "@/redux/features/importedProfile/types";
import { IPagination } from "@/redux/features/shared/types";

import { Button, Form, Modal, Space } from "antd";
import dayjs from "dayjs";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";



const Imports = () => {

  const [form] = Form.useForm();

  const [profiles, setProfiles] = useState<EditableProfile[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const [drawerWidth, setDrawerWidth] = useState<number>(900);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editNavigation, setEditNavigation] = useState<{
    current: any;
    previous: any | null;
    next: any | null;
  }>({
    current: null,
    previous: null,
    next: null,
  });

  const [fetchProfiles, { data, isLoading }] = useLazyGetImportedProfilesQuery();
  const [createImportedProfilesAction, { isLoading: isLoadingCreateUser }] = useCreateBulkImportedProfilesMutation();
  const [updateImportedProfilesAction, { isLoading: isLoadingUpdateUser }] = useUpdateBulkImportedProfilesMutation();
  const [moveImportedProfilesAction, { isLoading: isLoadingProfiles }] = useMoveBulkImportedProfilesMutation();
  const [deleteImportedProfile, { data: deletedData, isLoading: isLoadingDelete, }] = useDeleteImportedProfileMutation();

  const fetchDraftsProfilesHandler = useCallback(async () => {
    try {
      const response = await fetchProfiles({
        page: pagination.page,
        limit: pagination.limit,
      }).unwrap()

      if (response.success) {

        const updatedProfiles = response?.data?.map((el: any) => {
          const { dob, ...rest } = el || {};

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

  const handleEdit = useCallback((record: any, operation: boolean) => {
    if (operation && record) {
      const editableRecord = formatedEditableRecord(record);

      form.setFieldsValue(editableRecord);

      const currentIndex = profiles.findIndex(
        (item: any) => item.id === record.id
      );

      setEditNavigation({
        current: record,
        previous:
          currentIndex > 0
            ? profiles[currentIndex - 1]
            : null,
        next:
          currentIndex < profiles.length - 1
            ? profiles[currentIndex + 1]
            : null,
      });
    } else {
      form.resetFields();

      setEditNavigation({
        current: null,
        previous: null,
        next: null,
      });
    }

    setDrawerOpen(operation);
  }, [profiles]);

  const deleteProfile = useCallback((record: any, callingFrom: "table" | "form") => {
    const hasTempId = record?.temp_id;
    const hasId = record?.id;

    Modal.confirm({
      centered: true,
      title: "Delete biodata?",
      content: "Are you sure you want to remove this record?",
      okText: "Delete",
      okType: "danger",
      async onOk() {

        if (hasTempId) {
          setProfiles(prev =>
            prev.filter(
              x => String(x.temp_id) !== String(hasTempId)
            )
          );
        } else if (hasId) {

          const currentIndex = profiles.findIndex(
            (item: any) => item.id === record.id
          );

          const nextItem =
            currentIndex < profiles.length - 1
              ? profiles[currentIndex + 1]
              : null;


          const res = await deleteImportedProfile(hasId).unwrap();

          if (res.success) {

            appMessage.success(res.message || "Profile deleted successfully");
            await fetchDraftsProfilesHandler();

            if (callingFrom === "form" && nextItem) {
              handleEdit(nextItem, true);
            } else {
              setDrawerOpen(false)
            }

          }
        } else {
          appMessage.error("Profile Id or Temp Id not found");
        }
      },
    });
  },
    [
      profiles,
      deleteImportedProfile,
      fetchDraftsProfilesHandler,
      handleEdit,
      appMessage,
      setDrawerOpen
    ]
  );


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
          handleFromSubmit={handleFromSubmit}
          setPagination={setPagination}
          pagination={pagination}
          handleEdit={handleEdit}
          deleteProfile={deleteProfile}
        />
      </div>

      <BiodataEdiableDrawer
        form={form}
        handleEdit={handleEdit}
        drawerOpen={drawerOpen}
        // setProfiles={setProfiles}
        drawerWidth={drawerWidth}
        editNavigation={editNavigation}
        deleteProfile={deleteProfile}
        isLoadingDeleteProfile={isLoadingDelete}
      />

    </AdminLayout >
  );
};

export default Imports;