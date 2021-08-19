import AdCard from "../components/AdCard.jsx";
import { Row, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import axiosInstance from "../util/axios";
const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

export default function Home() {
  const [homePageAds, setHomePageAds] = useState(null);

  useEffect(() => {
    fetchHomePageAds();
  }, []);

  const fetchHomePageAds = () => {
    axiosInstance
      .get("/ad")
      .then((res) => {
        setHomePageAds(res.data);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      {!homePageAds ? (
        <div className="waiting">
          <Spin indicator={antIcon} />
        </div>
      ) : (
        <Row gutter={24}>
          {homePageAds.map((elem) => (
            <AdCard ad={elem} />
          ))}
        </Row>
      )}
    </div>
  );
}
