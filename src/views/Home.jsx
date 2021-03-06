import AdCard5 from "../components/AdCard5.jsx";
import { Row, Spin, Pagination } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

export default function Home({
  homePageAds,
  pushReqLabel,
  setReqBrand,
  totalItems,
  setCurrentPage,
  setUrlParams,
}) {
  const [numberOfPages, setNumberOfPages] = useState(null);

  useEffect(() => {
    if (totalItems) {
      paginationHandler(totalItems);
    }
  }, [totalItems]);

  const paginationHandler = (totalItems) => {
    const pageSize = 16;
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
                <AdCard5
                  ad={elem}
                  pushReqLabel={pushReqLabel}
                  setReqBrand={setReqBrand}
                  key={elem._id}
                  setUrlParams={setUrlParams}
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
