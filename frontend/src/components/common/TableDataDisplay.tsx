import { OutsideLink } from "./OutsideLink";
import { CommonDataTypes } from "@/lib/CommonType";
import { DateFromTimeStamp } from "@/lib/HandleFunction";
import { TableColumnProps, Tooltip } from "antd";

export const UserDataColumns: TableColumnProps[] = [
  {
    title: "",
    dataIndex: "Index",
    key: "Index",
  },
  {
    title: "用戶 ID",
    dataIndex: "Value",
    key: "Value",
    render: (values: { href: string; UserID: string }) => (
      <OutsideLink href={values.href}>{values.UserID}</OutsideLink>
    ),
  },
  {
    title: "備註",
    dataIndex: "Note",
    key: "Note",
    render: (value) => DateFromTimeStamp(value),
  },
];

export const UserDataSource = (
  datas: CommonDataTypes["UserData"][]
): {
  Index: number;
  Value: { UserID: CommonDataTypes["UserID"]; href: string };
  Note: CommonDataTypes["TimeStamp"];
}[] =>
  datas.map((data: CommonDataTypes["UserData"], index: number) => {
    return {
      Index: index + 1,
      Value: {
        UserID: data.string_list_data?.[0].value ?? "未知用戶",
        href: data.string_list_data?.[0].href ?? "",
      },
      Note: data.string_list_data?.[0].timestamp ?? 0,
    };
  });

export const AppDataColumns: TableColumnProps[] = [
  {
    title: "",
    dataIndex: "Index",
    key: "Index",
  },
  {
    title: "名稱",
    dataIndex: "Title",
    key: "Title",
  },
  {
    title: "過期時間",
    dataIndex: "AppUserID",
    key: "AppUserID",
  },
  {
    title: "最後使用時間",
    dataIndex: "LastActiveOn",
    key: "LastActiveOn",
    render: (value) => DateFromTimeStamp(value),
  },
  {
    title: "過期時間",
    dataIndex: "ExpiredOn",
    key: "ExpiredOn",
    render: (value) => DateFromTimeStamp(value),
  },
];

export const AppDataSource = (
  datas: CommonDataTypes["AppData"][]
): {
  Index: number;
  Title: string;
  AppUserID: string;
  ExpiredOn: number;
  LastActiveOn: number;
}[] =>
  datas.map((data: CommonDataTypes["AppData"], index: number) => {
    return {
      Index: index + 1,
      Title: data.title ?? "未知",
      AppUserID: data.string_map_data?.["App user ID"].value ?? "未知",
      ExpiredOn: data.string_map_data?.["Expired on"].timestamp ?? 0,
      LastActiveOn: data.string_map_data?.["Last active on"].timestamp ?? 0,
    };
  });

export const ThreadsPostDataColumns: TableColumnProps[] = [
  {
    title: "",
    dataIndex: "Index",
    key: "Index",
  },
  {
    title: "發文用戶",
    dataIndex: "UserID",
    key: "UserID",
  },
  {
    title: "標題",
    dataIndex: "Caption",
    key: "Caption",
  },
  {
    title: "連結",
    dataIndex: "Href",
    key: "Href",
    render: (value) => value && <OutsideLink href={value}>前往</OutsideLink>,
  },
  {
    title: "備註",
    dataIndex: "Note",
    key: "Note",
    render: (value) => DateFromTimeStamp(value),
  },
];

export const ThreadsPostDataSource = (
  datas: CommonDataTypes["PostData" | "ThreadsData"][]
): {
  Index: number;
  UserID: CommonDataTypes["UserID"];
  Caption: string;
  Href: string;
  Note: CommonDataTypes["TimeStamp"];
}[] =>
  datas
    .map(
      (
        data: CommonDataTypes["PostData"] | CommonDataTypes["ThreadsData"],
        index: number
      ) =>
        "string_list_data" in data
          ? {
              Index: index + 1,
              UserID: data.title,
              Caption: null,
              Href: data.string_list_data?.[0].href,
              Note: data.string_list_data?.[0].timestamp ?? 0,
            }
          : "string_map_data" in data
          ? {
              Index: index + 1,
              UserID: data.string_map_data?.Author?.value ?? null,
              Caption: data.string_map_data?.Caption?.value ?? null,
              Href: data.string_map_data?.Url?.value ?? null,
              Note:
                data.string_map_data?.Time?.timestamp ??
                data.string_map_data?.["Creation Time"]?.timestamp ??
                null,
            }
          : null
    )
    .filter(
      (
        value
      ): value is {
        Index: number;
        UserID: string;
        Caption: string;
        Href: string;
        Note: number;
      } => value !== null
    );

export const MediaPostDataColumns: TableColumnProps[] = [
  {
    title: "",
    dataIndex: "Index",
    key: "Index",
  },
  {
    title: "標題",
    dataIndex: "Title",
    key: "Title",
    render: (text: string) => (
      <Tooltip title={text}>
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "block",
            maxWidth: "20vw", // 根據需要調整寬度
          }}
        >
          {text}
        </span>
      </Tooltip>
    ),
  },
  {
    title: "創建時間",
    dataIndex: "CreationTime",
    key: "CreationTime",
    render: (value: number) => DateFromTimeStamp(value), // 根據需要格式化時間戳
  },
  {
    title: "來源應用",
    dataIndex: "SourceApp",
    key: "SourceApp",
  },
  {
    title: "回覆控制",
    dataIndex: "ReplyControl",
    key: "ReplyControl",
  },
];

export const MediaPostDataSource = (
  datas: CommonDataTypes["MediaPostData"][]
): {
  Index: number;
  Title: string;
  CreationTime: CommonDataTypes["TimeStamp"];
  SourceApp: string;
  ReplyControl: string;
}[] =>
  datas.flatMap((data: CommonDataTypes["MediaPostData"], index: number) => {
    return data.media.map((media) => {
      return {
        Index: index + 1,
        Title: media.title ?? "無標題",
        CreationTime: media.creation_timestamp ?? 0,
        SourceApp: media.cross_post_source?.source_app ?? "",
        ReplyControl: media.text_app_post?.reply_control ?? "",
      };
    });
  });

export const FeedDataColumns: TableColumnProps[] = [
  {
    title: null,
    dataIndex: "Index",
    key: "Index",
  },
  {
    title: "動態消息",
    dataIndex: "FeedName",
    key: "FeedName",
  },
  {
    title: "動態類型",
    dataIndex: "FeedType",
    key: "FeedType",
  },
  {
    title: "主題",
    dataIndex: "AddedTopicNames",
    key: "AddedTopicNames",
  },
  {
    title: "用戶",
    dataIndex: "AddedUserNames",
    key: "AddedUserNames",
  },
];

export const FeedDataSource = (
  datas: CommonDataTypes["FeedData"][]
): {
  Index: number;
  FeedName: string;
  FeedType: string;
  AddedTopicNames: string;
  AddedUserNames: string;
}[] =>
  datas.map((data: CommonDataTypes["FeedData"], index: number) => {
    return {
      Index: index + 1,
      FeedName: data.string_map_data?.["Feed name"].value ?? "",
      FeedType: data.string_map_data?.["Feed type"].value ?? "",
      AddedTopicNames:
        data.string_map_data?.["Added topic names delimited by `|`"].value ??
        "",
      AddedUserNames:
        data.string_map_data?.["Added usernames delimited by `|`"].value ?? "",
    };
  });
