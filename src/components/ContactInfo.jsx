import { Row, Col, Tooltip } from "antd";
import moment from "moment";
import { MailOutlined, UserOutlined } from "@ant-design/icons";

function ContactInfo({ user }) {
  return (
    <Row gutter={24} className="contact-info-container">
      <Col className="contact-info-column1" xs={24} md={8} lg={6} xxl={4}>
        <img
          src={user.avatar}
          alt={user.name}
          width="50"
          height="50"
          className="contact-info-img"
        />
        <h4 className="contact-info-user-name">{user.name}</h4>
      </Col>

      <Col className="contact-info-column2" xs={24} md={8} lg={6} xxl={4}>
        <span>
          <MailOutlined />
        </span>
        <span className="contact-info-email">{user.email}</span>
      </Col>
      <Col className="contact-info-column3" xs={24} md={8} lg={6} xxl={4}>
        <span>
          <UserOutlined />
        </span>
        <span className="contact-info-registered">Registered:</span>
        <Tooltip
          title={moment(`${user.createdAt}`).format("YYYY-MM-DD HH:mm:ss")}
        >
          <span className="contact-info-moment">
            {moment(`${user.createdAt}`).fromNow()}
          </span>
        </Tooltip>
      </Col>
    </Row>
  );
}

export default ContactInfo;
