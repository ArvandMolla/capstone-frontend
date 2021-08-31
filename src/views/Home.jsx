import AdCard3 from "../components/AdCard3.jsx";
import { Row, Spin, Pagination } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import axiosInstance from "../util/axios";
const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

export default function Home({
  homePageAds,
  pushReqLabel,
  setReqBrand,
  totalItems,
  setCurrentPage,
}) {
  const [numberOfPages, setNumberOfPages] = useState(null);

  useEffect(() => {
    if (totalItems) {
      paginationHandler(totalItems);
    }
  }, [totalItems]);

  const paginationHandler = (totalItems) => {
    const pageSize = 8;
    const numberOfPages = Math.ceil(totalItems / pageSize);
    setNumberOfPages(numberOfPages);
  };

  return (
    <div className="home-main">
      <>
        <div>
          {!homePageAds && (
            <div className="waiting">
              <Spin indicator={antIcon} />
            </div>
          )}

          {homePageAds && homePageAds.length > 0 && (
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
          )}
          {homePageAds && homePageAds.length === 0 && <h1>No result</h1>}
        </div>
        <div className="pagination">
          <Pagination
            total={numberOfPages * 10}
            hideOnSinglePage
            onChange={(page, pageSize) => setCurrentPage(page)}
            defaultCurrent={2}
          />
        </div>
      </>
    </div>
  );
}
