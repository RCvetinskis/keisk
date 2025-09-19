import React from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

type Props = {};

const SearchConversation = (props: Props) => {
  return (
    <div className="relative w-full max-w-sm">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-gray-400" />
      </div>
      <Input className="pl-10" placeholder="Search conversations..." />
    </div>
  );
};

export default SearchConversation;
