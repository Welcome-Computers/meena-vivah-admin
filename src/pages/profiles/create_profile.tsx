import { firstComponentFocusHandler, formattedDob, removeEmptyObjects } from "@/lib/utility/helper";
import { appMessage } from "@/lib/utility/message";
import { useCreateUserMutation } from "@/redux/features/profile/srevices";
import { Form } from "antd";
import { useRef } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import ProfileForm from "./_includes/ProfileForm";

const breadcrumbObj = [
  {
    title: "Dashboard",
  },
  {
    title: "All Profile",
  },
  {
    title: "Create Profile",
  },
]

const CreateProfile = () => {
  const [form] = Form.useForm();
  const fromData = Form.useWatch(null, form)
  const formContainerRef = useRef<HTMLDivElement>(null);

  const [createUserAction, { isLoading: isLoadingCreateUser, isSuccess, isError, error }] = useCreateUserMutation();

  const handleFromSubmit = async () => {

    const { need_duplicate, dob, ...rest } = form.getFieldsValue();

    const formattedDobValue = formattedDob(dob);
    debugger;
    const formData = {
      ...rest,
      dob: formattedDobValue,

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

        if (need_duplicate) {
          form.resetFields();
          firstComponentFocusHandler(formContainerRef);
        }

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
      breadcrumbItems={breadcrumbObj}
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
