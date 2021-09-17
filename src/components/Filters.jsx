import { Tag } from "antd";
import uniqid from "uniqid";

export default function Filters({
  reqLabels,
  reqBrand,
  setReqBrand,
  removeReqLabels,
  totalItems,
}) {
  return (
    <>
      <div className="top-filters-container">
        {reqLabels.length > 0 &&
          reqLabels.map((elem) => (
            <Tag
              color="green"
              closable
              onClose={(e) => {
                if (e.target.parentElement.parentElement.innerText) {
                  removeReqLabels(
                    e.target.parentElement.parentElement.innerText
                  );
                } else if (
                  e.target.parentElement.parentElement.parentElement.innerText
                ) {
                  removeReqLabels(
                    e.target.parentElement.parentElement.parentElement.innerText
                  );
                }
              }}
              key={uniqid()}
            >
              {elem}
            </Tag>
          ))}
        {reqBrand && (
          <Tag color="purple" closable onClose={() => setReqBrand(null)}>
            {reqBrand}
          </Tag>
        )}
        {reqLabels.length === 0 && !reqBrand && (
          <h1 className="page-main-title">Recent videos from all categories</h1>
        )}
      </div>
      {totalItems !== 0 && totalItems && (
        <div className="total-items">
          <p className="results">
            Total: <span className="total-number">{totalItems}</span>
          </p>
        </div>
      )}
    </>
  );
}
