import { TimeStamp } from "@/lib/CommonType";
import {
  DateFromTimeStamp,
  FollowEachOtherUsers,
  GetBlockedUserDatas,
  GetUserDatas,
  NoFollowersBackUsers,
  NoFollowingBackUsers,
} from "@/lib/HandleFunction";
import {
  InstagramData,
  InstagramDataTypes,
} from "@/lib/Instagram/InstagramDataTypes";
import { isValidData } from "@/lib/JudgeFunction";

export const InstagramFeatureMethods: Record<
  string,
  {
    func: (Datas: unknown[]) => InstagramData<"UserData">[];
    fileNames: string[]; // 儲存需要的檔案名稱
    listTitle: string;
    note: (...args: unknown[]) => string;
  }
> = {
  NoFollowersBackUsers: {
    func: (Datas: unknown[]) => {
      const file1 = Datas[0] as InstagramData<"Followers">;
      const file2 = Datas[1] as InstagramData<"Following">;
      if (
        !isValidData<InstagramDataTypes, "Followers">(
          file1,
          (data: InstagramData<"Followers">) => Array.isArray(data)
        ) ||
        !isValidData<InstagramDataTypes, "Following">(
          file2,
          (data: InstagramData<"Following">) =>
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

  NoFollowingBackUsers: {
    func: (Datas: unknown[]) => {
      const file1 = Datas[0] as InstagramData<"Following">;
      const file2 = Datas[1] as InstagramData<"Followers">;
      if (
        !isValidData<InstagramDataTypes, "Following">(
          file1,
          (data: InstagramData<"Following">) =>
            "relationships_following" in data
        ) ||
        !isValidData<InstagramDataTypes, "Followers">(
          file2,
          (data: InstagramData<"Followers">) => Array.isArray(data)
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

  FollowerUsers: {
    func: (Datas: unknown[]) => {
      const file1 = Datas[0] as InstagramData<"Followers">;
      if (
        !isValidData<InstagramDataTypes, "Followers">(
          file1,
          (data: InstagramData<"Followers">) => Array.isArray(data)
        )
      ) {
        throw new Error("資料格式有誤");
      }
      return GetUserDatas(file1) as InstagramData<"UserData">[];
    },
    fileNames: ["Followers"],
    listTitle: "(Instagram) 您的粉絲用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `於 ${DateFromTimeStamp(timestamp)} 追蹤您`;
    },
  },

  FollowingUsers: {
    func: (Datas: unknown[]) => {
      const file1 = Datas[0] as InstagramData<"Following">;
      if (
        !isValidData<InstagramDataTypes, "Following">(
          file1,
          (data: InstagramData<"Following">) =>
            "relationships_following" in data
        )
      ) {
        throw new Error("資料格式有誤");
      }
      return GetUserDatas(file1) as InstagramData<"UserData">[];
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
      const file1 = Datas[0] as InstagramData<"Followers">;
      const file2 = Datas[1] as InstagramData<"Following">;
      if (
        !isValidData<InstagramDataTypes, "Followers">(
          file1,
          (data: InstagramData<"Followers">) => Array.isArray(data)
        ) ||
        !isValidData<InstagramDataTypes, "Following">(
          file2,
          (data: InstagramData<"Following">) =>
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

  CloseFriends: {
    func: (Datas: unknown[]) => {
      const file1 = Datas[0] as InstagramData<"CloseFriends">;
      if (!isValidData<InstagramDataTypes, "CloseFriends">(
          file1,
          (data: InstagramData<"CloseFriends">) =>
            "relationships_close_friends" in data
        )
      ) {
        throw new Error("資料格式有誤");
      }
      return GetUserDatas<InstagramDataTypes, "CloseFriends">(
        file1
      ) as InstagramData<"UserData">[];
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
      const file1 = Datas[0] as InstagramData<"BlockedUsers">;
      if (!isValidData<InstagramDataTypes, "BlockedUsers">(
        file1,
        (data: InstagramData<"BlockedUsers">) =>
          "relationships_blocked_users" in data
      )) {
        throw new Error("資料格式有誤");
      }
      return GetBlockedUserDatas(file1) as InstagramData<"UserData">[];
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
      const file1 = Datas[0] as InstagramData<"RecentlyUnfollowedProfiles">;
      if (!isValidData<InstagramDataTypes, "RecentlyUnfollowedProfiles">(
        file1,
        (data: InstagramData<"RecentlyUnfollowedProfiles">) =>
          "relationships_unfollowed_users" in data
      )) {
        throw new Error("資料格式有誤");
      }
      return GetUserDatas<InstagramDataTypes, "RecentlyUnfollowedProfiles">(
        file1
      ) as InstagramData<"UserData">[];
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
      const file1 = Datas[0] as InstagramData<"RecentFollowRequests">;
      if (!isValidData<InstagramDataTypes, "RecentFollowRequests">(
        file1,
        (data: InstagramData<"RecentFollowRequests">) =>
          "relationships_permanent_follow_requests" in data
      )) {
        throw new Error("資料格式有誤");
      }
      return GetUserDatas<InstagramDataTypes, "RecentFollowRequests">(
        file1
      ) as InstagramData<"UserData">[];
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
      const file1 = Datas[0] as InstagramData<"PendingFollowRequests">;
      if (!isValidData<InstagramDataTypes, "PendingFollowRequests">(
        file1,
        (data: InstagramData<"PendingFollowRequests">) =>
          "relationships_follow_requests_sent" in data
      )) {
        throw new Error("資料格式有誤");
      }
      return GetUserDatas<InstagramDataTypes, "PendingFollowRequests">(
        file1
      ) as InstagramData<"UserData">[];
    },
    fileNames: ["Pending Follow Requests"],
    listTitle: "(Instagram) 您尚未獲得回應的追蹤請求",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `於 ${DateFromTimeStamp(timestamp)} 申請追蹤`;
    },
  },
};
