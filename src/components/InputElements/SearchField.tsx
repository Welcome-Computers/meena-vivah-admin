import { memo } from "react";
import InputField from "./InputField";
import { Button, Col, Row } from "antd";

interface SearchFieldProps {
handleInputChange:any;
rules:any;

}

const SearchField = memo((props:SearchFieldProps) => {
  const {handleInputChange,rules} = props;


  return (
    <>
      <Row>
        <Col>
          <InputField
            style={{ height: "1.5rem" }}
            name="search"
            label={null}
            onChange={(v) => handleInputChange(v.target.value)}
            rules={rules}
          />
        </Col>
        <Col>
          <Button
            type="primary"
            htmlType="submit"
            style={{ height: "1.5rem", margin: ".2rem" }}
          >
            Go
          </Button>
        </Col>
      </Row>
    </>
  );
});

SearchField.displayName = "SearchField";
export default SearchField;
