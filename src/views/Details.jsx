import { Row, Col, Tag } from "antd";
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import RelatedAdCard from "../components/RelatedAdCard";
import axiosInstance from "../util/axios";

function Details({
  match,
  pushReqLabel,
  setReqBrand,
  fetchFilteredAds,
  history,
}) {
  const [adData, setAdData] = useState(null);
  const [relatedAdsData, setRelatedAdsData] = useState(null);

  useEffect(() => {
    fetchSingleAd(match.params.id);
  }, []);

  useEffect(() => {
    if (adData) {
      fetchRelatedAds();
    }
  }, [adData]);

  const fetchRelatedAds = () => {
    axiosInstance
      .get(`/ad/result?labels=${adData.labels.join()}`)
      .then((res) => setRelatedAdsData(res.data.data.slice(0, 5)))
      .catch((error) => console.log(error.message));
  };

  const fetchSingleAd = (id) => {
    axiosInstance
      .get(`/ad/details/${id}`)
      .then((res) => setAdData(res.data))
      .catch((error) => console.log(error.message));
  };

  return (
    <>
      {adData && (
        <Row gutter={48} className="details-container">
          <Col xs={24} lg={18}>
            <video
              src={adData.videoUrl}
              type="video/mp4"
              width="100%"
              controls
            ></video>
            <h1>{adData.title}</h1>
            <p className="datails-transcript">{adData.transcript}</p>
            <div className="details-labels">
              {adData.labels.length > 0 &&
                adData.labels.map((elem) => (
                  <Tag
                    color="green"
                    key={elem._id}
                    onClick={() => {
                      pushReqLabel(elem);
                      history.push(`/`);
                      fetchFilteredAds();
                    }}
                  >
                    {elem}
                  </Tag>
                ))}
            </div>
            <div className="details-brand">
              {adData.brand && (
                <Tag
                  color="purple"
                  onClick={() => {
                    setReqBrand(adData.brand);
                    history.push(`/`);
                    fetchFilteredAds();
                  }}
                >
                  {adData.brand}
                </Tag>
              )}
            </div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <h2>Related Items</h2>
            <Row>
              {relatedAdsData &&
                relatedAdsData.map((elem) => (
                  <RelatedAdCard
                    ad={elem}
                    key={elem._id}
                    fetchSingleAd={fetchSingleAd}
                    pushReqLabel={pushReqLabel}
                    setReqBrand={setReqBrand}
                    fetchFilteredAds={fetchFilteredAds}
                  />
                ))}
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
}

export default withRouter(Details);
