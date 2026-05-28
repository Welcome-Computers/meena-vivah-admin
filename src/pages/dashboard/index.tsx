import AdminLayout from "@/components/layout/AdminLayout";
import db from "@/lib/db";
import { Table } from "antd";
import Title from "antd/es/typography/Title";

const Dashboard = () => {
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

const columns = [
  { title: "Name", dataIndex: "name" },
  { title: "Dob", dataIndex: "dob" },
  { title: "Education", dataIndex: "education" },
  { title: "Occupation", dataIndex: "occupation" },
  { title: "Gotra", dataIndex: "gotra" },
];

  return (
    <>
      <AdminLayout>
        <div>

          <Title level={5} style={{ margin: 0 }}>
            User Details
          </Title>

          <Table
            dataSource={data}
            columns={columns}
            bordered
            pagination={false}
          />

        </div>
      </AdminLayout>
    </>
  );
};

export default Dashboard;
