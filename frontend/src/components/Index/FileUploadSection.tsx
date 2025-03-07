import "@/styles/Index/FileUploadSection.css";
import React, { useState } from "react";
import { Upload, Button, UploadFile, Space, Select, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { HandleJsonFile } from "@/lib/HandleFunction";

import { InstagramData, InstagramDataTypes } from "@/lib/InstagramDataTypes";
import { ThreadsData, ThreadsDataTypes } from "@/lib/ThreadsDataTypes";

import { OutsideLink } from "../common/OutsideLink";
import { Toast } from "../common/Swal";
import { FeatureMethods } from "./FeatureMethod";

type DataFile = {
  name: string;
  data:
    | InstagramData<keyof InstagramDataTypes>
    | ThreadsData<keyof ThreadsDataTypes>;
};

export const FileUploadSection = () => {
  const [MethodName, setMethodName] = useState<string>(
    "InstagramNoFollowersBackUsers"
  );
  const [Data, setData] = useState<InstagramData<"UserData">[]>([]);
  const [Files, setFiles] = useState<DataFile[]>([]);

  const [SearchQuery, setSearchQuery] = useState<string>("");
  const FilteredData = Data.filter((user) =>
    user.string_list_data[0].value
      .toLowerCase()
      .includes(SearchQuery.toLowerCase())
  );

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
      const FileData = await HandleJsonFile(LatestFile.originFileObj as File);
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
    if (Files.length !== FeatureMethods[MethodName].fileNames.length) {
      Toast.fire({
        icon: "error",
        title: "所需上傳檔案不足",
      });
      return;
    }

    try {
      setData([]);
      setSearchQuery("");
      setData(
        FeatureMethods[MethodName].func(
          Files.map((file: DataFile) => file.data)
        )
      );
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
            setMethodName(value);
          }}
          virtual={false} // 關閉虛擬滾動，避免滾動問題
        >
          {Object.entries(FeatureMethods).map(([key, method], index) => (
            <Select.Option key={key} value={key}>
              {`${index + 1}. ${method.listTitle}`}
            </Select.Option>
          ))}
        </Select>

        <div className="Title BottomLine">請上傳您的 JSON 檔案</div>
        {FeatureMethods[MethodName].fileNames.map(
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
              {FeatureMethods[MethodName].listTitle}
            </div>
            <Input
              placeholder="搜尋"
              value={SearchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
            <table className="FileUpload-Table">
              <tbody>
                {FilteredData.length !== 0 &&
                  FilteredData.map(
                    (user: InstagramData<"UserData">, index: number) => {
                      return (
                        <tr
                          key={index}
                          className="FileUpload-Table-Row Content"
                        >
                          <td>{index + 1}. </td>
                          <td className="FileUpload-Table-Data">
                            <OutsideLink href={user.string_list_data[0]?.href}>
                              {user.string_list_data[0]?.value}
                            </OutsideLink>
                          </td>
                          <td className="FileUpload-Table-Data Hint">
                            {FeatureMethods[MethodName].note(
                              user.string_list_data[0]?.timestamp
                            )}
                          </td>
                        </tr>
                      );
                    }
                  )}
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
