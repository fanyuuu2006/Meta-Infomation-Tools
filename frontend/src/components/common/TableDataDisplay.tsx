import { OutsideLink } from "./OutsideLink";
import { CommonDataTypes } from "@/lib/CommonType";
import { DateFromTimeStamp } from "@/lib/HandleFunction";
import { TableColumnProps } from "antd";

export const UserDataColumns: TableColumnProps[] = [
  {
    title: "序號",
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

export const ThreadsPostDataColumns: TableColumnProps[] = [
  {
    title: "序號",
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

export const FeedDataColumns: TableColumnProps[] = [
  {
    title: "序號",
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

export const UserDataSource = (
  data: CommonDataTypes["UserData"][]
): {
  Index: number;
  Value: { UserID: CommonDataTypes["UserID"]; href: string };
  Note: CommonDataTypes["TimeStamp"];
}[] =>
  data.map((data: CommonDataTypes["UserData"], index: number) => {
    return {
      Index: index + 1,
      Value: {
        UserID: data.string_list_data[0].value,
        href: data.string_list_data[0].href,
      },
      Note: data.string_list_data[0].timestamp ?? 0,
    };
  });

export const ThreadsPostDataSource = (
  data: CommonDataTypes["ThreadsPostData" | "ThreadsData"][]
): {
  Index: number;
  UserID: CommonDataTypes["UserID"];
  Caption: string;
  Href: string;
  Note: CommonDataTypes["TimeStamp"];
}[] =>
  data.map(
    (data: CommonDataTypes["ThreadsPostData" | "ThreadsData"], index: number) =>
      "string_list_data" in data
        ? {
            Index: index + 1,
            UserID: data.title,
            Caption: "",
            Href: data.string_list_data[0].href,
            Note: data.string_list_data[0].timestamp ?? 0,
          }
        : {
            Index: index + 1,
            UserID: data.string_map_data?.Author?.value ?? "",
            Caption: data.string_map_data?.Caption?.value ?? "",
            Href: data.string_map_data?.Url?.value ?? "",
            Note:
              data.string_map_data?.Time?.timestamp ??
              data.string_map_data?.["Creation Time"]?.timestamp ??
              0,
          }
  );

export const FeedDataSource = (
  data: CommonDataTypes["FeedData"][]
): {
  Index: number;
  FeedName: string;
  FeedType: string;
  AddedTopicNames: string;
  AddedUserNames: string;
}[] =>
  data.map((data: CommonDataTypes["FeedData"], index: number) => {
    return {
      Index: index + 1,
      FeedName: data.string_map_data["Feed name"].value,
      FeedType: data.string_map_data["Feed type"].value,
      AddedTopicNames:
        data.string_map_data["Added topic names delimited by `|`"].value,
      AddedUserNames:
        data.string_map_data["Added usernames delimited by `|`"].value,
    };
  });
