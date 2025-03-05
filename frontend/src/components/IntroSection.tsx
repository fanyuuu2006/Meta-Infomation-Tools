import "@/styles/Index/IntroSection.css";
import { Space } from "antd";

export const IntroSection = () => {
  return (
    <section>
      <Space
        direction="vertical"
        align="start"
        wrap={false}
        className="IntroSection-Div"
        size={"small"}
      >
        <span className="Title">飯魚的 Instagram Tool</span>
      </Space>
    </section>
  );
};
