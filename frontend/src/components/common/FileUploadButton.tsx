import { Upload, UploadProps, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile, UploadFile } from "antd/es/upload";

const HandleJsonFile: UploadProps["onChange"] = ({ file }) => {
  console.log(`已上傳檔案`);

  const FILE = (file as UploadFile).originFileObj || (file as RcFile); // file 本身是 UploadFile 不一定有 originFileObj

  if (!FILE) {
    message.error("無法讀取檔案");
    return;
  }

  if (FILE.type === "application/json") {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const JsonData = JSON.parse(e.target?.result as string);
        console.log(JsonData);
      } catch (error) {
        console.error("解析 JSON 失敗:", error);
        message.error("解析 JSON 失敗");
      }
    };

    reader.readAsText(FILE);
  } else {
    message.error(`${FILE.name} 不是 JSON 檔案`);
    console.log(`${FILE.name} 不是 JSON 檔案`);
  }
};

export const FileUploadButton: React.FC = () => {
  return (
    <>
      <Upload
        beforeUpload={() => false} // 取消自動上傳行為 (上傳到 /upload API )
        maxCount={1}
        onChange={HandleJsonFile} // 監聽檔案變更
      >
        <Button icon={<UploadOutlined />}>選擇檔案</Button>
      </Upload>
    </>
  );
};
