type UserID = string; // 使用者ID
type HashtagName = string;
type ValueTypes = string | UserID | HashtagName;
type TimeStamp = number; // 自 1970 年 1 月 1 日 以來的秒數

type MediaData = {
  id: string; // 媒體的唯一識別碼
  url: string; // 媒體的網址
  caption: string; // 媒體的文字描述
  timestamp?: TimeStamp; // 發佈時間戳
};

type StringData<v extends ValueTypes> = {
  href: string; // 使用者網址
  value: v;
  timestamp?: TimeStamp; // 追蹤時間戳
};

// 單一使用者資料
type UserData = {
  title: string;
  media_list_data: MediaData[]; // media_list_data
  string_list_data: StringData<UserID>[]; // string_list_data
};

type HashtagData = {
  title: string;
  media_list_data: MediaData[]; // media_list_data
  string_list_data: StringData<HashtagName>[]; // string_list_data
};

type FeedData = {
  title: string;
  media_map_data: Record<string, MediaData>;
  string_map_data: {
    "Owner username": StringData<UserID>;
    "Feed name": StringData<string>;
    "Feed type": StringData<string>; // feed 的類型 "composite_list"、"archived"、"saved"、"liked"、"following"、"for_you"
    "Added topic names delimited by `|`": StringData<string>; // 新增的主題名稱
    "Added usernames delimited by `|`": StringData<string>; // 新增的使用者名稱
  };
};

export type CommonDataTypes = {
  UserID: UserID;
  HashtagName: HashtagName;
  MediaData: MediaData;
  StringData: StringData<ValueTypes>;
  TimeStamp: TimeStamp;
  UserData: UserData;
  HashtagData: HashtagData;
  FeedData: FeedData;
};
