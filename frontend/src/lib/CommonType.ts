type UserID = string;
type HashtagName = string;
type ValueTypes = string | UserID | HashtagName;
type TimeStamp = number;

export type MediaData = {
  id: string;
  url: string;
  caption: string;
  timestamp?: TimeStamp;
};

export type StringData<V extends ValueTypes> = {
  href: string;
  value: V;
  timestamp?: TimeStamp;
};

export type MediaMapData<K extends string> = Record<K, MediaData>;

export type StringMapData<K extends string> = Record<K, StringData<string>>;

export type BaseListData<T extends ValueTypes> = {
  title: string;
  media_list_data: MediaData[];
  string_list_data: StringData<T>[];
};

export type BaseMapData<M extends string, S extends string> = {
  title: string;
  media_map_data: MediaMapData<M>;
  string_map_data: StringMapData<S>;
};

export type TextKeyList<K extends string, V> = { [key in K]: V[] };

// **統一的資料類型**
export type CommonDataTypes = {
  UserID: UserID;
  HashtagName: HashtagName;
  TimeStamp: TimeStamp;

  UserData: BaseListData<UserID>;
  HashtagData: BaseListData<HashtagName>;
  ThreadsData: BaseListData<string>;

  // 貼文
  ThreadsPostData: BaseMapData<
    string,
    "Author" | ("Time" | "Creation Time") | "Url" | "Creation Time" | "Caption"
  >;
  // 動態消息
  FeedData: BaseMapData<
    string,
    | "Owner username"
    | "Feed name"
    | "Feed type"
    | "Added topic names delimited by `|`"
    | "Added usernames delimited by `|`"
  >;
};
