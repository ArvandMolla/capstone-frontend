import { Col, Tag } from "antd";
import {
  DownOutlined,
  UpOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import uniqid from "uniqid";
import { withRouter } from "react-router-dom";
function RelatedAdCard2({ ad, history, fetchSingleAd, fetchComments }) {
  const [expanded, setExpanded] = useState(false);
  const [firstRound, setFirstRound] = useState(true);

  const [isSingleLine, setIsSingleLine] = useState(true);

  return (
    <Col>
      <div className="adcard-back-div">
        <div className="video-container">
          <div
            className="play-logo"
            onClick={() => {
              history.push(`/details/${ad._id}`);
              fetchSingleAd(ad._id);
              fetchComments(ad._id);
            }}
          >
            <div className="icon-container">
              <PlayCircleOutlined
                style={{ fontSize: "42px", color: "#79b100" }}
              />
            </div>
          </div>
          <video
            className="video-thumb"
            width="100%"
            src={ad.videoUrl}
            type="video/mp4"
          ></video>
        </div>
        <div className="card-footer-related-ads">
          <div className="video-title">
            <p>{ad.title}</p>
          </div>
        </div>
      </div>
    </Col>
  );
}

export default withRouter(RelatedAdCard2);
