import { Input, Space } from "antd";
import { Button } from "antd";
import TopNav from "../components/TopNav";
import Home from "../views/Home";
import { AudioOutlined } from "@ant-design/icons";

const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#79b100",
    }}
  />
);
export default function GeneralLayout(props) {
  return (
    <div className="layout-main">
      <TopNav />
      <div className="top">
        <div className="search-container">
          <div className="big-logo-container">
            <img
              src="../img/30seconds-logo.png"
              alt="30seconds logo"
              className="big-logo"
            />
          </div>
          <div className="title">
            <h1>Buy and sell in 30 seconds!</h1>
          </div>
          <div>
            <Search
              placeholder="explore videos ..."
              size="large"
              className="search"
              suffix={suffix}
              allowClear
              onSearch={() => props.urlChanger()}
              value={props.reqSearch}
              onChange={(e) => {
                props.setReqSearch(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="green"></div>

        <div className="yellow-container">
          <div className="yellow">{props.filters}</div>
        </div>
      </div>
      <div className="bottom-container">
        <div className="bottom">{props.view}</div>
      </div>
    </div>
  );
}
