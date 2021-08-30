import AdCard from "../components/AdCard.jsx";
import AdCard2 from "../components/AdCard2.jsx";
import AdCard3 from "../components/AdCard3.jsx";
import { Row, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import axiosInstance from "../util/axios";
const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

export default function Home({ homePageAds, pushReqLabel, setReqBrand }) {
  return (
    <div className="home-main">
      {!homePageAds && (
        <div className="waiting">
          <Spin indicator={antIcon} />
        </div>
      )}

      {homePageAds.length > 0 ? (
        <Row gutter={24}>
          {homePageAds.map((elem) => (
            <AdCard3
              ad={elem}
              pushReqLabel={pushReqLabel}
              setReqBrand={setReqBrand}
              key={elem._id}
            />
          ))}
        </Row>
      ) : (
        <h1>No result</h1>
      )}
    </div>
  );
}
