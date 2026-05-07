import AdminLayout from "@/components/layout/AdminLayout";
import db from "@/lib/db";
import { Table } from "antd";
import Title from "antd/es/typography/Title";

const Dashboard = () => {
  const data = [
    {
      name: "John Doe",
      email: "sdfasdf",
      password: "",
    },
  ];

  // fetching data form mysql

  const coloum = [
    { title: "John Doe", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Password", dataIndex: "password" },
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
            columns={coloum}
            bordered
            pagination={false}
          />
        </div>
      </AdminLayout>
    </>
  );
};

export default Dashboard;
