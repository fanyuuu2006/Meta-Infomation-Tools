import { Method } from "@/components/common/FileUploadSection";
import { CommonDataTypes } from "@/lib/CommonType";
import {
  DifferentFollowUsers,
  FollowEachOtherUsers,
  GetDatas,
  isValidData,
} from "@/lib/HandleFunction";
import { ThreadsDataTypes } from "@/lib/Threads/ThreadsDataTypes";
import {
  AppDataColumns,
  AppDataSource,
  TopicDataColumns,
  TopicDataSource,
  MediaPostDataColumns,
  MediaPostDataSource,
  PostCommentDataColumns,
  PostCommentDataSource,
  UserDataColumns,
  UserDataSource,
} from "../common/TableDataDisplay";

export const ThreadsFeatureMethods: Record<string, Method> = {
  NoFollowersBack: {
    func: (Datas: unknown[]): CommonDataTypes[keyof CommonDataTypes][] => {
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
      return DifferentFollowUsers(file1, file2);
    },
    fileNames: ["Followers", "Following"],
    listTitle: "(Threads) 尚未回追您的用戶名單",

    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(data as CommonDataTypes["UserData"][]) as [],
  },

  NoFollowingBack: {
    func: (Datas: unknown[]): CommonDataTypes[keyof CommonDataTypes][] => {
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
      return DifferentFollowUsers(file1, file2);
    },
    fileNames: ["Following", "Followers"],
    listTitle: "(Threads) 您尚未回追的用戶名單",

    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(data as CommonDataTypes["UserData"][]) as [],
  },

  Followers: {
    func: (Datas: unknown[]): CommonDataTypes[keyof CommonDataTypes][] => {
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
      return GetDatas(file1);
    },
    fileNames: ["Followers"],
    listTitle: "(Threads) 您的粉絲用戶名單",

    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(data as CommonDataTypes["UserData"][]) as [],
  },

  Following: {
    func: (Datas: unknown[]): CommonDataTypes[keyof CommonDataTypes][] => {
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
      return GetDatas(file1);
    },
    fileNames: ["Following"],
    listTitle: "(Threads) 您追蹤的用戶名單",

    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(data as CommonDataTypes["UserData"][]) as [],
  },

  FollowEachOther: {
    func: (Datas: unknown[]): CommonDataTypes[keyof CommonDataTypes][] => {
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

    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(data as CommonDataTypes["UserData"][]) as [],
  },

  NewFollowers: {
    func: (Datas: unknown[]): CommonDataTypes[keyof CommonDataTypes][] => {
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
      const OldFollowers = (
        GetDatas(file2) as CommonDataTypes["UserData"][]
      ).map(
        (user2: CommonDataTypes["UserData"]) =>
          user2.string_list_data?.[0].value
      );

      return (GetDatas(file2) as CommonDataTypes["UserData"][]).filter(
        (user1: CommonDataTypes["UserData"]) =>
          !OldFollowers.includes(user1.string_list_data?.[0].value)
      );
    },
    fileNames: ["New Followers", "Old Followers"],
    listTitle: "(Threads) 您的新粉絲的用戶名單",

    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(data as CommonDataTypes["UserData"][]) as [],
  },

  PendingFollowRequests: {
    func: (Datas: unknown[]): CommonDataTypes[keyof CommonDataTypes][] => {
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
      return GetDatas<
        ThreadsDataTypes,
        "PendingFollowRequests",
        CommonDataTypes["UserData"]
      >(file1);
    },
    fileNames: ["Pending Follow Requests"],
    listTitle: "(Threads) 您尚未獲得回應的追蹤請求",

    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(data as CommonDataTypes["UserData"][]) as [],
  },

  RecentFollowRequests: {
    func: (Datas: unknown[]): CommonDataTypes[keyof CommonDataTypes][] => {
      const file1 = Datas[0] as ThreadsDataTypes["RecentFollowRequests"];
      if (
        !isValidData<ThreadsDataTypes, "RecentFollowRequests">(
          file1,
          (data: ThreadsDataTypes["RecentFollowRequests"]) =>
            "text_post_app_text_post_app_permanent_follow_requests" in data
        )
      ) {
        throw new Error("資料格式有誤");
      }
      return GetDatas<
        ThreadsDataTypes,
        "RecentFollowRequests",
        CommonDataTypes["UserData"]
      >(file1);
    },
    fileNames: ["Recently Followed Requests"],
    listTitle: "(Threads) 您最近申請追蹤的用戶",

    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(data as CommonDataTypes["UserData"][]) as [],
  },

  RecentlyUnfollowedProfiles: {
    func: (Datas: unknown[]): CommonDataTypes[keyof CommonDataTypes][] => {
      const file1 = Datas[0] as ThreadsDataTypes["RecentlyUnfollowedProfiles"];
      if (
        !isValidData<ThreadsDataTypes, "RecentlyUnfollowedProfiles">(
          file1,
          (data: ThreadsDataTypes["RecentlyUnfollowedProfiles"]) =>
            "text_post_app_text_post_app_unfollowed_users" in data
        )
      ) {
        throw new Error("資料格式有誤");
      }
      return GetDatas<
        ThreadsDataTypes,
        "RecentlyUnfollowedProfiles",
        CommonDataTypes["UserData"]
      >(file1);
    },
    fileNames: ["Recently Unfollowed Profiles"],
    listTitle: "(Threads) 您最近取消追蹤的用戶",

    columns: UserDataColumns,
    dataSource: (data) =>
      UserDataSource(data as CommonDataTypes["UserData"][]) as [],
  },

  InterestFeedsOnThreads: {
    func: (Datas: unknown[]): CommonDataTypes[keyof CommonDataTypes][] => {
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
      return GetDatas<
        ThreadsDataTypes,
        "InterestFeedsOnThreads",
        CommonDataTypes["TopicData"]
      >(file1);
    },
    fileNames: ["Interest Feeds On Threads"],
    listTitle: "(Threads) 您對不同 動態消息 關注狀態",

    columns: TopicDataColumns,
    dataSource: (data) =>
      TopicDataSource(data as CommonDataTypes["TopicData"][]) as [],
  },

  LikedThreads: {
    func: (Datas: unknown[]): CommonDataTypes[keyof CommonDataTypes][] => {
      const file1 = Datas[0] as ThreadsDataTypes["LikedThreads"];
      if (
        !isValidData<ThreadsDataTypes, "LikedThreads">(
          file1,
          (data: ThreadsDataTypes["LikedThreads"]) =>
            "text_post_app_media_likes" in data
        )
      ) {
        throw new Error("資料格式有誤");
      }
      return GetDatas<
        ThreadsDataTypes,
        "LikedThreads",
        CommonDataTypes["PostCommentData"]
      >(file1);
    },
    fileNames: ["Liked Threads"],
    listTitle: "(Threads) 您按讚的串文",

    columns: PostCommentDataColumns,
    dataSource: (data) =>
      PostCommentDataSource(
        data as CommonDataTypes["PostCommentData"][]
      ) as [],
  },

  ThreadsViewed: {
    func: (Datas: unknown[]): CommonDataTypes[keyof CommonDataTypes][] => {
      const file1 = Datas[0] as ThreadsDataTypes["ThreadsViewed"];
      if (
        !isValidData<ThreadsDataTypes, "ThreadsViewed">(
          file1,
          (data: ThreadsDataTypes["ThreadsViewed"]) =>
            "text_post_app_text_post_app_posts_seen" in data
        )
      ) {
        throw new Error("資料格式有誤");
      }
      return GetDatas<ThreadsDataTypes, "ThreadsViewed", "ThreadsPostData">(
        file1
      );
    },
    fileNames: ["Threads Viewed"],
    listTitle: "(Threads) 瀏覽過的串文作者與時間",

    columns: PostCommentDataColumns,
    dataSource: (data) =>
      PostCommentDataSource(
        data as CommonDataTypes["PostCommentData"][]
      ) as [],
  },

  YourPostsWithoutNotifications: {
    func: (Datas: unknown[]): CommonDataTypes[keyof CommonDataTypes][] => {
      const file1 =
        Datas[0] as ThreadsDataTypes["YourPostsWithoutNotifications"];
      if (
        !isValidData<ThreadsDataTypes, "YourPostsWithoutNotifications">(
          file1,
          (data: ThreadsDataTypes["YourPostsWithoutNotifications"]) =>
            "text_post_app_text_app_dyi_authored_post_disabled_notifications" in
            data
        )
      ) {
        throw new Error("資料格式有誤");
      }
      return GetDatas<
        ThreadsDataTypes,
        "YourPostsWithoutNotifications",
        CommonDataTypes["PostCommentData"]
      >(file1);
    },
    fileNames: ["Your Posts Without Notifications"],
    listTitle: "(Threads) 您已關閉通知的串文",

    columns: PostCommentDataColumns,
    dataSource: (data) =>
      PostCommentDataSource(
        data as CommonDataTypes["PostCommentData"][]
      ) as [],
  },

  ThreadsAndReplies: {
    func: (Datas: unknown[]): CommonDataTypes[keyof CommonDataTypes][] => {
      const file1 = Datas[0] as ThreadsDataTypes["ThreadsAndReplies"];
      if (
        !isValidData<ThreadsDataTypes, "ThreadsAndReplies">(
          file1,
          (data: ThreadsDataTypes["ThreadsAndReplies"]) =>
            "text_post_app_text_posts" in data
        )
      ) {
        throw new Error("資料格式有誤");
      }
      return GetDatas<
        ThreadsDataTypes,
        "ThreadsAndReplies",
        CommonDataTypes["MediaPostData"]
      >(file1);
    },
    fileNames: ["Threads And Replies"],
    listTitle: "(Threads) 您的串文與回覆",

    columns: MediaPostDataColumns,
    dataSource: (data) =>
      MediaPostDataSource(
        data as CommonDataTypes["MediaPostData"][]
      ) as [],
  },

  AppsAndWebsites: {
    func: (Datas: unknown[]): CommonDataTypes[keyof CommonDataTypes][] => {
      const file1 = Datas[0] as ThreadsDataTypes["AppsAndWebsites"];
      if (
        !isValidData<ThreadsDataTypes, "AppsAndWebsites">(
          file1,
          (data: ThreadsDataTypes["AppsAndWebsites"]) =>
            "text_post_app_text_app_apps_and_websites" in data
        )
      ) {
        throw new Error("資料格式有誤");
      }
      return GetDatas<
        ThreadsDataTypes,
        "AppsAndWebsites",
        CommonDataTypes["AppData"]
      >(file1);
    },
    fileNames: ["Apps And Websites"],
    listTitle: "(Threads) 您連結的應用程式與網站",

    columns: AppDataColumns,
    dataSource: (data) =>
      AppDataSource(data as CommonDataTypes["AppData"][]) as [],
  },
};
