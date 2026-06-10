import ModalComp from "@/components/common/ModalComp";
import AddressDetails from "@/components/formComponents/AddressDetails";
import FamilyDetails from "@/components/formComponents/FamilyDetails";
import GotraDetials from "@/components/formComponents/GotraDetails";
import MobileDetails from "@/components/formComponents/MobileDetails";
import OtherDetails from "@/components/formComponents/OtherDetails";
import PersonalDetails from "@/components/formComponents/PersonalDetails";
import SiblingDetails from "@/components/formComponents/SiblingDetails";
import { SelectOption } from "@/components/InputElements/SearchableSelectField";
import { firstComponentFocusHandler, handleEnterNavigation, removeEmptyObjects } from "@/lib/utility";
import { appMessage } from "@/lib/utility/message";
import { useCreateOccupationMutation, useGetOccupationsQuery } from "@/redux/features/masterOccupation/services";
import { useCreateUserMutation } from "@/redux/features/users/services";
import { Button, Col, Form, Row } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";

const CreateProfile = () => {
  const [form] = Form.useForm();
  const fromData = Form.useWatch(null, form)

  const formContainerRef = useRef<HTMLDivElement>(null);


  const [isPreviewOpen, setisPreviewOpen] = useState<boolean>(false);
  const [dataPreview, setDataPreview] = useState({});

  const { data: occupatonList, isLoading: isOccupationLoading, refetch } = useGetOccupationsQuery({});

  const occupatonOptions = occupatonList?.map((item: any) => ({
    label: item.name,
    value: item.code,
  })) || [];


  const [createOccupation] = useCreateOccupationMutation()

  const [createUserAction, {
    isLoading: isLoadingCreateUser,
    isSuccess,
    isError,
    error,
  },
  ] = useCreateUserMutation();


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
    firstComponentFocusHandler(formContainerRef)
  }, [formContainerRef]);


  const handleCreateOccupation = async (value: string): Promise<SelectOption | void> => {
    try {

      const res = await createOccupation({ name: value, }).unwrap();

      if (res?.success) {
        appMessage.success(
          "Gotra added successfully"
        );

        await refetch();
        return {
          label: res?.data?.[0]?.name,
          value: res?.data?.[0]?.code,
        };

      }
    } catch (error: any) {
      appMessage.error(
        error?.data?.message ||
        "Failed to add gotra"
      );
    }
  };


  return (
    <AdminLayout>
      {/* Main form components */}
      <div ref={formContainerRef}>
        <Form
          layout="horizontal"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          labelAlign="left"
          form={form}
          onKeyDown={handleEnterNavigation}
          onFinish={handleFromSubmit}
          initialValues={{
            sibling_details: [{}],
            other_mobile: [{}],
            other_gotra: [{}],
            address_details: [{}],
          }}
        >
          <Row gutter={[40, 40]}>
            <Col xs={24} md={12}>
              <PersonalDetails
                occupatonOptions={occupatonOptions}
                isOccupationLoading={isOccupationLoading}
                handleCreateOccupation={handleCreateOccupation}
                form={form} />
              <FamilyDetails
                occupatonOptions={occupatonOptions}
                isOccupationLoading={isOccupationLoading}
                handleCreateOccupation={handleCreateOccupation}
                form={form} />
              <SiblingDetails
                occupatonOptions={occupatonOptions}
                isOccupationLoading={isOccupationLoading}
                handleCreateOccupation={handleCreateOccupation}
                form={form} />
            </Col>

            <Col xs={24} md={12}>
              <GotraDetials form={form} />
              <AddressDetails form={form} />
              <MobileDetails form={form} />
              <OtherDetails />
            </Col>
          </Row>

          {/* AT LAST IN RIGHT BOTTOM */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
            marginTop: "20px"
          }}
          >

            <Button
              tabIndex={-1}
              type="primary"
              onClick={handlePreviewButton}>
              Preview
            </Button>

            <Button
              loading={isLoadingCreateUser}
              iconPlacement="end"
              type="primary"
              htmlType="submit">
              Confrom
            </Button>

          </div>

        </Form>
      </div>
      <ModalComp
        title={"Preview Biodata"}
        isOpen={isPreviewOpen}
        data={dataPreview}
        hanldeClose={hanldeClosePreview}
      />

    </AdminLayout>
  );
};

export default CreateProfile;
