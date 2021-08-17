import { Tag } from "antd";
export default function LabelRender({ labels, color }) {
  return (
    <div className="labels-container">
      <>
        <span className="labels-label">Labels:</span>
        {labels.length > 0 ? (
          labels.map((elem) => <Tag color={color}>{elem}</Tag>)
        ) : (
          <p>No label was found for this video</p>
        )}
      </>
    </div>
  );
}
