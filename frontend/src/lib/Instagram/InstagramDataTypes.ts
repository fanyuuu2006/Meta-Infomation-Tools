import { CommonDataTypes } from "../CommonType";
// 被追蹤 (粉絲) 資料
type Followers = CommonDataTypes["UserData"][];

// 正在追蹤中的用戶
type Following = {
  relationships_following: CommonDataTypes["UserData"][];
};

// 正在追蹤中的標籤
type FollowingHashtags = {
  relationships_following_hashtags: CommonDataTypes["HashtagData"][];
};

// 正在追蹤中
type CloseFriends = {
  relationships_close_friends: CommonDataTypes["UserData"][];
};

// 已封鎖用戶
type BlockedUserData = {
  title: CommonDataTypes["UserID"];
  string_list_data: [
    {
      href?: string;
      timestamp: CommonDataTypes["TimeStamp"];
    }
  ];
};

type BlockedUsers = {
  relationships_blocked_users: BlockedUserData[];
};

// 隱藏限時動態名單
type HideStoriesFrom = {
  relationships_hide_stories_from: CommonDataTypes["UserData"][];
};

// 尚未獲得回應的追蹤請求
type PendingFollowRequests = {
  relationships_follow_requests_sent: CommonDataTypes["UserData"][];
};

// 最近的歷史追蹤申請(不論拒絕與否)
type RecentFollowRequests = {
  relationships_permanent_follow_requests: CommonDataTypes["UserData"][];
};

// 最近取消追蹤的用戶
type RecentlyUnfollowedProfiles = {
  relationships_unfollowed_users: CommonDataTypes["UserData"][];
};

// 被使用者移除的「推薦用戶」
type RemovedSuggestions = {
  relationships_dismissed_suggested_users: CommonDataTypes["UserData"][];
};

type HideStoryFrom = {
  relationships_hide_stories_from: CommonDataTypes["UserData"][];
};

export type InstagramDataTypes = {
  BlockedUserData: BlockedUserData;
  Followers: Followers;
  Following: Following;
  FollowingHashtags: FollowingHashtags;
  CloseFriends: CloseFriends;
  BlockedUsers: BlockedUsers;
  HideStoriesFrom: HideStoriesFrom;
  PendingFollowRequests: PendingFollowRequests;
  RecentFollowRequests: RecentFollowRequests;
  RecentlyUnfollowedProfiles: RecentlyUnfollowedProfiles;
  RemovedSuggestions: RemovedSuggestions;
  HideStoryFrom: HideStoryFrom;
};
