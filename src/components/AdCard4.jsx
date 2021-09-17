import { Col, Tag } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import uniqid from "uniqid";
import { withRouter } from "react-router-dom";

const AdCard4 = ({ ad, pushReqLabel, setReqBrand, history }) => {
  const [expanded, setExpanded] = useState(false);
  const [labelsHeight, setLabelsHeight] = useState(false);

  useEffect(() => {
    heightCalculator();
  }, []);

  const heightCalculator = () => {
    const elem = document.querySelector(".card-footer");
    const height = elem.clientHeight;
    console.log(height);
    setLabelsHeight(height);
  };

  return (
    <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={6}>
      <div className="adcard-back-div">
        <video
          className="video-thumb"
          width="100%"
          src={ad.videoUrl}
          type="video/mp4"
          onClick={() => history.push(`/details/${ad._id}`)}
        ></video>
        <div className="card-footer">
          <div className="video-title">
            <p>{ad.title}</p>
          </div>
          <div className={expanded ? "footer-tags-expanded" : "footer-tags"}>
            <div className="labels" id="adLabels">
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
            <div className="collapse-and-brand">
              {/* {labelsHeight !== 31 && ( */}
              <div
                className="collapse-icon"
                id={ad._id}
                onClick={(e) => setExpanded(!expanded)}
              >
                <DownOutlined />
              </div>
              {/* )} */}

              {ad.brand && (
                <div className="brand">
                  <Tag color="purple" onClick={() => setReqBrand(ad.brand)}>
                    {ad.brand}
                  </Tag>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default withRouter(AdCard4);
