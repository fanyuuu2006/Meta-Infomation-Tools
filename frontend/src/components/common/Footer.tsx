import "@/styles/Footer.css";
import { Space } from "antd";
import { FaGithub } from "react-icons/fa";
import { OutsideLink } from "./OutsideLink";
export const Footer = () => {
  const year = new Date().getFullYear();
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
          <div></div>© {year}, 飯魚 版權所有.
          <br />© {year}, Fan-Yu, All rights reserved.
          <br />
          <OutsideLink href="https://github.com/fanyuuu2006/fanyu-web">
            <FaGithub title="GitHub Repository" color="white" size={20} />
          </OutsideLink>
        </div>
      </Space>
    </footer>
  );
};
