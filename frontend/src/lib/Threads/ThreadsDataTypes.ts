import { UserData } from "../CommonType";

type Followers = {
  text_post_app_text_post_app_followers: UserData[];
};

type Following = {
  text_post_app_text_post_app_following: UserData[];
};

export type ThreadsDataTypes = {
  UserData: UserData;
  Followers: Followers;
  Following: Following;
};

