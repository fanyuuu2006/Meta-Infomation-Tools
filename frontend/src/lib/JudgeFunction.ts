import { InstagramDataTypes } from "./Instagram/InstagramDataTypes";
import { ThreadsDataTypes } from "./Threads/ThreadsDataTypes";

export const isValidData = <
  T extends InstagramDataTypes | ThreadsDataTypes,
  K extends keyof T
>(
  Data: T[K],
  CheckFunction: (Data: T[K]) => boolean
): Data is T[K] => {
  return CheckFunction(Data);
};
