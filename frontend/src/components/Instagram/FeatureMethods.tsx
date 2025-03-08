import { Method } from "@/components/common/FileUploadSection";
import {
  UserDataColumns,
  UserDataSource,
} from "@/components/common/TableDataDisplay";
import { CommonDataTypes } from "@/lib/CommonType";
import {
  DifferentFollowUsers,
  FollowEachOtherUsers,
  GetBlockedUserDatas,
  GetUserDatas,
  isValidData,
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
      return DifferentFollowUsers(file1, file2) as CommonDataTypes[K][];
    },
    fileNames: ["Followers", "Following"],
    listTitle: "(Instagram) 尚未回追您的用戶名單",
    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(data as unknown as CommonDataTypes["UserData"][]) as [],
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
      return DifferentFollowUsers(file1, file2) as CommonDataTypes[K][];
    },
    fileNames: ["Following", "Followers"],
    listTitle: "(Instagram) 您尚未回追的用戶名單",
    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(data as unknown as CommonDataTypes["UserData"][]) as [],
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
    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(data as unknown as CommonDataTypes["UserData"][]) as [],
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
    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(data as unknown as CommonDataTypes["UserData"][]) as [],
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
    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(data as unknown as CommonDataTypes["UserData"][]) as [],
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
    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(data as unknown as CommonDataTypes["UserData"][]) as [],
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

    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(data as unknown as CommonDataTypes["UserData"][]) as [],
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

    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(data as unknown as CommonDataTypes["UserData"][]) as [],
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

    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(data as unknown as CommonDataTypes["UserData"][]) as [],
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

    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(data as unknown as CommonDataTypes["UserData"][]) as [],
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

    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(data as unknown as CommonDataTypes["UserData"][]) as [],
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
    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(data as unknown as CommonDataTypes["UserData"][]) as [],
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
    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(data as unknown as CommonDataTypes["UserData"][]) as [],
  },
};
