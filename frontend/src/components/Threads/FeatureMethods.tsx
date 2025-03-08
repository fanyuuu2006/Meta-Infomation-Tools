import { Method } from "@/components/common/FileUploadSection";
import { UserDataDisplay } from "@/components/common/TableDataDisplay";
import { TimeStamp } from "@/lib/CommonType";
import {
  DateFromTimeStamp,
  FollowEachOtherUsers,
  GetUserDatas,
  isValidData,
  NoFollowersBackUsers,
  NoFollowingBackUsers,
} from "@/lib/HandleFunction";
import { ThreadsDataTypes } from "@/lib/Threads/ThreadsDataTypes";

export const ThreadsFeatureMethods: Record<string, Method> = {
  Followers: {
    func: (Datas: unknown[]) => {
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
      return GetUserDatas(file1) as ThreadsDataTypes["UserData"][];
    },
    fileNames: ["Followers"],
    listTitle: "(Threads) 您的粉絲用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `於 ${DateFromTimeStamp(timestamp)} 追蹤您`;
    },
    display: (user: ThreadsDataTypes["UserData"], index: number) =>
      UserDataDisplay(user, index, ThreadsFeatureMethods.Followers),
  },

  Following: {
    func: (Datas: unknown[]) => {
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
      return GetUserDatas(file1) as ThreadsDataTypes["UserData"][];
    },
    fileNames: ["Following"],
    listTitle: "(Threads) 您追蹤的用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `於 ${DateFromTimeStamp(timestamp)} 被您追蹤`;
    },
    display: (user: ThreadsDataTypes["UserData"], index: number) =>
      UserDataDisplay(user, index, ThreadsFeatureMethods.Following),
  },

  FollowEachOther: {
    func: (Datas: unknown[]) => {
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
      return FollowEachOtherUsers(file1, file2);
    },
    fileNames: ["Followers", "Following"],
    listTitle: "(Threads) 與您互相追蹤的用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `於 ${DateFromTimeStamp(timestamp)} 追蹤您`;
    },
    display: (user: ThreadsDataTypes["UserData"], index: number) =>
      UserDataDisplay(user, index, ThreadsFeatureMethods.FollowEachOther),
  },

  NoFollowersBack: {
    func: (Datas: unknown[]) => {
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
      return NoFollowersBackUsers(file1, file2);
    },
    fileNames: ["Followers", "Following"],
    listTitle: "(Threads) 尚未回追您的用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `於 ${DateFromTimeStamp(timestamp)} 被您追蹤`;
    },
    display: (user: ThreadsDataTypes["UserData"], index: number) =>
      UserDataDisplay(user, index, ThreadsFeatureMethods.NoFollowersBack),
  },

  NoFollowingBack: {
    func: (Datas: unknown[]) => {
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
      return NoFollowingBackUsers(file1, file2);
    },
    fileNames: ["Following", "Followers"],
    listTitle: "(Threads) 您尚未回追的用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `於 ${DateFromTimeStamp(timestamp)} 追蹤您`;
    },
    display: (user: ThreadsDataTypes["UserData"], index: number) =>
      UserDataDisplay(user, index, ThreadsFeatureMethods.NoFollowingBack),
  },

  NewFollowers: {
    func: (Datas: unknown[]) => {
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
        (user2: ThreadsDataTypes["UserData"]) => user2.string_list_data[0].value
      );

      return GetUserDatas(file1).filter(
        (user1: ThreadsDataTypes["UserData"]) =>
          !OldFollowers.includes(user1.string_list_data[0].value)
      );
    },
    fileNames: ["New Followers", "Old Followers"],
    listTitle: "(Threads) 您的新粉絲的用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `於 ${DateFromTimeStamp(timestamp)} 追蹤您`;
    },
    display: (user: ThreadsDataTypes["UserData"], index: number) =>
      UserDataDisplay(user, index, ThreadsFeatureMethods.NewFollowers),
  },

  PendingFollowRequests: {
    func: (Datas: unknown[]) => {
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
      ) as ThreadsDataTypes["UserData"][];
    },
    fileNames: ["Pending Follow Requests"],
    listTitle: "(Threads) 您尚未獲得回應的追蹤請求",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `於 ${DateFromTimeStamp(timestamp)} 申請追蹤`;
    },
    display: (user: ThreadsDataTypes["UserData"], index: number) =>
      UserDataDisplay(user, index, ThreadsFeatureMethods.PendingFollowRequests),
  },
};
