import { useState, useEffect } from "react";
import { Upload, message, Button } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { Progress } from "antd";

export default function DropZone({ setUploadedFile }) {
  const { Dragger } = Upload;

  const props = {
    name: "video",
    multiple: false,
    action: "http://localhost:8080/upload",

    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file);
        setUploadedFile(info.file.response);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <PlayCircleOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag video to this area to upload
        </p>
        <p className="ant-upload-hint">
          Just add one video for your advertisement
        </p>
      </Dragger>
    </div>
  );
}
