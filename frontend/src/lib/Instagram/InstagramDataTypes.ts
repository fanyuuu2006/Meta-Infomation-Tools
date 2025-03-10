import { TextKeyList, CommonDataTypes } from "../CommonType";

type BlockedUserData = {
  title: CommonDataTypes["UserID"];
  string_list_data: [
    {
      href?: string;
      timestamp: CommonDataTypes["TimeStamp"];
    }
  ];
};

export type InstagramDataTypes = {
  BlockedUserData: BlockedUserData;
  Followers: CommonDataTypes["UserData"][]; // 被追蹤 (粉絲) 資料
  Following: TextKeyList<
    "relationships_following",
    CommonDataTypes["UserData"]
  >;
  FollowingHashtags: TextKeyList<
    "relationships_following_hashtags",
    CommonDataTypes["HashtagData"]
  >; // 正在追蹤中的標籤
  CloseFriends: TextKeyList<
    "relationships_close_friends",
    CommonDataTypes["UserData"]
  >; // 摯友名單
  BlockedUsers: TextKeyList<"relationships_blocked_users", BlockedUserData>; // 已封鎖用戶名單
  PendingFollowRequests: TextKeyList<
    "relationships_follow_requests_sent",
    CommonDataTypes["UserData"]
  >; // 尚未獲得回應的追蹤請求
  RecentFollowRequests: TextKeyList<
    "relationships_permanent_follow_requests",
    CommonDataTypes["UserData"]
  >; // 最近的歷史追蹤申請(不論拒絕與否)
  RecentlyUnfollowedProfiles: TextKeyList<
    "relationships_unfollowed_users",
    CommonDataTypes["UserData"]
  >; // 最近取消追蹤的用戶
  RemovedSuggestions: TextKeyList<
    "relationships_dismissed_suggested_users",
    CommonDataTypes["UserData"]
  >; // 被使用者移除的「推薦用戶」
  HideStoryFrom: TextKeyList<
    "relationships_hide_stories_from",
    CommonDataTypes["UserData"]
  >; // 隱藏限時動態名單
  LikedComments: TextKeyList<
    "likes_comment_likes",
    CommonDataTypes["CommentData"]
  >;
  LikedPosts: TextKeyList<"likes_media_likes", CommonDataTypes["CommentData"]>;
  RecommendedTopics: TextKeyList<
    "topics_your_topics",
    CommonDataTypes["TopicData"]
  >;
  Polls: TextKeyList<"story_activities_polls", CommonDataTypes["CommentData"]>;
};
