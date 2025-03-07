import { TimeStamp } from "./CommonType";
import { InstagramData, InstagramDataTypes } from "./InstagramDataTypes";
import { ThreadsData, ThreadsDataTypes } from "./ThreadsDataTypes";

export const DateFromTimeStamp = (timestamp: TimeStamp): string => {
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

// FileReader 是異步操作
export const HandleJsonFile = (
  file: File
): Promise<
  InstagramData<keyof InstagramDataTypes> | ThreadsData<keyof ThreadsDataTypes>
> => {
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
        const JsonData = JSON.parse(e.target?.result as string);
        console.log("解析成功:", JsonData);
        resolve(JsonData); // 返回解析後的 JsonData
      } catch (error) {
        console.error("解析 JSON 失敗:", error);
        reject(new Error("解析 JSON 失敗"));
      }
    };
    reader.readAsText(file);
  });
};

export const GetUserDatas = <
  F extends InstagramDataTypes | ThreadsDataTypes,
  T extends keyof F
>(
  data: F[T]
): InstagramData<"UserData">[] | ThreadsData<"UserData">[] => {
  // 如果 data 本身就是 UserData[]，直接返回
  if (Array.isArray(data)) {
    return data as InstagramData<"UserData">[] | ThreadsData<"UserData">[];
  }

  // 根據 data 的結構自動處理
  for (const key in data) {
    const result = data[key];

    // 如果 result 是 UserData[]，直接返回
    if (Array.isArray(result)) {
      return result as InstagramData<"UserData">[] | ThreadsData<"UserData">[];
    }
  }

  console.log("無法解析該類型的資料！");
  throw new Error("無法解析該類型的資料！");
};

export const NoFollowersBackUsers = (
  FollowersFile: InstagramData<"Followers"> | ThreadsData<"Followers">,
  FollowingFile: InstagramData<"Following"> | ThreadsData<"Following">
): InstagramData<"UserData">[] => {
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
  FollowingFile: InstagramData<"Following"> | ThreadsData<"Following">,
  FollowersFile: InstagramData<"Followers"> | ThreadsData<"Followers">
): InstagramData<"UserData">[] => {
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
  FollowersFile: InstagramData<"Followers"> | ThreadsData<"Followers">,
  FollowingFile: InstagramData<"Following"> | ThreadsData<"Following">
): InstagramData<"UserData">[] => {
  const FollowersUsersSet: Set<string> = new Set(
    GetUserDatas(FollowersFile).map(
      (FollowersUser) => FollowersUser.string_list_data[0].value
    )
  );
  return GetUserDatas(FollowingFile).filter((FollowingUser) =>
    FollowersUsersSet.has(FollowingUser.string_list_data[0].value)
  );
};
