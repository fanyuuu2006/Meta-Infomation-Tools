type TimeStamp = number;

// 相機元數據
export type CameraMetadata = {
  has_camera_metadata: boolean;
};

// exif數據 Exchangeable Image File Format（可交換圖文格式）
export type ExifData = {
  device_id?: string;
  source_type?: string;
};

// 照片的元數據
export type PhotoMetadata = {
  exif_data?: ExifData[];
};

// 媒體的元數據
export type MediaMetadata = {
  camera_metadata?: CameraMetadata;
  photo_metadata?: PhotoMetadata;
};

export type TextAppPost = {
  reply_control?: string; //回覆控制
  geo_gated_country_list?: string; // 地區限制
};

// 貼文媒體資訊
export type MediaData = {
  uri?: string; //統一資源識別符 應該是 URL media/posts/202407/451751540_1005558564631602_820332478116517495_n_18306097531084398.webp
  creation_timestamp?: TimeStamp;
  media_metadata?: MediaMetadata;
  title?: string;
  cross_post_source?: {
    source_app?: string;
  };
  text_app_post?: TextAppPost;
};

export type StringData = {
  href?: string;
  value?: string;
  timestamp?: TimeStamp;
};

export type MediaMapData<K extends string> = Record<K, MediaData>;

export type StringMapData<K extends string> = Record<K, StringData>;

export type BaseListData = {
  title?: string;
  media_list_data?: MediaData[];
  string_list_data?: StringData[];
};

export type BaseMapData<M extends string, S extends string> = {
  title?: string;
  media_map_data?: MediaMapData<M>;
  string_map_data?: StringMapData<S>;
};

export type TextKeyList<K extends string, V> = Record<K, V[]>;

// **統一的資料類型**
export type CommonDataTypes = {
  UserID: string;
  HashtagName: string;
  TimeStamp: TimeStamp;

  UserData: BaseListData;
  CommentData: BaseListData;
  HashtagData: BaseListData;
  AppData: BaseMapData<string, "Expired on" | "Last active on" | "App user ID">;

  // 貼文
  PostData: BaseMapData<
    string,
    | "Author"
    | "Time"
    | "Creation Time"
    | "Url"
    | "Caption"
    | "Update Time"
    | "Name"
    | "Added Time"
  >;
  MediaPostData: Record<"media", MediaData[]>;

  // 主題 動態消息
  TopicData: BaseMapData<
    string,
    | "Owner username"
    | "Name"
    | "Feed name"
    | "Feed type"
    | "Added topic names delimited by `|`"
    | "Added usernames delimited by `|`"
  >;
};
