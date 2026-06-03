import AdminLayout from "@/components/layout/AdminLayout";
import { Col, Row, Table } from "antd";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import style from "@/pages/dashboard/dashboard.module.css"

const Dashboard = async() => {

  // fetch database data
  // const getUsers=(async()=>{
  //   const res=await fetch("http://localhost:3001/api/user")
  //    return res.json();
  // })
  // const user=await getUsers();

 const data = [
  {
    name: "John Doe",
    dob: "12 Jan 1998",
    education: "B.Tech",
    occupation: "Software Engineer",
    gotra: "Bhardwaj",
  },
  {
    name: "Rahul Sharma",
    dob: "05 Aug 1996",
    education: "MBA",
    occupation: "Business Analyst",
    gotra: "Vashistha",
  },
];


  return (
    <>
      <AdminLayout>
        <div>

          <Title level={5} style={{ margin: 0 }}>
            User Details
          </Title>

         {/* tabel header */}
         <Row gutter={[16,16]}>

          <Col span={4} style={{border:"1px outset gray"}}>
          <Text strong >Name:</Text>
          </Col>
          <Col span={4} style={{border:"1px outset gray"}}>
          <Text strong >Education:</Text>
          </Col>

          <Col span={4} style={{border:"1px outset gray"}}>
          <Text strong >Occupation:</Text>
          </Col>
          <Col span={4} style={{border:"1px outset gray"}}>
          <Text strong >Dob:</Text>
          </Col>

          <Col span={4} style={{border:"1px outset gray"}}>
          <Text strong >Name:</Text>
          </Col>
          <Col span={4} style={{border:"1px outset gray"}}>
          <Text strong >Name:</Text>
          </Col>

         </Row>
         {/* data table */}
               <Row gutter={[16,1]}>

{data.map((data)=>(
<>

    <Col span={4} className={style.tableborder} >
          <Text strong >
            <span>{data?.name}</span><br/>
            <p>{data?.name}</p>
          </Text>
          </Col>

          <Col span={4} className={style.tableborder} >
          <Text strong >{data?.education}</Text>
          </Col>

          <Col span={4} className={style.tableborder} >
          <Text strong >{data?.occupation}</Text>
          </Col>
          
          <Col span={4} className={style.tableborder} >
          <Text strong >{data?.dob}</Text>
          </Col>

          <Col span={4} className={style.tableborder} >
          <Text strong >:</Text>
          </Col>
          <Col span={4} className={style.tableborder} >
          <Text strong >:</Text>
          </Col>
</>

          ))}
          
         </Row>

        </div>
      </AdminLayout>
    </>
  );
};

export default Dashboard;
