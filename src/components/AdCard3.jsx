import { Col, Tag } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useState } from "react";
import uniqid from "uniqid";

export default function AdCard3({ ad, pushReqLabel, setReqBrand }) {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={6}>
      <div className="adcard-back-div">
        <video width="100%" src={ad.videoUrl} type="video/mp4"></video>
        <div className="card-footer">
          <div className="video-title">
            <p onClick={() => console.log("yes")}>{ad.title}</p>
          </div>
          <div className="footer-tags">
            <div className="labels">
              {ad.labels.length > 0 && ad.labels.length < 3 && (
                <div className="first-tags">
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
              )}

              {ad.labels.length > 2 && (
                <>
                  <div className="first-tags">
                    {ad.labels.slice(0, 2).map((elem) => (
                      <Tag
                        color="green"
                        onClick={() => pushReqLabel(elem)}
                        key={uniqid()}
                      >
                        {elem}
                      </Tag>
                    ))}
                  </div>

                  <span
                    className="collapse-icon"
                    onClick={() => toggleCollapse()}
                  >
                    {collapsed ? (
                      <DownOutlined style={{ fontSize: "11px" }} />
                    ) : (
                      <UpOutlined style={{ fontSize: "11px" }} />
                    )}
                  </span>
                </>
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
}
