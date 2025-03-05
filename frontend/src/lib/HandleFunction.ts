import {
  Followers,
  Following,
  InstagramData,
  TimeStamp,
  UserData,
} from "./DataTypes";

export type MethodNames =
  | "NoFollowBackUsers"
  | "NoFollowingBackUsers"
  | "FollowerUsers"
  | "FollowingUsers";

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
export const HandleJsonFile = (file: File): Promise<InstagramData> => {
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

export const FollowerUsers = (FollowersFile: Followers): UserData[] => {
  if (FollowersFile[0].string_list_data === undefined) {
    console.log("不是正確的檔案格式！");
    throw new Error("不是正確的檔案格式！");
  }
  return FollowersFile;
};
export const FollowingUsers = (FollowingFile: Following): UserData[] => {
  if (FollowingFile.relationships_following === undefined) {
    console.log("不是正確的檔案格式！");
    throw new Error("不是正確的檔案格式！");
  }
  return FollowingFile.relationships_following;
};

export const NoFollowBackUsers = (
  FollowersFile: Followers,
  FollowingFile: Following
): UserData[] => {
  const FilteredUserData: UserData[] = FollowingUsers(FollowingFile).filter(
    (FollowingUser: UserData): boolean => {
      return !FollowerUsers(FollowersFile).some(
        (FollowerUser: UserData): boolean => {
          return (
            FollowingUser.string_list_data[0].value ===
            FollowerUser.string_list_data[0].value
          );
        }
      );
    }
  );
  return FilteredUserData;
};

export const NoFollowingBackUsers = (
  FollowingFile: Following,
  FollowersFile: Followers
): UserData[] => {
  const FilteredUserData: UserData[] = FollowerUsers(FollowersFile).filter(
    (FollowerUser: UserData): boolean => {
      return !FollowingUsers(FollowingFile).some(
        (FollowingUser: UserData): boolean => {
          return (
            FollowerUser.string_list_data[0].value ===
            FollowingUser.string_list_data[0].value
          );
        }
      );
    }
  );
  return FilteredUserData;
};
