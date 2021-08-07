import { useState, useEffect } from "react";

export default function FileUploader() {
  const [video, setVideo] = useState(null);

  const videoUpload = async () => {
    console.log("video in the state: ", video);
    try {
      let formData = new FormData();
      formData.append("video", video);
      console.log("form data: ", formData);

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
  return (
    <div>
      <input type="file" onChange={(e) => setVideo(e.target.files[0])}></input>
      <div>
        <button onClick={() => videoUpload()}>upload</button>
      </div>
    </div>
  );
}
