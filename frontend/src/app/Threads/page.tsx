"use client";
import { IntroSection } from "@/components/Threads/IntroSection";
import { FileUploadSection } from "@/components/common/FileUploadSection";
import { ThreadsFeatureMethods } from "@/components/Threads/FeatureMethods";

export default function ThreadsPage() {
  return (
    <>
      <IntroSection />
      <FileUploadSection FeatureMethods={ThreadsFeatureMethods} />
    </>
  );
}
