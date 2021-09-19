import { Col, Tag } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import uniqid from "uniqid";
import { withRouter } from "react-router-dom";

const AdCard5 = ({ ad, pushReqLabel, setReqBrand, history }) => {
  const [expanded, setExpanded] = useState(false);
  const [firstRound, setFirstRound] = useState(true);

  const [isSingleLine, setIsSingleLine] = useState(true);

  useEffect(() => {
    heightCalculator();
  }, []);

  const heightCalculator = () => {
    let elem = document.querySelector(`#elem${ad._id}`);
    let height = elem.clientHeight;
    console.log(height);
    if ((height !== 34) & firstRound) {
      setIsSingleLine(false);
    }
    setFirstRound(false);
  };

  return (
    <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={6}>
      <div className="adcard-back-div">
        <div className="play-logo"></div>
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
          {firstRound && (
            <div className="footer-tags-expanded">
              <div className="footer-labels-expanded" id={`elem${ad._id}`}>
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
                {!isSingleLine && (
                  <div
                    className="collapse-icon"
                    id={ad._id}
                    onClick={() => setExpanded(!expanded)}
                  >
                    <DownOutlined />
                  </div>
                )}

                {ad.brand && (
                  <div className="brand">
                    <Tag color="purple" onClick={() => setReqBrand(ad.brand)}>
                      {ad.brand}
                    </Tag>
                  </div>
                )}
              </div>
            </div>
          )}
          {!firstRound && (
            <div className={!expanded ? "footer-tags" : "footer-tags-expanded"}>
              <div className="footer-labels-expanded" id={`elem${ad._id}`}>
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
                {!isSingleLine && !expanded && (
                  <div
                    className="collapse-icon"
                    id={ad._id}
                    onClick={() => setExpanded(!expanded)}
                  >
                    <DownOutlined />
                  </div>
                )}
                {!isSingleLine && expanded && (
                  <div
                    className="collapse-icon"
                    id={ad._id}
                    onClick={() => setExpanded(!expanded)}
                  >
                    <UpOutlined />
                  </div>
                )}

                {ad.brand && (
                  <div className="brand">
                    <Tag color="purple" onClick={() => setReqBrand(ad.brand)}>
                      {ad.brand}
                    </Tag>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Col>
  );
};

export default withRouter(AdCard5);
