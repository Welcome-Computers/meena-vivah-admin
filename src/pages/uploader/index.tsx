
import AdminLayout from "@/components/layout/AdminLayout";
import BiodataPreviewTable from "@/components/uploader/BiodataPreviewTable";
import BiodataUploader from "@/components/uploader/BiodataUploader";
import { appMessage } from "@/lib/utility/message";
import { useCreateBulkImportedProfilesMutation } from "@/redux/features/importedProfile/srevices";

import { ParsedProfile } from "@/redux/types";
import { Button, Form, Space } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";



const Imports = () => {

  const [page, setPage] = useState(1);

  const [form] = Form.useForm()

  const router = useRouter();

  const [profiles, setProfiles] = useState<ParsedProfile[]>([]);



  const [createImportedProfilesAction, { isLoading: isLoadingCreateUser }] = useCreateBulkImportedProfilesMutation();

  const handleFromSubmit = async () => {

    const { dob, ...rest } = form.getFieldsValue();

    const formattedDob = dob
      ? dayjs(
        new Date(dob.year, dob.month, dob.day)
      ).format("YYYY-MM-DD")
      : null;

    const formData = {
      ...rest,
      dob: formattedDob,
    };

    console.log("form data", formData);
    return;
    try {
      const res = await createImportedProfilesAction(formData).unwrap();

      if (res.success) {
        appMessage.success("Profile created successfully");
      } else {
        appMessage.error(
          res.message || "Profile not created"
        );
      }
    } catch (error: any) {
      appMessage.error(
        error?.data?.message ||
        error?.response?.data?.message ||
        "Something went wrong"
      );
    }
  };




  return (
    <AdminLayout
      breadcrumbItems={[
        {
          title: "Dashboard",
        },
        {
          title: "All Imports",
        },
      ]}

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
          handleFromSubmit={handleFromSubmit}

        />
      </div>
    </AdminLayout >
  );
};

export default Imports;