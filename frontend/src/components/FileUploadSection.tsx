import "@/styles/Index/FileUploadSection.css";
import React, { useState } from "react";
import { Upload, Button, UploadFile, Space, Tabs } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import {
  MethodNames,
  HandleJsonFile,
  NoFollowBackUsers,
  NoFollowingBackUsers,
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
    fileName1: string;
    fileName2: string;
    listTitle: string;
    note: (...args: unknown[]) => string;
  }
> = {
  NoFollowBackUsers: {
    func: (File1, File2) => {
      return NoFollowBackUsers(File1 as Followers, File2 as Following);
    },
    fileName1: "Followers",
    fileName2: "Following",
    listTitle: "尚未回追您的用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `您於 ${DateFromTimeStamp(timestamp)} 追蹤此用戶`;
    },
  },
  NoFollowingBackUsers: {
    func: (File1, File2) => {
      return NoFollowingBackUsers(File1 as Following, File2 as Followers);
    },
    fileName1: "Following",
    fileName2: "Followers",
    listTitle: "您尚未回追的用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `於 ${DateFromTimeStamp(timestamp)} 開始追蹤您`;
    },
  },
};

export const FileUploadSection = () => {
  const [MethodName, setMethodName] =
    useState<MethodNames>("NoFollowBackUsers");
  const [Data, setData] = useState<UserData[]>([]);
  const [File1, setFile1] = useState<InstagramFile | undefined>();
  const [File2, setFile2] = useState<InstagramFile | undefined>();

  const HandleChange1 = async ({
    fileList,
  }: {
    fileList: UploadFile[];
  }): Promise<void> => {
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

  const HandleChange2 = async ({
    fileList,
  }: {
    fileList: UploadFile[];
  }): Promise<void> => {
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

  const UploadFiles = (): void => {
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
        Methods[MethodName].func(
          File1?.data as Followers,
          File2?.data as Following
        )
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
    <section>
      <Space
        direction="vertical"
        align="start"
        wrap={false}
        className="FileUpload-Div"
        size={"small"}
      >
        <Tabs
          activeKey={MethodName}
          onChange={(key) => {
            setData([]);
            setMethodName(key as MethodNames);
          }}
        >
          <Tabs.TabPane tab="未回追的用戶" key="NoFollowBackUsers" />
          <Tabs.TabPane tab="我沒回追的用戶" key="NoFollowingBackUsers" />
        </Tabs>

        <div className="Title BottomLine">請上傳您的 JSON 檔案</div>
        <div className="Label">{Methods[MethodName].fileName1} 檔案</div>
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
        <div className="Label">{Methods[MethodName].fileName2} 檔案</div>
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
            <div className="Label BottomLine">{Methods[MethodName].listTitle}</div>
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
