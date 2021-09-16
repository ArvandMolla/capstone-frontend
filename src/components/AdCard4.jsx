import { Col, Tag } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import uniqid from "uniqid";
import { withRouter } from "react-router-dom";

const AdCard3 = ({ ad, pushReqLabel, setReqBrand, history }) => {
  const [expandedAd, setExpandeddAd] = useState(true);

  return (
    <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={6}>
      <div
        className={
          ad._id === expandedAd ? "adcard-back-div-expanded" : "adcard-back-div"
        }
      >
        <video
          className="video-thumb"
          width="100%"
          src={ad.videoUrl}
          type="video/mp4"
          onClick={() => history.push(`/details/${ad._id}`)}
        ></video>
        <div className="card-footer">
          <div className="video-title">
            <p onClick={() => console.log("yes")}>{ad.title}</p>
          </div>
          <div className="footer-tags">
            <div className="labels">
              {ad.labels.map((elem) => (
                <Tag
                  color="green"
                  onClick={() => pushReqLabel(elem)}
                  key={uniqid()}
                >
                  {elem}
                </Tag>
              ))}
            </div>
            <div className="collapse-arrow">
              <DownOutlined
                id={ad._id}
                onClick={(e) => setExpandeddAd(e.target.id)}
              />
            </div>

            <div className="brand">
              {ad.brand && (
                <Tag color="purple" onClick={() => setReqBrand(ad.brand)}>
                  {ad.brand}
                </Tag>
              )}
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default withRouter(AdCard3);
