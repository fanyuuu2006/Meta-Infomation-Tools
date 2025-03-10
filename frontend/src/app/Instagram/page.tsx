"use client";
import { FileUploadSection } from "@/components/common/FileUploadSection";
import { IntroSection } from "@/components/Instagram/IntroSection";
import { InstagramFeatureMethods } from "@/components/Instagram/FeatureMethods";

export default function InstagramPage() {
  return (
    <>
      <IntroSection />
      <FileUploadSection FeatureMethods={InstagramFeatureMethods} />
    </>
  );
}
