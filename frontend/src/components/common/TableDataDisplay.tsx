import { OutsideLink } from "./OutsideLink";
import { Method } from "./FileUploadSection";
import { CommonDataTypes } from "@/lib/CommonType";

export const UserDataDisplay = (
  data: CommonDataTypes["UserData"],
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

export const FeedDataDisplay = (
  data: CommonDataTypes["FeedData"],
  index: number,
) => (
  <>
    <td>{index + 1}. </td>
    <td className="FileUpload-Table-Data">
      {data.string_map_data["Owner username"].value}
    </td>
    <td className="FileUpload-Table-Data">
      {data.string_map_data["Feed name"].value}
    </td>
    <td className="FileUpload-Table-Data">
      {data.string_map_data["Feed type"].value}
    </td>
    <td className="FileUpload-Table-Data">
      {data.string_map_data["Added topic names delimited by `|`"].value}
    </td>
    <td className="FileUpload-Table-Data">
      {data.string_map_data["Added usernames delimited by `|`"].value}
    </td>
  </>
);
