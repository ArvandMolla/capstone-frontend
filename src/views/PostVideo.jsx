import Dropzone from "../components/DropZone";
import VideoForm from "../components/VideoForm";
import { useState, useEffect } from "react";
import axiosInstance from "../util/axios";
import { withRouter } from "react-router-dom";

const PostVideo = ({
  history,
  setIsloggedin,
  isLoggedin,
  fetchFilteredAds,
  homePageAds,
}) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [labelData, setLabelData] = useState(null);
  const [labels, setLabels] = useState(null);
  const [transcriptData, setTranscriptData] = useState(null);
  const [transcript, setTranscript] = useState(null);
  const [entityData, setEntityData] = useState(null);
  const [brand, setBrand] = useState("");

  useEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (transcript) {
      fetchEntityData();
    }
  }, [transcript]);

  useEffect(() => {
    if (entityData) {
      extractBrand();
    }
  }, [entityData]);

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

  const checkLogin = () => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    axiosInstance
      .get("/user/is-loggedin", { headers })
      .then((res) => {
        if (res.status === 200) {
          setIsloggedin(true);
        }
      })
      .catch((err) => history.push("/login"));
  };

  const extractBrand = () => {
    let salience = 0;
    let brand = "";

    entityData.forEach((elem) => {
      if ((elem.type === "ORGANIZATION") & (elem.salience > salience)) {
        brand = elem.name;
        salience = elem.salience;
      }
    });
    setBrand(brand);
  };

  const fetchEntityData = () => {
    const body = { text: transcript };
    axiosInstance
      .post("/text/analyze/entities", body)
      .then((res) => {
        setEntityData(res.data);
      })
      .catch((err) => console.log(err.message));
  };

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

  const reseter = () => {
    setUploadedFile(null);
    setLabelData(null);
    setLabels(null);
    setTranscriptData(null);
    setTranscript(null);
    setEntityData(null);
    setBrand("");
    window.location.reload(false);
  };
  return (
    <div>
      {uploadedFile ? (
        <VideoForm
          uploadedFile={uploadedFile}
          labels={labels}
          transcript={transcript}
          setTranscript={setTranscript}
          brand={brand}
          reseter={reseter}
        />
      ) : (
        isLoggedin && <Dropzone setUploadedFile={setUploadedFile} />
      )}
    </div>
  );
};

export default withRouter(PostVideo);
