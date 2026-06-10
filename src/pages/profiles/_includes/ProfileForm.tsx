import AddressDetails from "@/components/formComponents/AddressDetails";
import FamilyDetails from "@/components/formComponents/FamilyDetails";
import GotraDetials from "@/components/formComponents/GotraDetails";
import MobileDetails from "@/components/formComponents/MobileDetails";
import OtherDetails from "@/components/formComponents/OtherDetails";
import PersonalDetails from "@/components/formComponents/PersonalDetails";
import SiblingDetails from "@/components/formComponents/SiblingDetails";
import { SelectOption } from "@/components/InputElements/SearchableSelectField";
import { firstComponentFocusHandler, handleEnterNavigation } from "@/lib/utility";
import { appMessage } from "@/lib/utility/message";
import { useCreateOccupationMutation, useGetOccupationsQuery } from "@/redux/features/masterOccupation/services";
import { Button, Col, Form, FormInstance, Row } from "antd";
import { RefObject, useEffect } from "react";


interface iProps {
  form: FormInstance,
  handleFromSubmit: any,
  handleOnBlurMobile?: any,
  handlePreviewButton: any,
  isLoadingCreateUser: any,
  formContainerRef: RefObject<HTMLDivElement | null>
  callingFrom: 'create' | "update"
}

const ProfileForm = (props: iProps) => {
  const {
    form,
    handleFromSubmit,
    handleOnBlurMobile,
    handlePreviewButton,
    isLoadingCreateUser,
    formContainerRef,
    callingFrom
  } = props || {}

  const { data: occupatonList, isLoading: isOccupationLoading, refetch } = useGetOccupationsQuery({});

  const occupatonOptions = occupatonList?.map((item: any) => ({
    label: item.name,
    value: item.code,
  })) || [];

  const [createOccupation] = useCreateOccupationMutation()

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

  useEffect(() => {
    firstComponentFocusHandler(formContainerRef)
  }, [formContainerRef]);

  return (
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
          // other_mobile: [{}],
          other_gotra: [{}],
          address_details: [{ type: "common" }],
        }}
      >
        <Row gutter={[40, 40]}>
          <Col xs={24} md={12}>
            <PersonalDetails
              occupatonOptions={occupatonOptions}
              handleOnBlurMobile={handleOnBlurMobile ? handleOnBlurMobile : null}
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
  )
}

export default ProfileForm