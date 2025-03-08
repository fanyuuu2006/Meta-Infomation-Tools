import { UserData } from "../CommonType";

type Followers = {
  text_post_app_text_post_app_followers: UserData[];
};

type Following = {
  text_post_app_text_post_app_following: UserData[];
};

type PendingFollowRequests = {
  text_post_app_text_post_app_follow_requests_sent: UserData[];
};

export type ThreadsDataTypes = {
  UserData: UserData;
  Followers: Followers;
  Following: Following;
  PendingFollowRequests: PendingFollowRequests;
};
