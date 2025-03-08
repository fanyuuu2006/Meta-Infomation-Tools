import { Method } from "@/components/common/FileUploadSection";
import {
  UserDataColumns,
  UserDataSource,
} from "@/components/common/TableDataDisplay";
import { CommonDataTypes } from "@/lib/CommonType";
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

export const InstagramFeatureMethods: Record<string, Method> = {
  NoFollowersBack: {
    func: <K extends keyof CommonDataTypes>(
      Datas: unknown[]
    ): CommonDataTypes[K][] => {
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
      return NoFollowersBackUsers(file1, file2) as CommonDataTypes[K][];
    },
    fileNames: ["Followers", "Following"],
    listTitle: "(Instagram) 尚未回追您的用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: CommonDataTypes["TimeStamp"] =
        args[0] as CommonDataTypes["TimeStamp"];
      return `於 ${DateFromTimeStamp(timestamp)} 被您追蹤`;
    },
    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(
        data as unknown as CommonDataTypes["UserData"][],
        InstagramFeatureMethods.NoFollowersBack
      ) as [],
  },

  NoFollowingBack: {
    func: <K extends keyof CommonDataTypes>(
      Datas: unknown[]
    ): CommonDataTypes[K][] => {
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
      return NoFollowingBackUsers(file1, file2) as CommonDataTypes[K][];
    },
    fileNames: ["Following", "Followers"],
    listTitle: "(Instagram) 您尚未回追的用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: CommonDataTypes["TimeStamp"] =
        args[0] as CommonDataTypes["TimeStamp"];
      return `於 ${DateFromTimeStamp(timestamp)} 追蹤您`;
    },
    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(
        data as unknown as CommonDataTypes["UserData"][],
        InstagramFeatureMethods.NoFollowingBack
      ) as [],
  },

  Followers: {
    func: <K extends keyof CommonDataTypes>(
      Datas: unknown[]
    ): CommonDataTypes[K][] => {
      const file1 = Datas[0] as InstagramDataTypes["Followers"];
      if (
        !isValidData<InstagramDataTypes, "Followers">(
          file1,
          (data: InstagramDataTypes["Followers"]) => Array.isArray(data)
        )
      ) {
        throw new Error("資料格式有誤");
      }
      return GetUserDatas(file1) as CommonDataTypes[K][];
    },
    fileNames: ["Followers"],
    listTitle: "(Instagram) 您的粉絲用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: CommonDataTypes["TimeStamp"] =
        args[0] as CommonDataTypes["TimeStamp"];
      return `於 ${DateFromTimeStamp(timestamp)} 追蹤您`;
    },
    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(
        data as unknown as CommonDataTypes["UserData"][],
        InstagramFeatureMethods.Followers
      ) as [],
  },

  Following: {
    func: <K extends keyof CommonDataTypes>(
      Datas: unknown[]
    ): CommonDataTypes[K][] => {
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
      return GetUserDatas(file1) as CommonDataTypes[K][];
    },
    fileNames: ["Following"],
    listTitle: "(Instagram) 您追蹤的用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: CommonDataTypes["TimeStamp"] =
        args[0] as CommonDataTypes["TimeStamp"];
      return `於 ${DateFromTimeStamp(timestamp)} 被您追蹤`;
    },
    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(
        data as unknown as CommonDataTypes["UserData"][],
        InstagramFeatureMethods.Following
      ) as [],
  },

  FollowEachOther: {
    func: <K extends keyof CommonDataTypes>(
      Datas: unknown[]
    ): CommonDataTypes[K][] => {
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
      return FollowEachOtherUsers(file1, file2) as CommonDataTypes[K][];
    },
    fileNames: ["Followers", "Following"],
    listTitle: "(Instagram) 與您互相追蹤的用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: CommonDataTypes["TimeStamp"] =
        args[0] as CommonDataTypes["TimeStamp"];
      return `於 ${DateFromTimeStamp(timestamp)} 追蹤您`;
    },
    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(
        data as unknown as CommonDataTypes["UserData"][],
        InstagramFeatureMethods.FollowEachOther
      ) as [],
  },

  NewFollowers: {
    func: <K extends keyof CommonDataTypes>(
      Datas: unknown[]
    ): CommonDataTypes[K][] => {
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
        (user2: CommonDataTypes["UserData"]) => user2.string_list_data[0].value
      );

      return GetUserDatas(file1).filter(
        (user1: CommonDataTypes["UserData"]) =>
          !OldFollowers.includes(user1.string_list_data[0].value)
      ) as CommonDataTypes[K][];
    },
    fileNames: ["New Followers", "Old Followers"],
    listTitle: "(Instagram) 您的新粉絲的用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: CommonDataTypes["TimeStamp"] =
        args[0] as CommonDataTypes["TimeStamp"];
      return `於 ${DateFromTimeStamp(timestamp)} 追蹤您`;
    },
    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(
        data as unknown as CommonDataTypes["UserData"][],
        InstagramFeatureMethods.NewFollowers
      ) as [],
  },

  CloseFriends: {
    func: <K extends keyof CommonDataTypes>(
      Datas: unknown[]
    ): CommonDataTypes[K][] => {
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
      ) as CommonDataTypes[K][];
    },
    fileNames: ["Close Friends"],
    listTitle: "(Instagram) 您的摯友名單",
    note: (...args: unknown[]) => {
      const timestamp: CommonDataTypes["TimeStamp"] =
        args[0] as CommonDataTypes["TimeStamp"];
      return `於 ${DateFromTimeStamp(timestamp)} 成為您摯友`;
    },
    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(
        data as unknown as CommonDataTypes["UserData"][],
        InstagramFeatureMethods.CloseFriends
      ) as [],
  },

  BlockedUsers: {
    func: <K extends keyof CommonDataTypes>(
      Datas: unknown[]
    ): CommonDataTypes[K][] => {
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
      return GetBlockedUserDatas(file1) as CommonDataTypes[K][];
    },
    fileNames: ["Blocked Profiles"],
    listTitle: "(Instagram) 您的封鎖名單",
    note: (...args: unknown[]) => {
      const timestamp: CommonDataTypes["TimeStamp"] =
        args[0] as CommonDataTypes["TimeStamp"];
      return `於 ${DateFromTimeStamp(timestamp)} 被您封鎖`;
    },
    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(
        data as unknown as CommonDataTypes["UserData"][],
        InstagramFeatureMethods.BlockedUsers
      ) as [],
  },

  RecentlyUnfollowedProfiles: {
    func: <K extends keyof CommonDataTypes>(
      Datas: unknown[]
    ): CommonDataTypes[K][] => {
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
      ) as CommonDataTypes[K][];
    },
    fileNames: ["Recently Unfollowed Profiles"],
    listTitle: "(Instagram) 您最近取消追蹤的用戶",
    note: (...args: unknown[]) => {
      const timestamp: CommonDataTypes["TimeStamp"] =
        args[0] as CommonDataTypes["TimeStamp"];
      return `於 ${DateFromTimeStamp(timestamp)} 取消追蹤`;
    },
    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(
        data as unknown as CommonDataTypes["UserData"][],
        InstagramFeatureMethods.RecentlyUnfollowedProfiles
      ) as [],
  },

  RecentFollowRequests: {
    func: <K extends keyof CommonDataTypes>(
      Datas: unknown[]
    ): CommonDataTypes[K][] => {
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
      ) as CommonDataTypes[K][];
    },
    fileNames: ["Recently Followed Requests"],
    listTitle: "(Instagram) 您最近申請追蹤的用戶",
    note: (...args: unknown[]) => {
      const timestamp: CommonDataTypes["TimeStamp"] =
        args[0] as CommonDataTypes["TimeStamp"];
      return `於 ${DateFromTimeStamp(timestamp)} 申請追蹤`;
    },
    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(
        data as unknown as CommonDataTypes["UserData"][],
        InstagramFeatureMethods.RecentFollowRequests
      ) as [],
  },

  PendingFollowRequests: {
    func: <K extends keyof CommonDataTypes>(
      Datas: unknown[]
    ): CommonDataTypes[K][] => {
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
      ) as CommonDataTypes[K][];
    },
    fileNames: ["Pending Follow Requests"],
    listTitle: "(Instagram) 您尚未獲得回應的追蹤請求",
    note: (...args: unknown[]) => {
      const timestamp: CommonDataTypes["TimeStamp"] =
        args[0] as CommonDataTypes["TimeStamp"];
      return `於 ${DateFromTimeStamp(timestamp)} 申請追蹤`;
    },
    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(
        data as unknown as CommonDataTypes["UserData"][],
        InstagramFeatureMethods.PendingFollowRequests
      ) as [],
  },

  RemovedSuggestions: {
    func: <K extends keyof CommonDataTypes>(
      Datas: unknown[]
    ): CommonDataTypes[K][] => {
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
      ) as CommonDataTypes[K][];
    },
    fileNames: ["Removed Suggestions"],
    listTitle: "(Instagram) 被您移除的「推薦用戶」",
    note: (...args: unknown[]) => {
      const timestamp: CommonDataTypes["TimeStamp"] =
        args[0] as CommonDataTypes["TimeStamp"];
      return `於 ${DateFromTimeStamp(timestamp)} 被您移除`;
    },
    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(
        data as unknown as CommonDataTypes["UserData"][],
        InstagramFeatureMethods.RemovedSuggestions
      ) as [],
  },

  FollowingHashtags: {
    func: <K extends keyof CommonDataTypes>(
      Datas: unknown[]
    ): CommonDataTypes[K][] => {
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
      ) as CommonDataTypes[K][];
    },
    fileNames: ["Following Hashtags"],
    listTitle: "(Instagram) 您關注的標籤",
    note: (...args: unknown[]) => {
      const timestamp: CommonDataTypes["TimeStamp"] =
        args[0] as CommonDataTypes["TimeStamp"];
      return `於 ${DateFromTimeStamp(timestamp)} 被您關注`;
    },

    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(
        data as unknown as CommonDataTypes["UserData"][],
        InstagramFeatureMethods.FollowingHashtags
      ) as [],
  },
};
