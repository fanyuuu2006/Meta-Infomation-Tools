import { CommonDataTypes } from "./CommonType";
import { InstagramDataTypes } from "./Instagram/InstagramDataTypes";
import { ThreadsDataTypes } from "./Threads/ThreadsDataTypes";
export const DateFromTimeStamp = (
  timestamp: CommonDataTypes["TimeStamp"]
): string => {
  const date = new Date(timestamp * 1000);

  // "2025/03/04 21:00:00"
  const formatter = new Intl.DateTimeFormat("zh-TW", {
    year: "numeric", // 完整年分
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // 24 小時制制
  });

  return formatter.format(date);
};

// 將錯誤解讀的字串修正回正確內容
export const FixDecodedString = (str: string): string => {
  // 將每個字元的 charCode 視為位元組
  const bytes = new Uint8Array([...str].map((ch) => ch.charCodeAt(0)));
  // 使用 UTF-8 解碼這些位元組
  return new TextDecoder("utf-8").decode(bytes);
};

// FileReader 是異步操作
export const HandleJsonFile = (
  file: File
): Promise<InstagramDataTypes | ThreadsDataTypes> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("檔案未選擇"));
      return;
    }

    if (file.type !== "application/json") {
      console.log("這不是 JSON 檔案");
      reject(new Error("這不是 JSON 檔案"));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const JsonData = JSON.parse(
          e.target?.result as string,
          // 修復錯誤編碼的字串
          (_, value: string | number) => {
            if (typeof value === "string") {
              return FixDecodedString(value);
            }
            return value;
          }
        );

        console.log("解析成功:", JsonData);
        resolve(JsonData); // 返回解析後的 JsonData
      } catch (error) {
        console.error("解析 JSON 失敗:", error);
        reject(new Error("解析 JSON 失敗"));
      }
    };
    reader.readAsText(file, "utf-8");
  });
};

export const isValidData = <
  T extends InstagramDataTypes | ThreadsDataTypes,
  K extends keyof T
>(
  Data: T[K],
  CheckFunction: (Data: T[K]) => boolean
): Data is T[K] => {
  return CheckFunction(Data);
};

export const GetUserDatas = <
  F extends InstagramDataTypes | ThreadsDataTypes,
  T extends keyof F
>(
  data: F[T]
): CommonDataTypes["UserData"][] => {
  // 如果 data 本身就是 UserData[]，直接返回
  if (Array.isArray(data)) {
    return data as
      | CommonDataTypes["UserData"][]
      | CommonDataTypes["UserData"][];
  }

  // 根據 data 的結構自動處理
  for (const key in data) {
    const result = data[key];

    // 如果 result 是 UserData[]，直接返回
    if (Array.isArray(result)) {
      return result as
        | CommonDataTypes["UserData"][]
        | CommonDataTypes["UserData"][];
    }
  }

  console.log("無法解析該類型的資料！");
  throw new Error("無法解析該類型的資料！");
};

export const GetBlockedUserDatas = (
  data: InstagramDataTypes["BlockedUsers"]
): CommonDataTypes["UserData"][] =>
  data.relationships_blocked_users.map(
    (user: InstagramDataTypes["BlockedUserData"], index: number) => {
      return {
        title: "",
        media_list_data: [],
        string_list_data: [
          {
            href: user.string_list_data[index]?.href || "",
            value: user.title,
            timestamp: user.string_list_data[index].timestamp,
          },
        ],
      };
    }
  );

export const NoFollowersBackUsers = (
  FollowersFile:
    | InstagramDataTypes["Followers"]
    | ThreadsDataTypes["Followers"],
  FollowingFile: InstagramDataTypes["Following"] | ThreadsDataTypes["Following"]
): CommonDataTypes["UserData"][] => {
  const FollowersUsersSet: Set<string> = new Set(
    GetUserDatas(FollowersFile).map(
      (FollowersUser) => FollowersUser.string_list_data[0].value
    )
  );
  return GetUserDatas(FollowingFile).filter(
    (FollowingUser) =>
      !FollowersUsersSet.has(FollowingUser.string_list_data[0].value)
  );
};

export const NoFollowingBackUsers = (
  FollowingFile:
    | InstagramDataTypes["Following"]
    | ThreadsDataTypes["Following"],
  FollowersFile: InstagramDataTypes["Followers"] | ThreadsDataTypes["Followers"]
): CommonDataTypes["UserData"][] => {
  const FollowingUsersSet: Set<string> = new Set(
    GetUserDatas(FollowingFile).map(
      (FollowingUser) => FollowingUser.string_list_data[0].value
    )
  );
  return GetUserDatas(FollowersFile).filter(
    (FollowersUser) =>
      !FollowingUsersSet.has(FollowersUser.string_list_data[0].value)
  );
};

export const FollowEachOtherUsers = (
  FollowersFile:
    | InstagramDataTypes["Followers"]
    | ThreadsDataTypes["Followers"],
  FollowingFile: InstagramDataTypes["Following"] | ThreadsDataTypes["Following"]
): CommonDataTypes["UserData"][] => {
  const FollowersUsersSet: Set<string> = new Set(
    GetUserDatas(FollowersFile).map(
      (FollowersUser) => FollowersUser.string_list_data[0].value
    )
  );
  return GetUserDatas(FollowingFile).filter((FollowingUser) =>
    FollowersUsersSet.has(FollowingUser.string_list_data[0].value)
  );
};

export const GetThreadsDatas = (
  FeedFile: ThreadsDataTypes["LikedThreads"]
): CommonDataTypes["ThreadsData"][] =>
  FeedFile.text_post_app_media_likes;

export const GetFeedDatas = (
  FeedFile: ThreadsDataTypes["InterestFeedsOnThreads"]
): CommonDataTypes["FeedData"][] =>
  FeedFile.text_post_app_text_app_interest_feeds;
