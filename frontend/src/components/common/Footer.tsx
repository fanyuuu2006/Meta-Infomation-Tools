import "@/styles/Footer.css";
import { Space } from "antd";
import { OutsideLink } from "./OutsideLink";
import { InstagramOutlined } from "@ant-design/icons";
export const Footer = () => {
  return (
    <footer>
      <Space
        align="center"
        direction="vertical"
        wrap={false}
        className="Footer-Container"
        size={"small"}
      >
        <div className="Footer-Content Note">
          <OutsideLink href="https://www.instagram.com/fan._.yuuu">
            <InstagramOutlined
              title="作者 IG"
              style={{ color: "white", fontSize: "30px" }}
            />
          </OutsideLink>
        </div>
      </Space>
    </footer>
  );
};
