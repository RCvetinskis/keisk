"use client";
import SearchInput from "@/components/conversations/search-input";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ConversationHeader = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);

      if (value) params.set("query", value);
      else params.delete("query");

      router.replace(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  return (
    <CardHeader className="border-b flex items-center justify-between">
      <div className="space-y-1">
        <CardTitle>Danielius R</CardTitle>
        <CardDescription>Active 2 hours ago</CardDescription>
      </div>

      <div>
        <SearchInput onSearch={handleSearch} placeholder="Search chat..." />
      </div>
    </CardHeader>
  );
};

export default ConversationHeader;


export const ConversationHeaderSkeleton = () => (
  <CardHeader className="border-b flex items-center justify-between">
    <div className="space-y-2">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-4 w-24" />
    </div>
    <Skeleton className="h-10 w-48" />
  </CardHeader>
);