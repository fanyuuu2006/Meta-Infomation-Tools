export type UserID = string;

export type MediaData = {
  id: string; // 媒體的唯一識別碼
  url: string; // 媒體的網址
  caption: string; // 媒體的文字描述
  timestamp?: number; // 發佈時間戳
};

export type StringData = {
  href: string; // 使用者 IG 網址
  value: UserID; // 使用者 IG 的 ID
  timestamp?: number; // 追蹤時間戳
};

// 單一使用者資料
export type UserData = {
  title: string;
  media_list_data: MediaData[]; // media_list_data
  string_list_data: StringData[]; // string_list_data
};

// 被追蹤 (粉絲) 資料
export type Followers = UserData[];

// 正在追蹤中的用戶
export type Following = {
  relationships_following: UserData[];
};

// 正在追蹤中的標籤
export type FollowingHashtags = {
  relationships_following_hashtags: UserData[];
};

// 正在追蹤中
export type CloseFriends = {
  relationships_close_friends: UserData[];
};

// 已封鎖用戶
export type BlockedUser = Omit<UserData, "media_list_data">;
export type BlockedUsers = {
  relationships_blocked_users: BlockedUser[];
};

// 隱藏限時動態名單
export type HideStoriesFrom = {
  relationships_hide_stories_from: UserData[];
};

// 尚未獲得回應的追蹤請求
export type PendingFollowRequests = {
  relationships_follow_requests_sent: UserData[];
};

// 最近的歷史追蹤申請(不論拒絕與否)
export type RecentFollowRequests = {
  relationships_permanent_follow_requests: UserData[];
};

// 最近取消追蹤的用戶
export type RecentlyUnfollowedProfiles = {
  relationships_unfollowed_users: UserData[];
};


// 被使用者移除的「推薦用戶」
export type RemovedSuggestions={
  relationships_dismissed_suggested_users: UserData[];
};