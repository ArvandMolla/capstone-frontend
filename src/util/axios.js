import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
});
export default axiosInstance;

// const axiosVideoUpload = () => {
//   let formData = new FormData();
//   formData.append("video", video);

//   axios.post("upload", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//     onUploadProgress: (data) => {
//       setProgress(Math.round((100 * data.loaded) / data.total));
//     },
//   });
// };
