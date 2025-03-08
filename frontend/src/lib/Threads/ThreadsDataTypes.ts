import { CommonDataTypes } from "../CommonType";

// 被追蹤 (粉絲) 資料
type Followers = {
  text_post_app_text_post_app_followers: CommonDataTypes["UserData"][];
};

// 正在追蹤中的用戶
type Following = {
  text_post_app_text_post_app_following: CommonDataTypes["UserData"][];
};

// 尚未獲得回應的追蹤請求
type PendingFollowRequests = {
  text_post_app_text_post_app_follow_requests_sent: CommonDataTypes["UserData"][];
};
// 最近的歷史追蹤申請(不論拒絕與否)
type RecentFollowRequests = {
  text_post_app_text_post_app_permanent_follow_requests: CommonDataTypes["UserData"][];
};

// 最近取消追蹤的用戶
type RecentlyUnfollowedProfiles = {
  text_post_app_text_post_app_unfollowed_users: CommonDataTypes["UserData"][];
};

// 按讚的串文
type LikedThreads = {
  text_post_app_media_likes: CommonDataTypes["ThreadsData"][];
};

type ThreadsViewed = {
  text_post_app_text_post_app_posts_seen: CommonDataTypes["ThreadsPostData"][];
};

// 用來描述用戶對不同 feed 的訂閱或興趣狀態
type InterestFeedsOnThreads = {
  text_post_app_text_app_interest_feeds: CommonDataTypes["FeedData"][];
};

export type ThreadsDataTypes = {
  Followers: Followers;
  Following: Following;
  PendingFollowRequests: PendingFollowRequests;
  RecentFollowRequests: RecentFollowRequests;
  InterestFeedsOnThreads: InterestFeedsOnThreads;
  RecentlyUnfollowedProfiles: RecentlyUnfollowedProfiles;
  LikedThreads: LikedThreads;
  ThreadsViewed: ThreadsViewed;
};
