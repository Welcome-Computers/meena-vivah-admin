import ModalComp from "@/components/common/ModalComp";
import { firstComponentFocusHandler, removeEmptyObjects } from "@/lib/utility";
import { appMessage } from "@/lib/utility/message";
import { useCreateUserMutation, useGetSingleProfileByIdQuery } from "@/redux/features/profile";
import { Form } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import ProfileForm from "./_includes/ProfileForm";

const UpdateProfile = () => {
  const [form] = Form.useForm();
  const fromData = Form.useWatch(null, form)
  const formContainerRef = useRef<HTMLDivElement>(null);

  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPreviewOpen, setisPreviewOpen] = useState<boolean>(false);
  const [dataPreview, setDataPreview] = useState({});

  const router = useRouter()

  const { id, action } = router.query;

  // console.log(id);      // "43"
  // console.log(action);  // "update"

  // const [trigger, { data: searchByMobileData, isLoading: isLoadingByMobile }] = useLazyGetProfilesByMobileQuery();

  // const handleOnBlurMobile = useCallback(
  //   async (
  //     e: React.FocusEvent<HTMLInputElement>
  //   ) => {
  //     try {
  //       const mobile = e.target.value.trim();

  //       if (mobile.length !== 10) {
  //         return;
  //       }

  //       const result = await trigger(mobile).unwrap();

  //       if (result?.success && !!result?.items?.length) {

  //         setIsModalOpen(true)
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   },
  //   [trigger, setIsModalOpen]
  // );


  const {
    data,
    isLoading,
    // isSuccess,
    // isError,
    // error,
  } = useGetSingleProfileByIdQuery(
    id, {
    refetchOnMountOrArgChange: true,
    skip: !id
  });

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

  const handlePreviewButton = () => {
    const previewData = form.getFieldsValue();
    setDataPreview(previewData);
    setisPreviewOpen(true);
  };

  const hanldeClosePreview = () => {
    setisPreviewOpen(false);
  };

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
        formContainerRef={formContainerRef}
        handleFromSubmit={handleFromSubmit}
        // handleOnBlurMobile={handleOnBlurMobile}
        handlePreviewButton={handlePreviewButton}
        isLoadingCreateUser={isLoadingCreateUser}
        callingFrom={'update'}
      />

      <ModalComp
        title={"Preview Biodata"}
        isOpen={isPreviewOpen}
        data={dataPreview}
        hanldeClose={hanldeClosePreview}
      />

    </AdminLayout>
  );
};

export default UpdateProfile;
