import {
  LOOKING_FOR_OPTIONS
} from "@/pages/api/formOptions/formOptions";


import {
  Button,
  Col,
  Form,
  Row
} from "antd";



import { GetGotraProps } from "@/lib/modules/master-gotra/master-gotra.types";
import { useGetGotrasQuery } from "@/redux/features/masterGotra";
import { useGetOccupationsQuery } from "@/redux/features/masterOccupation";
import SearchableSelectField from "../InputElements/SearchableSelectField";
import AgeRangeField from "./AgeRangeField";
import style from "./ProfileFilter.module.css";


interface iProps {
  filterDataHandler: (query: GetGotraProps) => void;
  callingFrom: "profilePage" | "homePage"
}

export const ProfileFilter = (props: iProps) => {
  const { filterDataHandler, callingFrom } = props || {};

  const [form] = Form.useForm();
  const fromData = Form.useWatch(null, form)

  const { exclude_gotra, req_occupation } = fromData || {};

  const { data, isFetching: isGotraLoading } = useGetGotrasQuery({});
  const { data: occupatonList, isFetching: isOccupationLoading } = useGetOccupationsQuery({});

  const gottraOptions =
    data?.map((item: any) => ({
      label: item.name,
      value: item.code,
      // disabled: exclude_gotra?.includes(item.code),
    })) || [];

  const occupatonOptions =
    occupatonList?.map((item: any) => ({
      label: item.name,
      value: item.code,
      // disabled: req_occupation?.includes(item.code),
    })) || [];

  /**
   * HANDLE SEARCH
   */
  const handleSearch = (filters: any) => {
    const query = Object.fromEntries(
      Object.entries(filters).filter(
        ([_, value]) =>
          value !== "" &&
          value !== undefined
      )
    );

    // console.log(query)
    // // return;

    filterDataHandler(query)
  };

  return (
    <div className={style.profileFilterContainer}>
      <Row gutter={[16, 16]}>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSearch}>

          {/* GENDER */}
          <Col xs={24}>
            <SearchableSelectField
              name={"looking_for"}
              label={"I'm Looking For"}
              options={LOOKING_FOR_OPTIONS}
              placeholder="Select"
            />

          </Col>

          {/* AGE RANGE */}
          <Col xs={24}>
            <AgeRangeField
              name="preferredAge"
              label="Preferred Age"
              min={18}
              max={60}
              initialValue={[25, 35]}
            />
          </Col>
          {/* OCCUPATION */}
          {callingFrom === "profilePage" ?
            <>
              <Col xs={24}>
                <SearchableSelectField
                  mode="multiple"
                  name={"req_occupation"}
                  label={"Wanted occupation"}
                  options={occupatonOptions}
                  loading={isOccupationLoading}
                  placeholder="Select occupations"
                />
              </Col>


            </>
            : null}

          {/* EXCLUDE GOTRA */}
          <Col xs={24}>
            <SearchableSelectField
              mode="multiple"
              name={"exclude_gotra"}
              label={"Exclude Gotra"}
              options={gottraOptions}
              loading={isGotraLoading}
              placeholder="Select Gotra"
            />
          </Col>


          {/* SEARCH BUTTON */}
          <Col xs={24}>
            <Button
              block
              size="large"
              type="primary"
              htmlType="submit"
              className={style.searchButton}>
              Search Profiles
            </Button>
          </Col>
        </Form>
      </Row>
    </div>
  );
};