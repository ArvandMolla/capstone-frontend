import { Tag } from "antd";
export default function LabelRender({ color, brand }) {
  return (
    <div className="labels-container">
      <>
        {brand && (
          <>
            <span className="labels-label">Brand:</span>
            <Tag color={color}>{brand}</Tag>
          </>
        )}
      </>
    </div>
  );
}
