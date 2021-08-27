import { Col, Tag, Collapse } from "antd";

const { Panel } = Collapse;
let text = "asdflk asdflkj sadf";

export default function AdCard2() {
  return (
    <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={6}>
      <div className="adcard-back-div">
        <video
          width="100%"
          src="https://storage.cloud.google.com/strive-proj/vid-gqcqa644kshfjsuq.mp4"
          type="video/mp4"
        ></video>
        <div className="card-footer">
          <div className="video-title">
            <p>askjas alskdj asd lkj</p>
          </div>
          <div className="footer-tags">
            <div className="labels">
              <Collapse expandIconPosition="right" collapsible="header" ghost>
                <Panel
                  header={
                    <>
                      <Tag color="green">green</Tag>
                      <Tag color="green">green</Tag>
                    </>
                  }
                  key="1"
                >
                  <Tag color="green">green</Tag>
                  <Tag color="green">green</Tag>
                  <Tag color="green">green</Tag>
                  <Tag color="green">green</Tag>
                  <Tag color="green">green</Tag>
                </Panel>
              </Collapse>
            </div>

            <div className="brand">
              <Tag color="purple">purple</Tag>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
}
