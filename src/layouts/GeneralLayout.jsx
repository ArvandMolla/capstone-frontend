import { Input, Space } from "antd";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { AudioOutlined, AudioFilled } from "@ant-design/icons";
import { useState, useEffect } from "react";

const { Search } = Input;

export default function GeneralLayout(props) {
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    props.urlChanger();
  }, [isRecording]);

  const suffix = isRecording ? (
    <AudioFilled
      style={{
        fontSize: 16,
        color: "#79b100",
        cursor: "pointer",
      }}
    />
  ) : (
    <AudioOutlined
      onClick={() => {
        voiceRecognition();
        setIsRecording(true);
      }}
      style={{
        fontSize: 16,
        color: "#79b100",
        cursor: "pointer",
      }}
    />
  );

  const voiceRecognition = () => {
    if (window.hasOwnProperty("webkitSpeechRecognition")) {
      var recognition = new window.webkitSpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.lang = "en-US";
      recognition.start();

      recognition.onresult = function (e) {
        if (e.results[0][0].transcript) {
          props.setReqSearch(e.results[0][0].transcript);
          setIsRecording(false);
          recognition.stop();
        } else {
          setIsRecording(false);
          recognition.stop();
        }
      };

      recognition.onerror = function (e) {
        recognition.stop();
        setIsRecording(false);
      };
    }
  };
  return (
    <div className="layout-main">
      <div className="top">
        <TopNav isLoggedin={props.isLoggedin} />
        <div className="search-container">
          <div className="big-logo-container">
            <img
              src="../img/30seconds-logo.jpg"
              alt="30seconds logo"
              className="big-logo"
              onClick={() => props.history.push("/")}
            />
          </div>
          <div className="title">
            <h1>Buy and sell in 30 seconds!</h1>
          </div>
          <div className="search-frame">
            {isRecording && <div className="isRec"></div>}
            <Search
              placeholder="Explore videos ..."
              className="search"
              bordered={false}
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
      <div>
        <Footer />
      </div>
    </div>
  );
}
