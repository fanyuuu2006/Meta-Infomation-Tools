import { TimeStamp } from "@/lib/CommonType";
import {
  DateFromTimeStamp,
  FollowEachOtherUsers,
  GetBlockedUserDatas,
  GetUserDatas,
  isValidData,
  NoFollowersBackUsers,
  NoFollowingBackUsers,
} from "@/lib/HandleFunction";
import { InstagramDataTypes } from "@/lib/Instagram/InstagramDataTypes";

export const InstagramFeatureMethods: Record<
  string,
  {
    func: (Datas: unknown[]) => InstagramDataTypes["UserData"][];
    fileNames: string[]; // 儲存需要的檔案名稱
    listTitle: string;
    note: (...args: unknown[]) => string;
  }
> = {
  NoFollowersBack: {
    func: (Datas: unknown[]) => {
      const file1 = Datas[0] as InstagramDataTypes["Followers"];
      const file2 = Datas[1] as InstagramDataTypes["Following"];
      if (
        !isValidData<InstagramDataTypes, "Followers">(
          file1,
          (data: InstagramDataTypes["Followers"]) => Array.isArray(data)
        ) ||
        !isValidData<InstagramDataTypes, "Following">(
          file2,
          (data: InstagramDataTypes["Following"]) =>
            "relationships_following" in data
        )
      ) {
        throw new Error("資料格式有誤");
      }
      return NoFollowersBackUsers(file1, file2);
    },
    fileNames: ["Followers", "Following"],
    listTitle: "(Instagram) 尚未回追您的用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `於 ${DateFromTimeStamp(timestamp)} 被您追蹤`;
    },
  },

  NoFollowingBack: {
    func: (Datas: unknown[]) => {
      const file1 = Datas[0] as InstagramDataTypes["Following"];
      const file2 = Datas[1] as InstagramDataTypes["Followers"];
      if (
        !isValidData<InstagramDataTypes, "Following">(
          file1,
          (data: InstagramDataTypes["Following"]) =>
            "relationships_following" in data
        ) ||
        !isValidData<InstagramDataTypes, "Followers">(
          file2,
          (data: InstagramDataTypes["Followers"]) => Array.isArray(data)
        )
      ) {
        throw new Error("資料格式有誤");
      }
      return NoFollowingBackUsers(file1, file2);
    },
    fileNames: ["Following", "Followers"],
    listTitle: "(Instagram) 您尚未回追的用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `於 ${DateFromTimeStamp(timestamp)} 追蹤您`;
    },
  },

  Follower: {
    func: (Datas: unknown[]) => {
      const file1 = Datas[0] as InstagramDataTypes["Followers"];
      if (
        !isValidData<InstagramDataTypes, "Followers">(
          file1,
          (data: InstagramDataTypes["Followers"]) => Array.isArray(data)
        )
      ) {
        throw new Error("資料格式有誤");
      }
      return GetUserDatas(file1) as InstagramDataTypes["UserData"][];
    },
    fileNames: ["Followers"],
    listTitle: "(Instagram) 您的粉絲用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `於 ${DateFromTimeStamp(timestamp)} 追蹤您`;
    },
  },

  Following: {
    func: (Datas: unknown[]) => {
      const file1 = Datas[0] as InstagramDataTypes["Following"];
      if (
        !isValidData<InstagramDataTypes, "Following">(
          file1,
          (data: InstagramDataTypes["Following"]) =>
            "relationships_following" in data
        )
      ) {
        throw new Error("資料格式有誤");
      }
      return GetUserDatas(file1) as InstagramDataTypes["UserData"][];
    },
    fileNames: ["Following"],
    listTitle: "(Instagram) 您追蹤的用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `於 ${DateFromTimeStamp(timestamp)} 被您追蹤`;
    },
  },

  FollowEachOther: {
    func: (Datas: unknown[]) => {
      const file1 = Datas[0] as InstagramDataTypes["Followers"];
      const file2 = Datas[1] as InstagramDataTypes["Following"];
      if (
        !isValidData<InstagramDataTypes, "Followers">(
          file1,
          (data: InstagramDataTypes["Followers"]) => Array.isArray(data)
        ) ||
        !isValidData<InstagramDataTypes, "Following">(
          file2,
          (data: InstagramDataTypes["Following"]) =>
            "relationships_following" in data
        )
      ) {
        throw new Error("資料格式有誤");
      }
      return FollowEachOtherUsers(file1, file2);
    },
    fileNames: ["Followers", "Following"],
    listTitle: "(Instagram) 與您互相追蹤的用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `於 ${DateFromTimeStamp(timestamp)} 追蹤您`;
    },
  },

  NewFollowers: {
    func: (Datas: unknown[]) => {
      const file1 = Datas[0] as InstagramDataTypes["Followers"];
      const file2 = Datas[1] as InstagramDataTypes["Followers"];
      if (
        [file1, file2].some(
          (file) =>
            !isValidData<InstagramDataTypes, "Followers">(file, (data) =>
              Array.isArray(data)
            )
        )
      ) {
        throw new Error("資料格式有誤");
      }
      const OldFollowers = GetUserDatas(file2).map(
        (user2: InstagramDataTypes["UserData"]) =>
          user2.string_list_data[0].value
      );

      return GetUserDatas(file1).filter(
        (user1: InstagramDataTypes["UserData"]) =>
          !OldFollowers.includes(user1.string_list_data[0].value)
      );
    },
    fileNames: ["New Followers", "Old Followers"],
    listTitle: "(Instagram) 您的新粉絲的用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `於 ${DateFromTimeStamp(timestamp)} 追蹤您`;
    },
  },

  CloseFriends: {
    func: (Datas: unknown[]) => {
      const file1 = Datas[0] as InstagramDataTypes["CloseFriends"];
      if (
        !isValidData<InstagramDataTypes, "CloseFriends">(
          file1,
          (data: InstagramDataTypes["CloseFriends"]) =>
            "relationships_close_friends" in data
        )
      ) {
        throw new Error("資料格式有誤");
      }
      return GetUserDatas<InstagramDataTypes, "CloseFriends">(
        file1
      ) as InstagramDataTypes["UserData"][];
    },
    fileNames: ["Close Friends"],
    listTitle: "(Instagram) 您的摯友名單",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `於 ${DateFromTimeStamp(timestamp)} 成為您摯友`;
    },
  },

  BlockedUsers: {
    func: (Datas: unknown[]) => {
      const file1 = Datas[0] as InstagramDataTypes["BlockedUsers"];
      if (
        !isValidData<InstagramDataTypes, "BlockedUsers">(
          file1,
          (data: InstagramDataTypes["BlockedUsers"]) =>
            "relationships_blocked_users" in data
        )
      ) {
        throw new Error("資料格式有誤");
      }
      return GetBlockedUserDatas(file1) as InstagramDataTypes["UserData"][];
    },
    fileNames: ["Blocked Profiles"],
    listTitle: "(Instagram) 您的封鎖名單",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `於 ${DateFromTimeStamp(timestamp)} 被您封鎖`;
    },
  },

  RecentlyUnfollowedProfiles: {
    func: (Datas: unknown[]) => {
      const file1 =
        Datas[0] as InstagramDataTypes["RecentlyUnfollowedProfiles"];
      if (
        !isValidData<InstagramDataTypes, "RecentlyUnfollowedProfiles">(
          file1,
          (data: InstagramDataTypes["RecentlyUnfollowedProfiles"]) =>
            "relationships_unfollowed_users" in data
        )
      ) {
        throw new Error("資料格式有誤");
      }
      return GetUserDatas<InstagramDataTypes, "RecentlyUnfollowedProfiles">(
        file1
      ) as InstagramDataTypes["UserData"][];
    },
    fileNames: ["Recently Unfollowed Profiles"],
    listTitle: "(Instagram) 您最近取消追蹤的用戶",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `於 ${DateFromTimeStamp(timestamp)} 取消追蹤`;
    },
  },

  RecentFollowRequests: {
    func: (Datas: unknown[]) => {
      const file1 = Datas[0] as InstagramDataTypes["RecentFollowRequests"];
      if (
        !isValidData<InstagramDataTypes, "RecentFollowRequests">(
          file1,
          (data: InstagramDataTypes["RecentFollowRequests"]) =>
            "relationships_permanent_follow_requests" in data
        )
      ) {
        throw new Error("資料格式有誤");
      }
      return GetUserDatas<InstagramDataTypes, "RecentFollowRequests">(
        file1
      ) as InstagramDataTypes["UserData"][];
    },
    fileNames: ["Recently Followed Requests"],
    listTitle: "(Instagram) 您最近申請追蹤的用戶",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `於 ${DateFromTimeStamp(timestamp)} 申請追蹤`;
    },
  },

  PendingFollowRequests: {
    func: (Datas: unknown[]) => {
      const file1 = Datas[0] as InstagramDataTypes["PendingFollowRequests"];
      if (
        !isValidData<InstagramDataTypes, "PendingFollowRequests">(
          file1,
          (data: InstagramDataTypes["PendingFollowRequests"]) =>
            "relationships_follow_requests_sent" in data
        )
      ) {
        throw new Error("資料格式有誤");
      }
      return GetUserDatas<InstagramDataTypes, "PendingFollowRequests">(
        file1
      ) as InstagramDataTypes["UserData"][];
    },
    fileNames: ["Pending Follow Requests"],
    listTitle: "(Instagram) 您尚未獲得回應的追蹤請求",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `於 ${DateFromTimeStamp(timestamp)} 申請追蹤`;
    },
  },

  RemovedSuggestions: {
    func: (Datas: unknown[]) => {
      const file1 = Datas[0] as InstagramDataTypes["RemovedSuggestions"];
      if (
        !isValidData<InstagramDataTypes, "RemovedSuggestions">(
          file1,
          (data: InstagramDataTypes["RemovedSuggestions"]) =>
            "relationships_dismissed_suggested_users" in data
        )
      ) {
        throw new Error("資料格式有誤");
      }
      return GetUserDatas<InstagramDataTypes, "RemovedSuggestions">(
        file1
      ) as InstagramDataTypes["UserData"][];
    },
    fileNames: ["Removed Suggestions"],
    listTitle: "(Instagram) 被您移除的「推薦用戶」",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `於 ${DateFromTimeStamp(timestamp)} 被您移除`;
    },
  },

  FollowingHashtags: {
    func: (Datas: unknown[]) => {
      const file1 = Datas[0] as InstagramDataTypes["FollowingHashtags"];
      if (
        !isValidData<InstagramDataTypes, "FollowingHashtags">(
          file1,
          (data: InstagramDataTypes["FollowingHashtags"]) =>
            "relationships_following_hashtags" in data
        )
      ) {
        throw new Error("資料格式有誤");
      }
      return GetUserDatas<InstagramDataTypes, "FollowingHashtags">(
        file1
      ) as InstagramDataTypes["UserData"][];
    },
    fileNames: ["Following Hashtags"],
    listTitle: "(Instagram) 您關注的標籤",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `於 ${DateFromTimeStamp(timestamp)} 被您關注`;
    },
  },
};
