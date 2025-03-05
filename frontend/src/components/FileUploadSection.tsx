import "@/styles/Index/FileUploadSection.css";
import React, { useState } from "react";
import { Upload, Button, UploadFile, Space, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import {
  MethodNames,
  HandleJsonFile,
  NoFollowBackUsers,
  NoFollowingBackUsers,
  FollowerUsers,
  FollowingUsers,
} from "@/lib/HandleFunction";

import {
  Followers,
  Following,
  InstagramData,
  TimeStamp,
  UserData,
} from "@/lib/DataTypes";

import { OutsideLink } from "./common/OutsideLink";
import { DateFromTimeStamp } from "../lib/HandleFunction";
import { Toast } from "./common/Swal";

type InstagramFile = {
  name: string;
  data: InstagramData;
};

const Methods: Record<
  MethodNames,
  {
    func: (File1: InstagramData, File2: InstagramData) => UserData[];
    fileNames: string[]; // 儲存需要的檔案名稱
    listTitle: string;
    note: (...args: unknown[]) => string;
  }
> = {
  NoFollowBackUsers: {
    func: (File1, File2) => {
      return NoFollowBackUsers(File1 as Followers, File2 as Following);
    },
    fileNames: ["Followers", "Following"],
    listTitle: "尚未回追您的用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `於 ${DateFromTimeStamp(timestamp)} 被您追蹤`;
    },
  },
  NoFollowingBackUsers: {
    func: (File1, File2) => {
      return NoFollowingBackUsers(File1 as Following, File2 as Followers);
    },
    fileNames: ["Following", "Followers"],
    listTitle: "您尚未回追的用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `於 ${DateFromTimeStamp(timestamp)} 追蹤您`;
    },
  },
  FollowerUsers: {
    func: (File1) => {
      return FollowerUsers(File1 as Followers);
    },
    fileNames: ["Followers"],
    listTitle: "您的粉絲用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `於 ${DateFromTimeStamp(timestamp)} 追蹤您`;
    },
  },
  FollowingUsers: {
    func: (File1) => {
      return FollowingUsers(File1 as Following);
    },
    fileNames: ["Following"],
    listTitle: "您追蹤的用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `於 ${DateFromTimeStamp(timestamp)} 被您追蹤`;
    },
  },
};

export const FileUploadSection = () => {
  const [MethodName, setMethodName] =
    useState<MethodNames>("NoFollowBackUsers");
  const [Data, setData] = useState<UserData[]>([]);
  const [Files, setFiles] = useState<InstagramFile[]>([]);

  const HandleChange = async (
    index: number,
    {
      fileList,
    }: {
      fileList: UploadFile[];
    }
  ): Promise<void> => {
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
      const updatedFiles = [...Files]; //  已上傳檔案
      updatedFiles[index] = { name: FileName, data: FileData };
      setFiles(updatedFiles);
    } catch (error) {
      console.error(error);
      Toast.fire({ icon: "error", title: "解析檔案失敗" });
    }
  };

  const UploadFiles = (): void => {
    if (Files.length !== Methods[MethodName].fileNames.length) {
      Toast.fire({
        icon: "error",
        title: "所需上傳檔案不足",
      });
      return;
    }

    try {
      setData([]);

      setData(Methods[MethodName].func(Files[0]?.data, Files[1]?.data));
      setFiles([]);
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
    <section>
      <Space
        direction="vertical"
        align="start"
        wrap={false}
        className="FileUpload-Div"
        size={"small"}
      >
        <div className="Content">選擇功能類型</div>
        <Select
          value={MethodName}
          onChange={(value) => {
            setData([]);
            setMethodName(value as MethodNames);
          }}
        >
          {Object.keys(Methods).map((key: string, index: number) => (
            <Select.Option key={key} value={key}>
              {`${index + 1}. ${Methods[key as MethodNames].listTitle}`}
            </Select.Option>
          ))}
        </Select>

        <div className="Title BottomLine">請上傳您的 JSON 檔案</div>
        {Methods[MethodName].fileNames.map(
          (fileName: string, index: number) => {
            return (
              <>
                <div className="Label" key={index}>
                  {fileName} 檔案
                </div>
                <div className="FileUpload-File-Div">
                  <Upload
                    showUploadList={false}
                    multiple={false} // 只能選擇一個檔案
                    onChange={(fileInfo) => HandleChange(index, fileInfo)}
                    beforeUpload={() => false}
                  >
                    <Button
                      className="FileUpload-File-Button Content"
                      icon={<UploadOutlined />}
                    >
                      選擇檔案
                    </Button>
                  </Upload>
                  {Files[index]?.name ?? "尚未上傳任何檔案"}
                </div>
              </>
            );
          }
        )}
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
            <div className="Label BottomLine">
              {Methods[MethodName].listTitle}
            </div>
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
                        {Methods[MethodName].note(
                          user.string_list_data[0].timestamp
                        )}
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
    </section>
  );
};
