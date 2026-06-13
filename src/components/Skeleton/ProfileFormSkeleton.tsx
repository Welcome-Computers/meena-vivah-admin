import { Col, Row } from 'antd'
import FormSkeleton from './FormInputSkeleton'

const ProfileFormSkeleton = () => {
  return (
    <Row gutter={[40, 40]}>
      <Col xs={24} md={12}>
        <FormSkeleton />
      </Col>

      <Col xs={24} md={12}>
        <FormSkeleton />
      </Col>
    </Row>
  )
}

export default ProfileFormSkeleton