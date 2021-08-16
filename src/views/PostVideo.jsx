import Dropzone from "../components/DropZone";
import VideoForm from "../components/VideoForm";
import { useState, useEffect } from "react";
import axiosInstance from "../util/axios";

export default function PostVideo() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [labelData, setLabelData] = useState(null);
  const [labels, setLabels] = useState(null);
  const [transcriptData, setTranscriptData] = useState(null);
  const [transcript, setTranscript] = useState(null);

  useEffect(() => {
    if (uploadedFile) {
      fetchTranscriptData();
      fetchLabelData();
    }
  }, [uploadedFile]);

  useEffect(() => {
    if (labelData) {
      extractLabelsFromData();
    }
  }, [labelData]);

  useEffect(() => {
    if (transcriptData) {
      extractTranscriptFromData();
    }
  }, [transcriptData]);

  const extractTranscriptFromData = () => {
    let transcript = "";

    transcriptData.speechTranscriptions.forEach((elem) => {
      elem.alternatives.forEach((elem) => {
        if (elem.transcript) {
          transcript += ` ${elem.transcript}`;
        }
      });
    });

    setTranscript(transcript);
  };

  const extractLabelsFromData = () => {
    const labels = [];
    labelData.forEach((elem) => {
      if (elem.categoryEntities) {
        elem.categoryEntities.forEach((catEntity) => {
          labels.push(catEntity.description);
        });
      }

      labels.push(elem.entity.description);
    });

    const uniqueLabels = [...new Set(labels)];

    setLabels(uniqueLabels);
  };

  const fetchTranscriptData = () => {
    const data = { randomFileName: uploadedFile.randomFileName };
    axiosInstance
      .post("/video/analyze/transcript", data)
      .then((res) => {
        setTranscriptData(res.data);
      })
      .catch((err) => console.log(err.message));
  };

  const fetchLabelData = () => {
    const data = { randomFileName: uploadedFile.randomFileName };
    axiosInstance
      .post("/video/analyze/labels", data)
      .then((res) => {
        setLabelData(res.data);
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div>
      {uploadedFile ? (
        <VideoForm
          uploadedFile={uploadedFile}
          labels={labels}
          transcript={transcript}
        />
      ) : (
        <Dropzone setUploadedFile={setUploadedFile} />
      )}
    </div>
  );
}
