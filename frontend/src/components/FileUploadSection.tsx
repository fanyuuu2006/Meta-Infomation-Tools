import "@/styles/Index/FileUploadSection.css";
import React, { useState } from "react";
import { Upload, Button, message, UploadFile, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { HandleJsonFile, NoFollowBackUsers } from "@/lib/HandleFunction";
import { Followers, Following, InstagramData, UserData } from "@/lib/DataTypes";

import { OutsideLink } from "./common/OutsideLink";

export const FileUploadSection = () => {
  const [Data, setData] = useState<UserData[]>([]);
  const [fileList1, setFileList1] = useState<UploadFile[]>([]);
  const [fileList2, setFileList2] = useState<UploadFile[]>([]);
  const handleChange1 = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList1(fileList);
  };

  const handleChange2 = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList2(fileList);
  };

  const UploadFiles = async () => {
    if ([...fileList1, ...fileList2].length === 0) {
      console.log("請先選擇檔案");

      message.error("請先選擇檔案");
      return;
    }
    try {
      const FollowersFile: InstagramData = await HandleJsonFile(
        fileList1[0].originFileObj as File
      );
      const FollowingFile: InstagramData = await HandleJsonFile(
        fileList2[0].originFileObj as File
      );

      setData(
        NoFollowBackUsers(
          FollowersFile as Followers,
          FollowingFile as Following
        )
      );
    } catch (error) {
      console.log(error);

      message.error(`${error}`);
    }
    setFileList1([]);
    setFileList2([]);
  };

  return (
    <div className="FileUpload-Container">
      <Space
        direction="vertical"
        align="center"
        wrap={false}
        className="FileUpload-Div"
        size={"small"}
      >
        <div className="FileUpload-Title BottomLine">上傳你的 JSON 檔案</div>
        <div className="FileUpload-Label">Followers 檔案</div>
        <Upload
          showUploadList={false}
          multiple={false} // 只能選擇一個檔案
          fileList={fileList1}
          onChange={handleChange1}
          beforeUpload={() => false}
        >
          <Button className="FileUpload-FileButton" icon={<UploadOutlined />}>
            選擇檔案
          </Button>
        </Upload>
        <div className="FileUpload-Label">Following 檔案</div>

        <Upload
          showUploadList={false}
          multiple={false} // 只能選擇一個檔案
          fileList={fileList2}
          onChange={handleChange2}
          beforeUpload={() => false}
        >
          <Button className="FileUpload-FileButton" icon={<UploadOutlined />}>
            選擇檔案
          </Button>
        </Upload>

        <Button type="primary" onClick={UploadFiles}>
          開始搜尋
        </Button>
      </Space>
      {Data.length !== 0 && (
        <>
          <Space
            direction="vertical"
            align="center"
            wrap={false}
            className="FileUpload-Div"
          >
            <div className="FileUpload-Label BottomLine">你追蹤而沒回追你的名單</div>
            <table>
              <tbody>
                {Data.map((user: UserData) => {
                  return (
                    <tr
                      key={user.string_list_data[0].value}
                      className="FileUpload-Content "
                    >
                      <OutsideLink href={user.string_list_data[0].href}>
                        {user.string_list_data[0].value}
                      </OutsideLink>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Space>
        </>
      )}
    </div>
  );
};
