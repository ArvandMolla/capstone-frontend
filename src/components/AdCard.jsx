import { Col, Tag } from "antd";
import { DownOutlined } from "@ant-design/icons";

export default function AdCard({ ad }) {
  return (
    <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={6}>
      <div className="adcard-back-div">
        <video width="100%" src={ad.videoUrl} type="video/mp4"></video>
        <div className="card-footer">
          <div className="video-title">
            <p>{ad.title}</p>
          </div>
          <div className="footer-tags">
            {ad.labels.length > 0 && (
              <div className="labels">
                {ad.labels.map((elem) => (
                  <Tag color="green">{elem}</Tag>
                ))}

                <span className="collapse-icon" onClick={(e) => console.log(e)}>
                  {/* <DownOutlined /> */}
                  sldkj
                </span>
              </div>
            )}

            <div className="brand">
              {ad.brand && <Tag color="purple">{ad.brand}</Tag>}
            </div>
          </div>
          <div className="extra-tags">helloooo</div>
        </div>
      </div>
    </Col>
  );
}
