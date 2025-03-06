export type UserID = string;
export type TimeStamp = number; // 自 1970 年 1 月 1 日 以來的秒數

export type MediaData = {
  id: string; // 媒體的唯一識別碼
  url: string; // 媒體的網址
  caption: string; // 媒體的文字描述
  timestamp?: TimeStamp; // 發佈時間戳
};

export type StringData = {
  href: string; // 使用者網址
  value: UserID; // 使用者ID
  timestamp?: TimeStamp; // 追蹤時間戳
};

// 單一使用者資料
export type UserData = {
    title: string;
    media_list_data: MediaData[]; // media_list_data
    string_list_data: StringData[]; // string_list_data
  };
  