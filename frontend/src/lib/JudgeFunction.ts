import { InstagramData } from "./InstagramDataTypes";
import { ThreadsData } from "./ThreadsDataTypes";

export const isInstagramFollowers = (
  file: InstagramData<"Followers">
): boolean => {
  return Array.isArray(file) && file[0].string_list_data[0].value !== undefined;
};

export const isInstagramFollowing = (
  file: InstagramData<"Following">
): boolean => {
  return "relationships_following" in file;
};

export const isInstagramCloseFriends = (
    file: InstagramData<"CloseFriends">
  ): boolean => {
    return "relationships_close_friends" in file;
  };

  export const isInstagramBlockedUsers = (
    file: InstagramData<"BlockedUsers">
  ): boolean => {
    return "relationships_blocked_users" in file;
  };


export const isThreadsFollowers = (file: ThreadsData<"Followers">): boolean => {
  return "text_post_app_text_post_app_followers" in file;
};

export const isThreadsFollowing = (file: ThreadsData<"Following">): boolean => {
  return "text_post_app_text_post_app_following" in file;
};

export const JudgeFunction = {
  isInstagramFollowers,
  isInstagramFollowing,
  isInstagramCloseFriends,
  isInstagramBlockedUsers,
  isThreadsFollowers,
  isThreadsFollowing,
};
