import { firstComponentFocusHandler, removeEmptyObjects } from "@/lib/utility";
import { appMessage } from "@/lib/utility/message";
import { useCreateUserMutation } from "@/redux/features/profile";
import { Form } from "antd";
import dayjs from "dayjs";
import { useRef } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import ProfileForm from "./_includes/ProfileForm";

const CreateProfile = () => {
  const [form] = Form.useForm();
  const fromData = Form.useWatch(null, form)
  const formContainerRef = useRef<HTMLDivElement>(null);

  const [createUserAction, { isLoading: isLoadingCreateUser, isSuccess, isError, error }] = useCreateUserMutation();

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

      sibling_details: removeEmptyObjects(rest.sibling_details),
      other_gotra: removeEmptyObjects(rest.other_gotra),
      other_mobile: removeEmptyObjects(rest.other_mobile),
      address_details: removeEmptyObjects(rest.address_details),
    };

    // console.log("form data", formData);
    // return;

    try {
      const res = await createUserAction(formData).unwrap();

      if (res.success) {
        appMessage.success("Profile created successfully");
        form.resetFields();
        firstComponentFocusHandler(formContainerRef);

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
          title: "All Profile",
        },
        {
          title: "Create Profile",
        },
      ]}
    >
      {/* Main form components */}

      <ProfileForm
        form={form}
        formContainerRef={formContainerRef}
        handleFromSubmit={handleFromSubmit}
        isLoadingCreateUser={isLoadingCreateUser}
        callingFrom={'create'}
      />


    </AdminLayout>
  );
};

export default CreateProfile;
