import "@/styles/Index/FileUploadSection.css";
import React, { useState } from "react";
import { Upload, Button, UploadFile, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { HandleJsonFile, NoFollowBackUsers } from "@/lib/HandleFunction";
import { Followers, Following, InstagramData, UserData } from "@/lib/DataTypes";

import { OutsideLink } from "./common/OutsideLink";
import { DateFromTimeStamp } from "../lib/HandleFunction";
import { Toast } from "./common/Swal";

export const FileUploadSection = () => {
  const [Data, setData] = useState<UserData[]>([]);
  const [fileList1, setFileList1] = useState<UploadFile[]>([]);
  const [fileList2, setFileList2] = useState<UploadFile[]>([]);

  const handleChange1 = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList1(fileList.slice(-1)); // 只保留最後一個
  };

  const handleChange2 = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList2(fileList.slice(-1)); // 只保留最後一個
  };

  const UploadFiles = async () => {
    if ([...fileList1, ...fileList2].length === 0) {
      console.log("請先選擇檔案");
      Toast.fire({
        icon: "error",
        title: "請先選擇檔案",
      });
      return;
    }

    try {
      setData([]);
      const FollowersFile: InstagramData = await HandleJsonFile(
        fileList1[0].originFileObj as File
      );
      const FollowingFile: InstagramData = await HandleJsonFile(
        fileList2[0].originFileObj as File
      );

      setData(
        NoFollowBackUsers(
          FollowingFile as Following,
          FollowersFile as Followers
        )
      );
      setFileList1([]);
      setFileList2([]);
      Toast.fire({
        icon: "success",
        title: "上傳成功",
      });
    } catch (error) {
      console.log(error);

      Toast.fire({
        icon: "error",
        title: "解析檔案錯誤",
        text: "請檢查檔案格式是否正確",
      });
    }
  };

  return (
    <div className="FileUpload-Container">
      <Space
        direction="vertical"
        align="start"
        wrap={false}
        className="FileUpload-Div"
        size={"small"}
      >
        <div className="Title BottomLine">上傳您的 JSON 檔案</div>
        <div className="Label">Followers 檔案</div>
        <div className="FileUpload-File-Div">
          <Upload
            showUploadList={false}
            multiple={false} // 只能選擇一個檔案
            fileList={fileList1}
            onChange={handleChange1}
            beforeUpload={() => false}
          >
            <Button
              className="FileUpload-File-Button Content"
              icon={<UploadOutlined />}
            >
              選擇檔案
            </Button>
          </Upload>
          {fileList1[0]?.name ?? "尚未上傳任何檔案"}
        </div>
        <div className="Label">Following 檔案</div>
        <div className="FileUpload-File-Div">
          <Upload
            showUploadList={false}
            multiple={false} // 只能選擇一個檔案
            fileList={fileList2}
            onChange={handleChange2}
            beforeUpload={() => false}
          >
            <Button
              className="FileUpload-File-Button Content"
              icon={<UploadOutlined />}
            >
              選擇檔案
            </Button>
          </Upload>
          {fileList2[0]?.name ?? "尚未上傳任何檔案"}
        </div>
        <Button type="primary" onClick={UploadFiles}>
          開始搜尋
        </Button>
      </Space>
      {Data.length !== 0 && (
        <>
          <Space
            direction="vertical"
            align="start"
            wrap={false}
            className="FileUpload-Div"
          >
            <div className="Label BottomLine">尚未回追您的用戶名單</div>
            <table className="FileUpload-Table">
              <tbody>
                {Data.map((user: UserData, index: number) => {
                  return (
                    <tr key={index} className="FileUpload-Table-Row Content">
                      <td>{index + 1}. </td>
                      <td className="FileUpload-Table-Data">
                        <OutsideLink href={user.string_list_data[0].href}>
                          {user.string_list_data[0].value}
                        </OutsideLink>
                      </td>
                      <td className="FileUpload-Table-Data Hint">
                        {user.string_list_data[0].timestamp
                          ? `您於 ${DateFromTimeStamp(
                              user.string_list_data[0].timestamp
                            )} 追蹤了此用戶`
                          : ""}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Button
              type="default"
              onClick={() => {
                setData([]);
              }}
            >
              關閉
            </Button>
          </Space>
        </>
      )}
    </div>
  );
};
