
import {
  Card,
  Col,
  Space
} from "antd";

import {
  HeartOutlined,
  ManOutlined,
  ProfileOutlined,
  WomanOutlined,
} from "@ant-design/icons";


interface iProps {
  status: {
    totalMembers: number,
    boys: number,
    girls: number,
    matched: number,
  }
}
const TopStatics = (props: iProps) => {
  const { status } = props || {}

  return (
    <>
      <Col span={6}>
        <Card>
          <Space>
            <ProfileOutlined style={{ fontSize: 40, opacity: .2 }} />
            <div>
              <h3>{status.totalMembers}</h3>
              <p>Total Members</p>
            </div>
          </Space>
        </Card>
      </Col>

      <Col span={6}>
        <Card>
          <Space>
            <ManOutlined style={{ fontSize: 40, opacity: .2 }} />
            <div>
              <h3>{status.boys}</h3>
              <p>Boys</p>
            </div>
          </Space>
        </Card>
      </Col>

      <Col span={6}>
        <Card>
          <Space>
            <WomanOutlined style={{ fontSize: 40, opacity: .2 }} />
            <div>
              <h3>{status.girls}</h3>
              <p>Girls</p>
            </div>
          </Space>
        </Card>
      </Col>

      <Col span={6}>
        <Card>
          <Space>
            <HeartOutlined style={{ fontSize: 40, opacity: .2 }} />
            <div>
              <h3>{status.matched}</h3>
              <p>Matched</p>
            </div>
          </Space>
        </Card>
      </Col>
    </>
  )
}

export default TopStatics