import { Col, Tag } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import uniqid from "uniqid";
import { withRouter } from "react-router-dom";

const AdCard3 = ({ ad, pushReqLabel, setReqBrand, history }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [elementHeight, setElementHeight] = useState(null);

  useEffect(() => {
    let height = document
      .getElementById("labelsDiv")
      .getBoundingClientRect().height;
    console.log(height);
  }, []);
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const getLabelsHeight = () => {};

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
            <p onClick={() => console.log("yes")}>{ad.title}</p>
          </div>
          <div className="footer-tags">
            <div className="labels">
              {ad.labels.length > 0 && (
                <div className="first-tags" id="labelsDiv">
                  {ad.labels.map((elem) => (
                    <Tag
                      color="green"
                      onClick={() => pushReqLabel(elem)}
                      key={uniqid()}
                    >
                      {elem}
                    </Tag>
                  ))}
                  {getLabelsHeight()}
                </div>
              )}
            </div>

            <div className="brand">
              {ad.brand && (
                <Tag color="purple" onClick={() => setReqBrand(ad.brand)}>
                  {ad.brand}
                </Tag>
              )}
            </div>
          </div>
          {ad.labels.length > 2 && (
            <div
              className={collapsed ? "second-tags no-display" : "second-tags"}
            >
              {ad.labels.slice(2).map((elem) => (
                <Tag
                  color="green"
                  onClick={() => pushReqLabel(elem)}
                  key={uniqid()}
                >
                  {elem}
                </Tag>
              ))}
            </div>
          )}
        </div>
      </div>
    </Col>
  );
};

export default withRouter(AdCard3);
