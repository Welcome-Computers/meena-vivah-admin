
import {
  Card,
  Col,
  Space
} from "antd";

import {
  HeartOutlined,
  ManOutlined,
  UserOutlined,
  WomanOutlined,
} from "@ant-design/icons";


interface iProps {
  stats: {
    totalMembers: number,
    boys: number,
    girls: number,
    matched: number,
  }
}
const TopStatics = (props: iProps) => {
  const { stats } = props || {}

  return (
    <>
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
    </>
  )
}

export default TopStatics