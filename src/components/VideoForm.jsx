import { Row, Col, Input, Form } from "antd";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import LabelRender from "../components/LabelRender";
import { Typography } from "antd";
import { useState, useEffect } from "react";

const { Paragraph } = Typography;
const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

export default function VideoForm({ uploadedFile, labels, transcript }) {
  const [editableStr, setEditableStr] = useState(null);

  useEffect(() => {
    setEditableStr(transcript);
  }, [JSON.stringify(editableStr)]);

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
                  <Input placeholder="Give your video a nice title ..." />
                </Form.Item>
              </Form>
              <Paragraph editable={{ onChange: setEditableStr }}>
                {editableStr}
              </Paragraph>
              <LabelRender labels={labels} />
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
