import { Row, Col, Tag } from "antd";
import Comments from "../components/Comments.jsx";
import ContactInfo from "../components/ContactInfo.jsx";
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
  isLoggedin,
}) {
  const [adData, setAdData] = useState(null);
  const [relatedAdsData, setRelatedAdsData] = useState(null);
  const [comments, setComments] = useState(null);

  const adId = match.params.id;

  useEffect(() => {
    fetchSingleAd(adId);
    fetchComments(adId);
  }, []);

  useEffect(() => {
    if (adData) {
      fetchRelatedAds();
    }
  }, [adData]);

  const fetchComments = (id) => {
    axiosInstance
      .get(`/ad/${id}/comments`)
      .then((res) => setComments(res.data))
      .catch((error) => console.log(error.message));
  };

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
            <h1 className="detail-h1">{adData.title}</h1>
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
            <div>{adData && <ContactInfo user={adData.user} />}</div>
            <div className="comments-container">
              {comments && (
                <Comments
                  comments={comments}
                  adId={adId}
                  fetchComments={fetchComments}
                  isLoggedin={isLoggedin}
                />
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
                    fetchComments={fetchComments}
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
