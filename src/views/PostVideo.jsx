import Dropzone from "../components/DropZone";
import VideoForm from "../components/VideoForm";
import { useState, useEffect } from "react";
import axiosInstance from "../util/axios";

export default function PostVideo() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [labelData, setLabelData] = useState(null);

  useEffect(() => {
    if (uploadedFile) {
      fetchLabelData();
    }
  }, [uploadedFile]);

  const fetchLabelData = () => {
    const data = { randomFileName: uploadedFile.randomFileName };
    axiosInstance
      .post("analyze", data)
      .then((res) => {
        setLabelData(res.data);
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div>
      {uploadedFile ? (
        <VideoForm uploadedFile={uploadedFile} labelData={labelData} />
      ) : (
        <Dropzone setUploadedFile={setUploadedFile} />
      )}
    </div>
  );
}
