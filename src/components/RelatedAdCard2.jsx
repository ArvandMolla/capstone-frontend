import { Col, Tag } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
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
        <video
          className="video-thumb"
          width="100%"
          src={ad.videoUrl}
          type="video/mp4"
          onClick={() => {
            history.push(`/details/${ad._id}`);
            fetchSingleAd(ad._id);
            fetchComments(ad._id);
          }}
        ></video>
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
