
import { Button, Col, Divider, Form, Modal, Row } from "antd";

import { Button, Form, Modal } from "antd";
import { memo, useState } from "react";
import { Typography } from "antd";

const { Title, Text } = Typography;

const PreviewButton = memo((props: any) => {
  const { form } = props;

  type PreviewData = {
    name?: string;
    gender?: { value?: string };
    relation?: { value?: string };
    dob?: any;
    occupation?: string;
    education?: string;
    father_name?: string;
    father_occupation?: string;
    mother_name?: string;
    mother_occupation?: string;
    sibling_name?: string;
    sibling_education?: string;
    sibling_occupation?: string;
    mobile?:any;
    address?:any;
  };

  const [isPreviewOpen, setisPreviewOpen] = useState<boolean>(false);
  const [dataPreview, setDataPreview] = useState<PreviewData>({});

  const handlePreviewButton = () => {
    const previewData = form.getFieldsValue();
    setDataPreview(previewData);
    setisPreviewOpen(true);
  };

  const hanldeClosePreview = () => {
    setisPreviewOpen(false);
  };

  // object data converted into array to manage easilt
  const sections = [
    {
      title: "Personal Details",
      fields: [
        { label: "Name", value: dataPreview.name },
        { label: "Gender", value: dataPreview.gender?.value },
        { label: "Education", value: dataPreview.education },
        { label: "Occupation", value: dataPreview.occupation },
        { label: "Job Title", value: dataPreview.occupation },
      ],
    },
    {
      title: "Family Details",
      fields: [
        { label: "Father's Name", value: dataPreview.father_name },
        { label: "Father's Occupation", value: dataPreview.father_occupation },
        { label: "Mother's Name", value: dataPreview.mother_name },
        { label: "Mother's Occupation", value: dataPreview.mother_occupation },
      ],
    },
          {
      title:"Contact Details",
      fields:[
     { label: "Contact No.", value: dataPreview?.mobile },
      { label: "Address", value: dataPreview?.address },
      ]
    },
  ];

  return (
    <div>
      <Modal
        open={isPreviewOpen}
        onCancel={hanldeClosePreview}
        onOk={hanldeClosePreview}
        closable={false}
        footer={null}
          styles={{
    body: {
      backgroundImage: "url('/previewbg1.png')",
      backgroundSize: "contain",
      backgroundPosition: "center",
      paddingTop:"2rem",
      backgroundRepeat: "no-repeat",
      minHeight: "80vh",
    },
  }}
  
      >
      
          {sections.map((item) => (
            <>
              <Title
                level={4}
                style={{
                  fontSize: "1rem",
                  width: "30%",
                  padding: "4px 8px",
                  marginTop: "3.5rem", 
                  marginLeft: "2rem",
                  color: "white",
                  backgroundColor: "#b97703",
                }}
              >
                {item.title}
              </Title>

              {item.fields.map((value) => (
                <div key={value.label}>
                  <Row
                    gutter={[16, 1]}
                    style={{
                      width: "90%",
                    }}
                  >
                    <Col span={10} style={{ left:"2rem" ,color:"red" }}>
                      <p>
                        <Text strong>{value.label}</Text>
                      </p>
                    </Col>

                    <Col span={9}>
                      <p>{value.value}</p>
                    </Col>

                    <Col span={5}>
                      {/* <img src={} alt="img"></img>  */}
                    </Col>
                  </Row>
                </div>
              ))}
            </>
          ))}


    


      </Modal>

      <Form.Item>
        <Button type="primary" onClick={handlePreviewButton}>
          Preview
        </Button>
      </Form.Item>
    </div>
  );
});

PreviewButton.displayName = "PreviewButton";
export default PreviewButton;





// import { Button, Col, Divider, Form, Modal, Row } from "antd";
// import { memo, useState } from "react";
// import { Typography } from "antd";

// const { Title, Text } = Typography;

// const PreviewButton = memo((props: any) => {
//   const { form} = props;

