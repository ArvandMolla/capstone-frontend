import { Tag } from "antd";
export default function LabelRender({ labels }) {
  return (
    <div className="labels-container">
      <>
        {labels.length > 0 ? (
          labels.map((elem) => <Tag color="green">{elem}</Tag>)
        ) : (
          <p>No label was found for this video</p>
        )}
      </>
    </div>
  );
}
