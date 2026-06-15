import ModalComp from "@/components/common/ModalComp";
import AddressDetails from "@/components/formComponents/AddressDetails";
import FamilyDetails from "@/components/formComponents/FamilyDetails";
import GotraDetials from "@/components/formComponents/GotraDetails";
import MobileDetails from "@/components/formComponents/MobileDetails";
import OtherDetails from "@/components/formComponents/OtherDetails";
import PersonalDetails from "@/components/formComponents/PersonalDetails";
import SiblingDetails from "@/components/formComponents/SiblingDetails";
import { SelectOption } from "@/components/InputElements/SearchableSelectField";
import ModalByMobile from "@/components/profile/ModalByMobile";
import ProfileFormSkeleton from "@/components/Skeleton/ProfileFormSkeleton";
import { firstComponentFocusHandler, handleEnterNavigation } from "@/lib/utility";
import { appMessage } from "@/lib/utility/message";
import { useCreateOccupationMutation, useGetOccupationsQuery } from "@/redux/features/masterOccupation";
import { useLazyGetProfilesByMobileQuery } from "@/redux/features/profile";
import { Button, Col, Form, FormInstance, Row } from "antd";
import { RefObject, useCallback, useEffect, useState } from "react";


interface iProps {
  form: FormInstance,
  handleFromSubmit: any,
  isLoadingCreateUser: any,
  formContainerRef: RefObject<HTMLDivElement | null>
  callingFrom: 'create' | "update"
  isFetching?: boolean,
}

const ProfileForm = (props: iProps) => {
  const {
    form,
    handleFromSubmit,
    isLoadingCreateUser,
    formContainerRef,
    isFetching,
    callingFrom
  } = props || {}

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPreviewOpen, setisPreviewOpen] = useState<boolean>(false);
  const [dataPreview, setDataPreview] = useState({});

  const { data: occupatonList, isFetching: isOccupationLoading, refetch } = useGetOccupationsQuery({});

  const occupatonOptions = occupatonList?.map((item: any) => ({
    label: item.name,
    value: item.code,
  })) || [];

  const [createOccupation] = useCreateOccupationMutation()

  const [trigger, { data: searchByMobileData, isFetching: isLoadingByMobile }] = useLazyGetProfilesByMobileQuery();

  const handleOnBlurMobile = useCallback(
    async (
      e: React.FocusEvent<HTMLInputElement>
    ) => {
      try {
        const mobile = e.target.value.trim();

        if (mobile.length !== 10) {
          return;
        }

        const result = await trigger(mobile).unwrap();

        if (result?.success && !!result?.items?.length) {

          setIsModalOpen(true)
        }
      } catch (error) {
        console.error(error);
      }
    },
    [trigger, setIsModalOpen]
  );

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


  const handlePreviewButton = () => {
    const previewData = form.getFieldsValue();
    setDataPreview(previewData);
    setisPreviewOpen(true);
  };

  const hanldeClosePreview = () => {
    setisPreviewOpen(false);
  };

  return (
    <div ref={formContainerRef}>
      {isFetching ?
        <ProfileFormSkeleton />
        :
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
                handleOnBlurMobile={handleOnBlurMobile}
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

        </Form>}

      <ModalByMobile
        title="Profile Found"
        isOpen={isModalOpen}
        data={searchByMobileData?.items || []}
        hanldeClose={() => setIsModalOpen(false)}
      />

      <ModalComp
        title={"Preview Biodata"}
        isOpen={isPreviewOpen}
        data={dataPreview}
        hanldeClose={hanldeClosePreview}
      />

    </div>
  )
}

export default ProfileForm