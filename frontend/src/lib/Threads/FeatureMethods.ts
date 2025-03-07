import { TimeStamp } from "@/lib/CommonType";
import {
  DateFromTimeStamp,
  FollowEachOtherUsers,
  GetUserDatas,
  NoFollowersBackUsers,
  NoFollowingBackUsers,
} from "@/lib/HandleFunction";
import { JudgeFunction } from "@/lib/JudgeFunction";
import { ThreadsData } from "@/lib/Threads/ThreadsDataTypes";

export const ThreadsFeatureMethods: Record<
  string,
  {
    func: (Datas: unknown[]) => ThreadsData<"UserData">[];
    fileNames: string[]; // 儲存需要的檔案名稱
    listTitle: string;
    note: (...args: unknown[]) => string;
  }
> = {
  FollowerUsers: {
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

  FollowingUsers: {
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

  FollowEachOther: {
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

  NoFollowersBackUsers: {
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

  NoFollowingBackUsers: {
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
