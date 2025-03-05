import "@/styles/Index/FileUploadSection.css";
import React, { useState } from "react";
import { Upload, Button, UploadFile, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { HandleJsonFile, NoFollowBackUsers } from "@/lib/HandleFunction";
import { Followers, Following, InstagramData, UserData } from "@/lib/DataTypes";

import { OutsideLink } from "./common/OutsideLink";
import { DateFromTimeStamp } from "../lib/HandleFunction";
import { Toast } from "./common/Swal";

type InstagramFile = {
  name: string;
  data: InstagramData;
};

export const FileUploadSection = () => {
  const [Data, setData] = useState<UserData[]>([]);
  const [File1, setFile1] = useState<InstagramFile | undefined>();
  const [File2, setFile2] = useState<InstagramFile | undefined>();

  const HandleChange1 = async ({ fileList }: { fileList: UploadFile[] }) => {
    try {
      const LatestFile = fileList.slice(-1)[0]; // 只保留最後一個
      const FileName = LatestFile.name;
      const FileData: InstagramData = await HandleJsonFile(
        LatestFile.originFileObj as File
      );
      Toast.fire({
        icon: "success",
        title: "上傳成功",
      });
      setFile1({ name: FileName, data: FileData });
    } catch (error) {
      console.error(error);
      Toast.fire({ icon: "error", title: "解析檔案失敗" });
    }
  };

  const HandleChange2 = async ({ fileList }: { fileList: UploadFile[] }) => {
    try {
      const LatestFile = fileList.slice(-1)[0]; // 只保留最後一個
      const FileName = LatestFile.name;
      const FileData: InstagramData = await HandleJsonFile(
        LatestFile.originFileObj as File
      );
      Toast.fire({
        icon: "success",
        title: "上傳成功",
      });
      setFile2({ name: FileName, data: FileData });
    } catch (error) {
      console.error(error);
      Toast.fire({ icon: "error", title: "解析檔案失敗" });
    }
  };

  const UploadFiles = () => {
    if (!File1 || !File2) {
      console.log("請先選擇檔案");
      Toast.fire({
        icon: "error",
        title: "請先選擇檔案",
      });
      return;
    }

    try {
      setData([]);

      setData(
        NoFollowBackUsers(File1?.data as Followers, File2?.data as Following)
      );
      setFile1(undefined);
      setFile2(undefined);
    } catch (error) {
      console.log(error);

      Toast.fire({
        icon: "error",
        title: "搜尋失敗",
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
            onChange={HandleChange1}
            beforeUpload={() => false}
          >
            <Button
              className="FileUpload-File-Button Content"
              icon={<UploadOutlined />}
            >
              選擇檔案
            </Button>
          </Upload>
          {File1?.name ?? "尚未上傳任何檔案"}
        </div>
        <div className="Label">Following 檔案</div>
        <div className="FileUpload-File-Div">
          <Upload
            showUploadList={false}
            multiple={false} // 只能選擇一個檔案
            onChange={HandleChange2}
            beforeUpload={() => false}
          >
            <Button
              className="FileUpload-File-Button Content"
              icon={<UploadOutlined />}
            >
              選擇檔案
            </Button>
          </Upload>
          {File2?.name ?? "尚未上傳任何檔案"}
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
