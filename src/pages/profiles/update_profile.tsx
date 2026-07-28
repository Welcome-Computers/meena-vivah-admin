import { useAuth } from "@/hook/useAuth";
import { firstComponentFocusHandler, removeEmptyObjects } from "@/lib/utility/helper";
import { appMessage } from "@/lib/utility/message";
import { useGetSingleProfileByIdQuery, useUpdateUserMutation } from "@/redux/features/profile/srevices";
import { Form } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import ProfileForm from "./_includes/ProfileForm";

const UpdateProfile = () => {
  const [form] = Form.useForm();
  // const fromData = Form.useWatch(null, form)
  const formContainerRef = useRef<HTMLDivElement>(null);

  const { userName, profilePick, userRole, status } = useAuth();

  const router = useRouter()

  const { id, action } = router.query;

  const {
    data,
    isFetching,
    // isSuccess,
    // isError,
    // error,
  } = useGetSingleProfileByIdQuery(
    id, {
    refetchOnMountOrArgChange: true,
    skip: !id
  });

  const [updateUserAction, { isLoading: isLoadingCreateUser, isSuccess, isError, error }] = useUpdateUserMutation();

  const handleFromSubmit = useCallback(async () => {

    const { dob, ...rest } = form.getFieldsValue();

    const formattedDob = dob
      ? dayjs(
        new Date(dob.year, dob.month, dob.day)
      ).format("YYYY-MM-DD")
      : null;

    const formData = {
      id,
      ...rest,
      dob: formattedDob,

      other_gotra: removeEmptyObjects(rest.other_gotra),
      other_mobile: removeEmptyObjects(rest.other_mobile),
      address_details: removeEmptyObjects(rest.address_details),
    };

    // console.log("form data", formData);

    // return;

    try {
      const res = await updateUserAction(formData).unwrap();

      if (res.success) {
        appMessage.success("Profile updated successfully");
        form.resetFields();
        firstComponentFocusHandler(formContainerRef);

        if (action === "update") {
          router.back();
        }

      } else {
        appMessage.error(
          res.message || "Profile not updated"
        );
      }
    } catch (error: any) {

      appMessage.error(
        error?.data?.message ||
        error?.response?.data?.message ||
        "Something went wrong"
      );
    }
  }, [id]);


  useEffect(() => {

    if (data?.data) {
      const { dob, ...rest } = data?.data || {}

      const dobObject = {
        day: dayjs(dob).date(),
        month: dayjs(dob).month(), // 0-based (Jan=0, Apr=3)
        year: dayjs(dob).year(),
      };

      const updateData = { ...rest, dob: dobObject }

      form.setFieldsValue(updateData)
    }

  }, [data, form])

  return (
    <AdminLayout>
      {/* Main form components */}

      <ProfileForm
        form={form}
        orignalData={data?.data}
        userRole={userRole}
        formContainerRef={formContainerRef}
        handleFromSubmit={handleFromSubmit}
        isLoadingCreateUser={isLoadingCreateUser}
        callingFrom={'update'}
        isFetching={isFetching}
      />

    </AdminLayout>
  );
};

export default UpdateProfile;
