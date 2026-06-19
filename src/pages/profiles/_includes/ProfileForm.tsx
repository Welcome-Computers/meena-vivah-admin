import ModalPreviewProfile from "@/components/common/ModalPreviewProfile";
import AddressDetails from "@/components/formComponents/AddressDetails";
import FamilyDetails from "@/components/formComponents/FamilyDetails";
import GotraDetials from "@/components/formComponents/GotraDetails";
import MobileDetails from "@/components/formComponents/MobileDetails";
import OtherDetails from "@/components/formComponents/OtherDetails";
import PersonalDetails from "@/components/formComponents/PersonalDetails";
import { SelectOption } from "@/components/InputElements/SearchableSelectField";
import ModalByMobile from "@/components/profile/ModalByMobile";
import ProfileFormSkeleton from "@/components/Skeleton/ProfileFormSkeleton";
import { firstComponentFocusHandler, handleEnterNavigation } from "@/lib/utility";
import { appMessage } from "@/lib/utility/message";
import { useCreateOccupationMutation, useGetOccupationsQuery } from "@/redux/features/masterOccupation";
import { useLazyGetProfilesByMobileQuery } from "@/redux/features/profile/srevices";
import { Button, Col, Form, FormInstance, Row, Space, Switch } from "antd";
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
            is_married: 0,
            gender: "boy",
            sibling_details: [{ relation: "sister", sibling_order: 'younger', is_married: 0 }],
            other_gotra: [{}],
            address_details: [{ type: "parmanent" }],
          }}
        >
          <Row gutter={40}>
            <Col md={10} lg={10} xl={10}>
              <div className="editor-sticky">
                <OtherDetails />
              </div>
            </Col>
            <Col md={14} lg={14} xl={14}>
              <div className="form-scroll-section">
                <PersonalDetails
                  occupatonOptions={occupatonOptions}
                  handleOnBlurMobile={handleOnBlurMobile}
                  isOccupationLoading={isOccupationLoading}
                  handleCreateOccupation={handleCreateOccupation}
                  form={form} />
                <GotraDetials form={form} />
                <FamilyDetails
                  occupatonOptions={occupatonOptions}
                  isOccupationLoading={isOccupationLoading}
                  handleCreateOccupation={handleCreateOccupation}
                  form={form} />
                <AddressDetails form={form} />
                <MobileDetails form={form} />
              </div>
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

            <Space orientation="horizontal" size={4}>
              {callingFrom === "create" ?
                <Form.Item
                  style={{ margin: "0 35px 0 0" }}
                  name="keep_data"
                  label=""
                  initialValue={true}
                  valuePropName="checked"
                >
                  <div>
                    <Switch
                      checkedChildren="KeepData"
                      unCheckedChildren="!KeepData"
                    />
                  </div>
                </Form.Item> : null}

              <Button
                loading={isLoadingCreateUser}
                iconPlacement="end"
                type="primary"
                htmlType="submit">
                Confrom
              </Button>

            </Space>

          </div>

        </Form>
      }

      <ModalByMobile
        form={form}
        title="Profile Found"
        isOpen={isModalOpen}
        data={searchByMobileData?.items || []}
        hanldeClose={() => setIsModalOpen(false)}
      />

      <ModalPreviewProfile
        title={"Preview Biodata"}
        isOpen={isPreviewOpen}
        data={dataPreview}
        hanldeClose={hanldeClosePreview}
      />

    </div >
  )
}

export default ProfileForm

{/* <SiblingDetails
  occupatonOptions={occupatonOptions}
  isOccupationLoading={isOccupationLoading}
  handleCreateOccupation={handleCreateOccupation}
  form={form} /> */}