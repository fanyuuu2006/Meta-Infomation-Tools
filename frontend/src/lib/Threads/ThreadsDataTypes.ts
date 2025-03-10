import { TextKeyList, CommonDataTypes } from "../CommonType";

export type ThreadsDataTypes = {
  Followers: TextKeyList<
    "text_post_app_text_post_app_followers",
    CommonDataTypes["UserData"]
  >; // 被追蹤 (粉絲) 資料
  Following: TextKeyList<
    "text_post_app_text_post_app_following",
    CommonDataTypes["UserData"]
  >; // 正在追蹤中的用戶
  PendingFollowRequests: TextKeyList<
    "text_post_app_text_post_app_follow_requests_sent",
    CommonDataTypes["UserData"]
  >; // 尚未獲得回應的追蹤請求
  RecentFollowRequests: TextKeyList<
    "text_post_app_text_post_app_permanent_follow_requests",
    CommonDataTypes["UserData"]
  >; // 最近的歷史追蹤申請(不論拒絕與否)
  RecentlyUnfollowedProfiles: TextKeyList<
    "text_post_app_text_post_app_unfollowed_users",
    CommonDataTypes["UserData"]
  >; // 最近取消追蹤的用戶
  InterestFeedsOnThreads: TextKeyList<
    "text_post_app_text_app_interest_feeds",
    CommonDataTypes["FeedData"]
  >; // 用來描述用戶對不同 feed 的訂閱或興趣狀態
  LikedThreads: TextKeyList<
    "text_post_app_media_likes",
    CommonDataTypes["ThreadsData"]
  >; // 按讚的串文
  ThreadsViewed: TextKeyList<
    "text_post_app_text_post_app_posts_seen",
    CommonDataTypes["PostData"]
  >; // 看過的串文
  YourPostsWithoutNotifications: TextKeyList<
    "text_post_app_text_app_dyi_authored_post_disabled_notifications",
    CommonDataTypes["PostData"]
  >; // 關閉通知的串文
  ThreadsAndReplies: TextKeyList<
    "text_post_app_text_posts",
    CommonDataTypes["MediaPostData"]
  >;
  AppsAndWebsites: TextKeyList<
    "text_post_app_text_app_apps_and_websites",
    CommonDataTypes["AppData"]
  >;
};
