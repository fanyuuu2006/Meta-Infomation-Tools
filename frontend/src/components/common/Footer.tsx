import "@/styles/Footer.css";
import { Space } from "antd";
import { FaGithub } from "react-icons/fa";
import { OutsideLink } from "./OutsideLink";
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
          <OutsideLink href="https://github.com/fanyuuu2006/IG-Tools">
            <FaGithub title="GitHub Repository" color="white" size={20} />
          </OutsideLink>
        </div>
      </Space>
    </footer>
  );
};
