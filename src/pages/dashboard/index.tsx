import AdminLayout from "@/components/layout/AdminLayout";

import {
  Card,
  Col,
  message,
  Row,
  Space,
  Typography
} from "antd";

import ProfileContainer from "@/components/profile/ProfileContainer";
import { IUser } from "@/redux/types";
import {
  HeartOutlined,
  ManOutlined,
  UserOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";

const { Title } = Typography;

const Dashboard = () => {
  const stats = {
    totalMembers: 120,
    boys: 70,
    girls: 50,
    matched: 18,
  };

  const [data, setData] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    "total": 6,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  });

  const getUsers = async (
    page = pagination.page,
    limit = pagination.limit
  ) => {
    try {
      setLoading(true);

      const response = await axios.get(
        `http://localhost:3005/api/user?page=${page}&limit=${limit}`
      );

      const result = response?.data;

      if (result?.success) {
        setData(result?.data || []);

        setPagination(result?.pagination);
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch profiles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers(1);
  }, []);


  return (
    <AdminLayout>
      <div>
        <Title level={4}>
          Dashboard Overview
        </Title>

        {/* ================= STATS ================= */}
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Space>
                <UserOutlined />
                <div>
                  <h3>
                    {
                      stats.totalMembers
                    }
                  </h3>
                  <p>
                    Total Members
                  </p>
                </div>
              </Space>
            </Card>
          </Col>

          <Col span={6}>
            <Card>
              <Space>
                <ManOutlined />
                <div>
                  <h3>
                    {
                      stats.boys
                    }
                  </h3>
                  <p>Boys</p>
                </div>
              </Space>
            </Card>
          </Col>

          <Col span={6}>
            <Card>
              <Space>
                <WomanOutlined />
                <div>
                  <h3>
                    {
                      stats.girls
                    }
                  </h3>
                  <p>Girls</p>
                </div>
              </Space>
            </Card>
          </Col>

          <Col span={6}>
            <Card>
              <Space>
                <HeartOutlined />
                <div>
                  <h3>
                    {
                      stats.matched
                    }
                  </h3>
                  <p>
                    Matched
                  </p>
                </div>
              </Space>
            </Card>
          </Col>
        </Row>

        {/* ================= TABLE 1 ================= */}
        <div style={{ marginTop: 30, }}>
          <ProfileContainer
            defaultShow="table"
            loading={loading}
            title={'Last 15 Days New Registrations'}
            data={data}
            pagination={pagination}
            getUsers={getUsers} />
        </div>

        {/* ================= TABLE 2 ================= */}
        <div style={{ marginTop: 30, }}>
          <ProfileContainer
            title={'Last 15 Days Updates'}
            loading={loading}
            defaultShow="table"
            data={data}
            pagination={pagination}
            getUsers={getUsers} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;