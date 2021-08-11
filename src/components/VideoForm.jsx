import { Row, Col, Input, Form } from "antd";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
const { TextArea } = Input;

export default function VideoForm({ uploadedFile, labelData }) {
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
          {labelData ? (
            <Form layout="vertical">
              <Form.Item
                label="Give it a title"
                required
                tooltip="Title shows up below your video in listings"
              >
                <Input placeholder="Give your video a nice title ..." />
              </Form.Item>
              <Form.Item
                label="Edit video transcription if needed"
                tooltip="Transcription helps people with hearing problems understand your video"
              >
                <TextArea autoSize />
              </Form.Item>
            </Form>
          ) : (
            <div className="waiting">
              <h2>your video is being analyzed ...</h2>
              <h3>it takes up to 10 seconds</h3>

              <Spin indicator={antIcon} />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}
