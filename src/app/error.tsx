"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.log("error", error);
  }, [error]);

  return (
    <div className="flex-1 flex items-center justify-center flex-col gap-2">
      <h2>Something went wrong!</h2>
      <Button onClick={() => unstable_retry()}>Reload</Button>
    </div>
  );
}
