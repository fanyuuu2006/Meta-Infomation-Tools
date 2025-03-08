import { Method } from "@/components/common/FileUploadSection";
import { FeedDataDisplay, UserDataDisplay } from "@/components/common/TableDataDisplay";
import { CommonDataTypes } from "@/lib/CommonType";
import {
  DateFromTimeStamp,
  FollowEachOtherUsers,
  GetFeedDatas,
  GetUserDatas,
  isValidData,
  NoFollowersBackUsers,
  NoFollowingBackUsers,
} from "@/lib/HandleFunction";
import { ThreadsDataTypes } from "@/lib/Threads/ThreadsDataTypes";

export const ThreadsFeatureMethods: Record<string, Method> = {
  Followers: {
    func: <K extends keyof CommonDataTypes>(
      Datas: unknown[]
    ): CommonDataTypes[K][] => {
      const file1 = Datas[0] as ThreadsDataTypes["Followers"];
      if (
        !isValidData<ThreadsDataTypes, "Followers">(
          file1,
          (data: ThreadsDataTypes["Followers"]) =>
            "text_post_app_text_post_app_followers" in data
        )
      ) {
        throw new Error("資料格式有誤");
      }
      return GetUserDatas(file1) as CommonDataTypes[K][];
    },
    fileNames: ["Followers"],
    listTitle: "(Threads) 您的粉絲用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: CommonDataTypes["TimeStamp"] =
        args[0] as CommonDataTypes["TimeStamp"];
      return `於 ${DateFromTimeStamp(timestamp)} 追蹤您`;
    },
    display: <K extends keyof CommonDataTypes>(
      data: CommonDataTypes[K],
      index: number
    ) =>
      UserDataDisplay(
        data as CommonDataTypes["UserData"],
        index,
        ThreadsFeatureMethods.Followers
      ),
  },

  Following: {
    func: <K extends keyof CommonDataTypes>(
      Datas: unknown[]
    ): CommonDataTypes[K][] => {
      const file1 = Datas[0] as ThreadsDataTypes["Following"];
      if (
        !isValidData<ThreadsDataTypes, "Following">(
          file1,
          (data: ThreadsDataTypes["Following"]) =>
            "text_post_app_text_post_app_following" in data
        )
      ) {
        throw new Error("資料格式有誤");
      }
      return GetUserDatas(file1) as CommonDataTypes[K][];
    },
    fileNames: ["Following"],
    listTitle: "(Threads) 您追蹤的用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: CommonDataTypes["TimeStamp"] =
        args[0] as CommonDataTypes["TimeStamp"];
      return `於 ${DateFromTimeStamp(timestamp)} 被您追蹤`;
    },
    display: <K extends keyof CommonDataTypes>(
      data: CommonDataTypes[K],
      index: number
    ) =>
      UserDataDisplay(
        data as CommonDataTypes["UserData"],
        index,
        ThreadsFeatureMethods.Following
      ),
  },

  FollowEachOther: {
    func: <K extends keyof CommonDataTypes>(
      Datas: unknown[]
    ): CommonDataTypes[K][] => {
      const file1 = Datas[0] as ThreadsDataTypes["Followers"];
      const file2 = Datas[1] as ThreadsDataTypes["Following"];
      if (
        !isValidData<ThreadsDataTypes, "Followers">(
          file1,
          (data: ThreadsDataTypes["Followers"]) =>
            "text_post_app_text_post_app_followers" in data
        ) ||
        !isValidData<ThreadsDataTypes, "Following">(
          file2,
          (data: ThreadsDataTypes["Following"]) =>
            "text_post_app_text_post_app_following" in data
        )
      ) {
        throw new Error("資料格式有誤");
      }
      return FollowEachOtherUsers(file1, file2) as CommonDataTypes[K][];
    },
    fileNames: ["Followers", "Following"],
    listTitle: "(Threads) 與您互相追蹤的用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: CommonDataTypes["TimeStamp"] =
        args[0] as CommonDataTypes["TimeStamp"];
      return `於 ${DateFromTimeStamp(timestamp)} 追蹤您`;
    },
    display: <K extends keyof CommonDataTypes>(
      data: CommonDataTypes[K],
      index: number
    ) =>
      UserDataDisplay(
        data as CommonDataTypes["UserData"],
        index,
        ThreadsFeatureMethods.FollowEachOther
      ),
  },

  NoFollowersBack: {
    func: <K extends keyof CommonDataTypes>(
      Datas: unknown[]
    ): CommonDataTypes[K][] => {
      const file1 = Datas[0] as ThreadsDataTypes["Followers"];
      const file2 = Datas[1] as ThreadsDataTypes["Following"];
      if (
        !isValidData<ThreadsDataTypes, "Followers">(
          file1,
          (data: ThreadsDataTypes["Followers"]) =>
            "text_post_app_text_post_app_followers" in data
        ) ||
        !isValidData<ThreadsDataTypes, "Following">(
          file2,
          (data: ThreadsDataTypes["Following"]) =>
            "text_post_app_text_post_app_following" in data
        )
      ) {
        throw new Error("資料格式有誤");
      }
      return NoFollowersBackUsers(file1, file2) as CommonDataTypes[K][];
    },
    fileNames: ["Followers", "Following"],
    listTitle: "(Threads) 尚未回追您的用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: CommonDataTypes["TimeStamp"] =
        args[0] as CommonDataTypes["TimeStamp"];
      return `於 ${DateFromTimeStamp(timestamp)} 被您追蹤`;
    },
    display: <K extends keyof CommonDataTypes>(
      data: CommonDataTypes[K],
      index: number
    ) =>
      UserDataDisplay(
        data as CommonDataTypes["UserData"],
        index,
        ThreadsFeatureMethods.NoFollowersBack
      ),
  },

  NoFollowingBack: {
    func: <K extends keyof CommonDataTypes>(
      Datas: unknown[]
    ): CommonDataTypes[K][] => {
      const file1 = Datas[0] as ThreadsDataTypes["Following"];
      const file2 = Datas[1] as ThreadsDataTypes["Followers"];
      if (
        !isValidData<ThreadsDataTypes, "Following">(
          file1,
          (data: ThreadsDataTypes["Following"]) =>
            "text_post_app_text_post_app_following" in data
        ) ||
        !isValidData<ThreadsDataTypes, "Followers">(
          file2,
          (data: ThreadsDataTypes["Followers"]) =>
            "text_post_app_text_post_app_followers" in data
        )
      ) {
        throw new Error("資料格式有誤");
      }
      return NoFollowingBackUsers(file1, file2) as CommonDataTypes[K][];
    },
    fileNames: ["Following", "Followers"],
    listTitle: "(Threads) 您尚未回追的用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: CommonDataTypes["TimeStamp"] =
        args[0] as CommonDataTypes["TimeStamp"];
      return `於 ${DateFromTimeStamp(timestamp)} 追蹤您`;
    },
    display: <K extends keyof CommonDataTypes>(
      data: CommonDataTypes[K],
      index: number
    ) =>
      UserDataDisplay(
        data as CommonDataTypes["UserData"],
        index,
        ThreadsFeatureMethods.NoFollowingBack
      ),
  },

  NewFollowers: {
    func: <K extends keyof CommonDataTypes>(
      Datas: unknown[]
    ): CommonDataTypes[K][] => {
      const file1 = Datas[0] as ThreadsDataTypes["Followers"];
      const file2 = Datas[1] as ThreadsDataTypes["Followers"];
      if (
        !isValidData<ThreadsDataTypes, "Followers">(
          file1,
          (data: ThreadsDataTypes["Followers"]) =>
            "text_post_app_text_post_app_followers" in data
        ) ||
        !isValidData<ThreadsDataTypes, "Followers">(
          file2,
          (data: ThreadsDataTypes["Followers"]) =>
            "text_post_app_text_post_app_followers" in data
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
    listTitle: "(Threads) 您的新粉絲的用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: CommonDataTypes["TimeStamp"] =
        args[0] as CommonDataTypes["TimeStamp"];
      return `於 ${DateFromTimeStamp(timestamp)} 追蹤您`;
    },
    display: <K extends keyof CommonDataTypes>(
      data: CommonDataTypes[K],
      index: number
    ) =>
      UserDataDisplay(
        data as CommonDataTypes["UserData"],
        index,
        ThreadsFeatureMethods.NewFollowers
      ),
  },

  PendingFollowRequests: {
    func: <K extends keyof CommonDataTypes>(
      Datas: unknown[]
    ): CommonDataTypes[K][] => {
      const file1 = Datas[0] as ThreadsDataTypes["PendingFollowRequests"];
      if (
        !isValidData<ThreadsDataTypes, "PendingFollowRequests">(
          file1,
          (data: ThreadsDataTypes["PendingFollowRequests"]) =>
            "text_post_app_text_post_app_follow_requests_sent" in data
        )
      ) {
        throw new Error("資料格式有誤");
      }
      return GetUserDatas<ThreadsDataTypes, "PendingFollowRequests">(
        file1
      ) as CommonDataTypes[K][];
    },
    fileNames: ["Pending Follow Requests"],
    listTitle: "(Threads) 您尚未獲得回應的追蹤請求",
    note: (...args: unknown[]) => {
      const timestamp: CommonDataTypes["TimeStamp"] =
        args[0] as CommonDataTypes["TimeStamp"];
      return `於 ${DateFromTimeStamp(timestamp)} 申請追蹤`;
    },
    display: <K extends keyof CommonDataTypes>(
      data: CommonDataTypes[K],
      index: number
    ) =>
      UserDataDisplay(
        data as CommonDataTypes["UserData"],
        index,
        ThreadsFeatureMethods.PendingFollowRequests
      ),
  },

  InterestFeedsOnThreads: {
    func: <K extends keyof CommonDataTypes>(
      Datas: unknown[]
    ): CommonDataTypes[K][] => {
      const file1 = Datas[0] as ThreadsDataTypes["InterestFeedsOnThreads"];
      if (
        !isValidData<ThreadsDataTypes, "InterestFeedsOnThreads">(
          file1,
          (data: ThreadsDataTypes["InterestFeedsOnThreads"]) =>
            "text_post_app_text_app_interest_feeds" in data
        )
      ) {
        throw new Error("資料格式有誤");
      }
      return GetFeedDatas(file1) as CommonDataTypes[K][];
    },
    fileNames: ["Interest Feeds On Threads"],
    listTitle: "(Threads) 您對不同 動態消息(Feed) 的訂閱或興趣狀態",
    note: (...args: unknown[]) => {
      const timestamp: CommonDataTypes["TimeStamp"] =
        args[0] as CommonDataTypes["TimeStamp"];
      return `於 ${DateFromTimeStamp(timestamp)} 申請追蹤`;
    },
    display: <K extends keyof CommonDataTypes>(
      data: CommonDataTypes[K],
      index: number
    ) =>
      FeedDataDisplay(
        data as CommonDataTypes["FeedData"],
        index,
      ),
  },
};
