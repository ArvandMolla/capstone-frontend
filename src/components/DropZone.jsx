import { useState, useEffect } from "react";
import { Upload, message, Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import axios from "../util/axios";
import { Progress } from "antd";

export default function DropZone() {
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);

  const videoUpload = async () => {
    try {
      let formData = new FormData();
      formData.append("video", video);

      let response = await fetch(`http://localhost:8080/upload`, {
        method: "post",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("profile picture didn't uploaded");
      } else {
        alert("your profile picture uploaded successfully");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const axiosVideoUpload = () => {
    let formData = new FormData();
    formData.append("video", video);

    axios.post("upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (data) => {
        setProgress(Math.round((100 * data.loaded) / data.total));
      },
    });
  };

  const { Dragger } = Upload;

  const props = {
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",

    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setVideo(info.file.originFileObj);
        console.log("video", video);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
        setVideo(info.file.originFileObj);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  useEffect(() => {
    if (video) {
      console.log("video in the state: ", video);
      axiosVideoUpload();
    }
  }, [video]);

  return (
    <div>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
      {progress !== 0 && <Progress percent={progress} />}

      {/* <video
        controls
        width="33%"
        src="https://storage.cloud.google.com/strive-proj/test/2.mp4"
        type="video/mp4"
      ></video> */}
    </div>
  );
}
