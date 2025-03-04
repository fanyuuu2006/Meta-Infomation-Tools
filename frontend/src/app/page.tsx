"use client";
import { useState } from "react";
import { UserData } from "@/lib/DataTypes";
import { FileUploadDiv } from "@/components/common/FileUploadDiv";

export default function Index() {
  const [Data, setData] = useState<UserData[]>([]);

  return Data ? (
    <>
      <FileUploadDiv setData={setData} />
    </>
  ) : (
    <></>
  );
}
