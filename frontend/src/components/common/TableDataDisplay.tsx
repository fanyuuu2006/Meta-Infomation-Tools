import { InstagramDataTypes } from "@/lib/Instagram/InstagramDataTypes";
import { ThreadsDataTypes } from "@/lib/Threads/ThreadsDataTypes";
import { OutsideLink } from "./OutsideLink";
import { Method } from "./FileUploadSection";

export const UserDataDisplay = (
  User: InstagramDataTypes["UserData"] | ThreadsDataTypes["UserData"],
  index: number,
  Method: Method
) => (
  <>
    <td>{index + 1}. </td>
    <td className="FileUpload-Table-Data">
      <OutsideLink href={User.string_list_data[0]?.href}>
        {User.string_list_data[0]?.value}
      </OutsideLink>
    </td>
    <td className="FileUpload-Table-Data Hint">
      {Method.note(User.string_list_data[0]?.timestamp)}
    </td>
  </>
);