// type PreviewData={
//    name?: string;
//   gender?: { value?: string };
//   relation?: { value?: string };
//   dob?: any;
//   occupation?: string;
//   education?: string;
//   father_name?: string;
//   father_occupation?: string;
//   mother_name?: string;
//   mother_occupation?: string;
//   sibling_name?: string;
//   sibling_education?: string;
//   sibling_occupation?: string;
// }

//   const [isPreviewOpen, setisPreviewOpen] = useState<boolean>(false);
//   const [dataPreview, setDataPreview] = useState<PreviewData>({});

//   const handlePreviewButton = () => {
//     const previewData = form.getFieldsValue();
//     setDataPreview(previewData);
//     setisPreviewOpen(true);
//   };

//   const hanldeClosePreview = () => {
//     setisPreviewOpen(false);
//   };

//   return (
//     <div>
//       <Modal
//         open={isPreviewOpen}
//         onCancel={hanldeClosePreview}
//         onOk={hanldeClosePreview}
//       >
//          <Title
//     level={4}
//     style={{
//       marginBottom: "1.5rem",
//       color: "#d48806",
//     }}
//   >
//     Review Everything
//   </Title>

//   <Row gutter={[16, 16]}>
//     <Col span={12}>
//       <Text strong>Name:</Text>
//       <br />
//       <Text>{dataPreview.name || "Not provided"}</Text>
//     </Col>

//     <Col span={12}>
//       <Text strong>Gender:</Text>
//       <br />
//       <Text>{dataPreview.gender?.value || "Not provided"}</Text>
//     </Col>

//      <Col span={12}>
//       <Text strong>Relation:</Text>
//       <br />
//       <Text>{dataPreview.relation?.value || "Not provided"}</Text>
//     </Col>

//     <Col span={12}>
//       <Text strong>Date of Birth:</Text>
//       <br />
//       <Text>
//         {`${dataPreview.dob?.day || "--"}/${
//           dataPreview.dob?.month || "--"
//         }/${dataPreview.dob?.year || "--"}`}
//       </Text>
//     </Col>

//       <Col span={12}>
//       <Text strong>Occupation:</Text>
//       <br />
//       <Text>{dataPreview.occupation || "Not provided"}</Text>
//     </Col>

//     <Col span={12}>
//       <Text strong>Education:</Text>
//       <br />
//       <Text>{dataPreview.education || "Not provided"}</Text>
//     </Col>
//   </Row>

//   <Divider style={{ borderColor: "#f6d365" }} />

//    <Title
//     level={5}
//     style={{
//       color: "#d48806",
//       marginBottom: "1rem",
//     }}
//   >
//     Family Details
//   </Title>

//   <Row gutter={[16, 16]}>
//     <Col span={12}>
//       <Text strong>Father's Name:</Text>
//       <br />
//       <Text>{dataPreview.father_name || "Not provided"}</Text>
//     </Col>

//       <Col span={12}>
//       <Text strong>Father's Occupation:</Text>
//       <br />
//       <Text>{dataPreview.father_occupation || "Not provided"}</Text>
//     </Col>

//     <Col span={12}>
//       <Text strong>Mother's Name:</Text>
//       <br />
//       <Text>{dataPreview.mother_name || "Not provided"}</Text>
//     </Col>

//     <Col span={12}>
//       <Text strong>Mother's Occupation:</Text>
//       <br />
//       <Text>{dataPreview.mother_occupation || "Not provided"}</Text>
//     </Col>

//       <Col span={12}>
//       <Text strong>Sibling Name:</Text>
//       <br />
//       <Text>{dataPreview.sibling_name || "Not provided"}</Text>
//     </Col>

//     <Col span={12}>
//       <Text strong>Sibling Education:</Text>
//       <br />
//       <Text>{dataPreview.sibling_education || "Not provided"}</Text>
//     </Col>

//     <Col span={12}>
//       <Text strong>Sibling Occupation:</Text>
//       <br />
//       <Text>{dataPreview.sibling_occupation || "Not provided"}</Text>
//     </Col>
//   </Row>

//       </Modal>

//       <Form.Item>
//         <Button type="primary" onClick={handlePreviewButton}>
//           Preview
//         </Button>
//       </Form.Item>
//     </div>
//   );
// });

// PreviewButton.displayName = "PreviewButton";
// export default PreviewButton;
