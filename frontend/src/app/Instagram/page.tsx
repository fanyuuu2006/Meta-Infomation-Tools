"use client";
import { FileUploadSection } from "@/components/common/FileUploadSection";
import { InstagramFeatureMethods } from "@/lib/Instagram/FeatureMethods";

export default function InstagramPage(){
  return (
    <>
      <FileUploadSection FeatureMethods={InstagramFeatureMethods}/>
    </>
  );
};
