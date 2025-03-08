import { OutsideLink } from "./OutsideLink";
import { Method } from "./FileUploadSection";
import { CommonDataTypes } from "@/lib/CommonType";

export const UserDataDisplay = (
  data: CommonDataTypes["UserData"] | CommonDataTypes["UserData"],
  index: number,
  Method: Method
) => (
  <>
    <td>{index + 1}. </td>
    <td className="FileUpload-Table-Data">
      <OutsideLink href={data.string_list_data[0]?.href}>
        {data.string_list_data[0]?.value}
      </OutsideLink>
    </td>
    <td className="FileUpload-Table-Data Hint">
      {Method.note(data.string_list_data[0]?.timestamp)}
    </td>
  </>
);
