import { TimeStamp } from "@/lib/CommonType";
import {
  DateFromTimeStamp,
  FollowEachOtherUsers,
  GetBlockedUserDatas,
  GetUserDatas,
  NoFollowersBackUsers,
  NoFollowingBackUsers,
} from "@/lib/HandleFunction";
import { InstagramData, InstagramDataTypes } from "@/lib/InstagramDataTypes";
import { JudgeFunction } from "@/lib/JudgeFunction";
import { ThreadsData } from "@/lib/ThreadsDataTypes";

export const FeatureMethods: Record<
  string,
  {
    func: (
      Datas: unknown[]
    ) => InstagramData<"UserData">[] | ThreadsData<"UserData">[];
    fileNames: string[]; // 儲存需要的檔案名稱
    listTitle: string;
    note: (...args: unknown[]) => string;
  }
> = {
  InstagramNoFollowersBackUsers: {
    func: (Datas: unknown[]) => {
      const file1 = Datas[0] as InstagramData<"Followers">;
      const file2 = Datas[1] as InstagramData<"Following">;
      if (
        !JudgeFunction["isInstagramFollowers"](file1) ||
        !JudgeFunction["isInstagramFollowing"](file2)
      ) {
        console.log(
          !JudgeFunction["isInstagramFollowers"](file1) ||
            !JudgeFunction["isInstagramFollowing"](file2)
        );
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

  InstagramNoFollowingBackUsers: {
    func: (Datas: unknown[]) => {
      const file1 = Datas[0] as InstagramData<"Following">;
      const file2 = Datas[1] as InstagramData<"Followers">;
      if (
        !JudgeFunction["isInstagramFollowing"](file1) ||
        !JudgeFunction["isInstagramFollowers"](file2)
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

  InstagramFollowerUsers: {
    func: (Datas: unknown[]) => {
      const file = Datas[0] as InstagramData<"Followers">;
      if (!JudgeFunction["isInstagramFollowers"](file)) {
        throw new Error("資料格式有誤");
      }
      return GetUserDatas(file) as InstagramData<"UserData">[];
    },
    fileNames: ["Followers"],
    listTitle: "(Instagram) 您的粉絲用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `於 ${DateFromTimeStamp(timestamp)} 追蹤您`;
    },
  },

  InstagramFollowingUsers: {
    func: (Datas: unknown[]) => {
      const file = Datas[0] as InstagramData<"Following">;
      if (!JudgeFunction["isInstagramFollowing"](file)) {
        throw new Error("資料格式有誤");
      }
      return GetUserDatas(file) as InstagramData<"UserData">[];
    },
    fileNames: ["Following"],
    listTitle: "(Instagram) 您追蹤的用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `於 ${DateFromTimeStamp(timestamp)} 被您追蹤`;
    },
  },

  InstagramFollowEachOther: {
    func: (Datas: unknown[]) => {
      const file1 = Datas[0] as InstagramData<"Followers">;
      const file2 = Datas[1] as InstagramData<"Following">;
      if (
        !JudgeFunction["isInstagramFollowers"](file1) ||
        !JudgeFunction["isInstagramFollowing"](file2)
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

  InstagramCloseFriends: {
    func: (Datas: unknown[]) => {
      const file1 = Datas[0] as InstagramData<"CloseFriends">;
      if (!JudgeFunction["isInstagramCloseFriends"](file1)) {
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

  InstagramBlockedUsers: {
    func: (Datas: unknown[]) => {
      const file1 = Datas[0] as InstagramData<"BlockedUsers">;
      if (!JudgeFunction["isInstagramBlockedUsers"](file1)) {
        throw new Error("資料格式有誤");
      }
      return GetBlockedUserDatas(file1) as InstagramData<"UserData">[];
    },
    fileNames: ["Blocked Profile"],
    listTitle: "(Instagram) 您的封鎖名單",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `於 ${DateFromTimeStamp(timestamp)} 被您封鎖`;
    },
  },

  ThreadsFollowerUsers: {
    func: (Datas: unknown[]) => {
      const file = Datas[0] as ThreadsData<"Followers">;
      if (!JudgeFunction["isThreadsFollowers"](file)) {
        throw new Error("資料格式有誤");
      }
      return GetUserDatas(file) as ThreadsData<"UserData">[];
    },
    fileNames: ["Followers"],
    listTitle: "(Threads) 您的粉絲用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `於 ${DateFromTimeStamp(timestamp)} 追蹤您`;
    },
  },

  ThreadsFollowingUsers: {
    func: (Datas: unknown[]) => {
      const file = Datas[0] as ThreadsData<"Following">;
      if (!JudgeFunction["isThreadsFollowing"](file)) {
        throw new Error("資料格式有誤");
      }
      return GetUserDatas(file) as ThreadsData<"UserData">[];
    },
    fileNames: ["Following"],
    listTitle: "(Threads) 您追蹤的用戶名單",
    note: (...args: unknown[]) => {
      const timestamp: TimeStamp = args[0] as TimeStamp;
      return `於 ${DateFromTimeStamp(timestamp)} 被您追蹤`;
    },
  },

  ThreadsFollowEachOther: {
    func: (Datas: unknown[]) => {
      const file1 = Datas[0] as ThreadsData<"Followers">;
      const file2 = Datas[1] as ThreadsData<"Following">;
      if (
        !JudgeFunction["isThreadsFollowers"](file1) ||
        !JudgeFunction["isThreadsFollowing"](file2)
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

  ThreadsNoFollowersBackUsers: {
    func: (Datas: unknown[]) => {
      const file1 = Datas[0] as ThreadsData<"Followers">;
      const file2 = Datas[1] as ThreadsData<"Following">;
      if (
        !JudgeFunction["isThreadsFollowers"](file1) ||
        !JudgeFunction["isThreadsFollowing"](file2)
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

  ThreadsNoFollowingBackUsers: {
    func: (Datas: unknown[]) => {
      const file1 = Datas[0] as ThreadsData<"Following">;
      const file2 = Datas[1] as ThreadsData<"Followers">;
      if (
        !JudgeFunction["isThreadsFollowing"](file1) ||
        !JudgeFunction["isThreadsFollowers"](file2)
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
};
