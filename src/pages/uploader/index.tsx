
import AdminLayout from "@/components/layout/AdminLayout";
import BiodataPreviewTable from "@/components/uploader/BiodataPreviewTable";
import BiodataUploader from "@/components/uploader/BiodataUploader";

import { ParsedProfile } from "@/redux/types";
import { Button, Space } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";



const Imports = () => {

  const [page, setPage] = useState(1);

  const router = useRouter();

  const [profiles, setProfiles] = useState<ParsedProfile[]>([]);


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
          <BiodataUploader onParsed={setProfiles} />
        </Space >
      </div>
      }
    >
      <div>
        <BiodataPreviewTable
          profiles={profiles}
        />
      </div>
    </AdminLayout >
  );
};

export default Imports;