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

export const ThreadsFeatureMethods: Record<
  string,
  {
    func: (Datas: unknown[]) => ThreadsDataTypes["UserData"][];
    fileNames: string[]; // 儲存需要的檔案名稱
    listTitle: string;
    note: (...args: unknown[]) => string;
  }
> = {
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
    },
};
