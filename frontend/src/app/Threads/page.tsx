"use client";
import { FileUploadSection } from "@/components/common/FileUploadSection";
import { ThreadsFeatureMethods } from "@/lib/Threads/FeatureMethods";

export default function ThreadsPage(){
  return (
    <>
      <FileUploadSection FeatureMethods={ThreadsFeatureMethods}/>
    </>
  );
};
