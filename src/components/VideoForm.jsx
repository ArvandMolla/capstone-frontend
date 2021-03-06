import { Row, Col, Input, Form, Button, Spin, message, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import LabelRender2 from "../components/LabelRender2";
import BrandRender from "../components/BrandRender.jsx";
import axiosInstance from "../util/axios";
import jwt_decode from "jwt-decode";

import { useState, useEffect } from "react";

const { Paragraph } = Typography;
const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

export default function VideoForm({
  uploadedFile,
  labels,
  transcript,
  brand,
  reseter,
  setTranscript,
  setLabels,
  history,
}) {
  const [videoTitle, setVideoTitle] = useState(null);

  const postAd = () => {
    if (!videoTitle) {
      message.error(`Video title is required.`);
    } else {
      const accessToken = localStorage.getItem("accessToken");
      const decodedToken = jwt_decode(accessToken);
      const adBody = {
        title: videoTitle,
        transcript: transcript,
        labels,
        brand,
        videoUrl: uploadedFile.publicUrl,
        user: decodedToken._id,
      };

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      axiosInstance
        .post("/ad/post", adBody, { headers })
        .then((res) => {
          message.success(`Your ad was posted successfully`);
          setVideoTitle(null);
          reseter();
        })
        .catch((err) => {
          message.error(`Posting ad failed!`);
          console.log(err.message);
        });
    }
  };
  console.log("public url: ", uploadedFile);
  return (
    <div>
      <Row gutter={32} justify="space-between">
        <Col span={12}>
          <video
            controls
            width="100%"
            src={uploadedFile.publicUrl}
            type="video/mp4"
          ></video>
        </Col>
        <Col span={12}>
          <>
            {labels && (
              <div>
                <Form layout="vertical">
                  <Form.Item
                    label="Give it a title"
                    required
                    tooltip="Title shows up below your video in listings"
                  >
                    <Input
                      placeholder="Give your video a nice title ..."
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      size="large"
                    />
                  </Form.Item>
                </Form>
                <div className="video-form-labels">
                  <LabelRender2
                    labels={labels}
                    color="green"
                    title="Labels"
                    setLabels={setLabels}
                  />
                </div>
              </div>
            )}
            {transcript && (
              <div>
                <Paragraph
                  editable={{ onChange: setTranscript }}
                  className="post-video-transcript"
                >
                  {transcript}
                </Paragraph>

                <BrandRender brand={brand} color="purple" />
                <Form.Item>
                  <div className="submit-ad">
                    <Button type="primary" onClick={() => postAd()}>
                      Submit
                    </Button>
                  </div>
                </Form.Item>
              </div>
            )}

            {!labels && !transcript && (
              <div className="waiting">
                <h2>Your video is being analyzed ...</h2>
                <h3>It takes up to 1 minute</h3>
                <Spin indicator={antIcon} />
              </div>
            )}

            {labels && !transcript && (
              <div className="waiting">
                <h2>Your video is being analyzed ...</h2>
                <h3>It takes up to 1 minute</h3>
                <Spin indicator={antIcon} />
              </div>
            )}
          </>
        </Col>
      </Row>
    </div>
  );
}
