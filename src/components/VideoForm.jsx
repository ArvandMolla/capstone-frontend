import { Row, Col, Input, Form, Button, Spin, message, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import LabelRender from "../components/LabelRender";
import BrandRender from "../components/BrandRender.jsx";
import axiosInstance from "../util/axios";

import { useState, useEffect } from "react";

const { Paragraph } = Typography;
const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

export default function VideoForm({
  uploadedFile,
  labels,
  transcript,
  brand,
  setUploadedFile,
}) {
  const [editableStr, setEditableStr] = useState(null);
  const [videoTitle, setVideoTitle] = useState(null);

  const postAd = () => {
    if (!videoTitle) {
      message.error(`video title is required.`);
    } else {
      const adBody = {
        title: videoTitle,
        transcript,
        labels,
        brand,
        videoUrl: uploadedFile.publicUrl,
      };

      axiosInstance
        .post("/ad/post", adBody)
        .then((res) => {
          message.success(`Your ad was posted successfully`);
          setUploadedFile(null);
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
          {labels && transcript ? (
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
                  />
                </Form.Item>
                {editableStr ? (
                  <Paragraph editable={{ onChange: setEditableStr }}>
                    {editableStr}
                  </Paragraph>
                ) : (
                  <Paragraph editable={{ onChange: setEditableStr }}>
                    {transcript}
                  </Paragraph>
                )}

                <LabelRender labels={labels} color="green" title="Labels" />
                <BrandRender brand={brand} color="purple" />

                <Form.Item>
                  <div className="submit-ad">
                    <Button type="primary" onClick={() => postAd()}>
                      Submit
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          ) : (
            <div className="waiting">
              <h2>your video is being analyzed ...</h2>
              <h3>it takes up to 15 seconds</h3>

              <Spin indicator={antIcon} />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}
