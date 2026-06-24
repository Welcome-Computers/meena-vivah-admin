
import AdminLayout from "@/components/layout/AdminLayout";
import BiodataPreviewTable from "@/components/uploader/BiodataPreviewTable";
import BiodataUploader from "@/components/uploader/BiodataUploader";
import { removeEmptyObjects } from "@/lib/utility";
import { appMessage } from "@/lib/utility/message";
import { useCreateUserMutation } from "@/redux/features/profile/srevices";

import { ParsedProfile } from "@/redux/types";
import { Button, Space } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";



const Multi_Update = () => {

  const [page, setPage] = useState(1);

  const router = useRouter();
  const [createUserAction, { isLoading: isLoadingSingle }] = useCreateUserMutation();

  const [profiles, setProfiles] = useState<ParsedProfile[]>([]);


  console.log(profiles)

  const handleFromSubmit = useCallback(async (values: any) => {

    try {

      let payload;

      if (Array.isArray(values)) {

        // BULK
        payload = values.map((item: any) => {

          const {
            need_duplicate,
            dob,
            ...rest
          } = item;


          return {
            ...rest,

            dob: dob
              ? dayjs(
                new Date(
                  dob.year,
                  dob.month,
                  dob.day
                )
              ).format("YYYY-MM-DD")
              : null,

            other_gotra:
              removeEmptyObjects(rest.other_gotra),

            other_mobile:
              removeEmptyObjects(rest.other_mobile),

            address_details:
              removeEmptyObjects(rest.address_details),
          };

        });


      } else {

        // SINGLE

        const { need_duplicate, dob, ...rest } = values;

        payload = {
          ...rest,

          dob: dob
            ? dayjs(
              new Date(
                dob.year,
                dob.month,
                dob.day
              )
            ).format("YYYY-MM-DD")
            : null,


          other_gotra: removeEmptyObjects(rest.other_gotra),
          other_mobile: removeEmptyObjects(rest.other_mobile),
          address_details: removeEmptyObjects(rest.address_details),
        };

      }

      const res =
        await createUserAction({

          action: Array.isArray(values)
            ? "bulkCreate"
            : undefined,

          data: payload,
        }).unwrap();

      if (res.success) {
        appMessage.success(Array.isArray(values) ? "Profiles uploaded successfully" : "Profile created uccessfully");
      }

    } catch (error: any) {
      appMessage.error(error?.data?.message || "Something went wrong");
    }

  }, [profiles]);

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

export default Multi_Update;