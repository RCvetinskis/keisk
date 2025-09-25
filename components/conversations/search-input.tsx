"use client";
import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

type Props = {
  placeholder: string;
  onSearch?: (value: string) => void;
  debounceTime?: number;
};

const SearchInput = ({ placeholder, onSearch, debounceTime = 500 }: Props) => {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), debounceTime);
    return () => clearTimeout(handler);
  }, [value, debounceTime]);

  useEffect(() => {
    if (onSearch) onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <div className="relative w-full max-w-sm">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-gray-400" />
      </div>
      <Input
        className="pl-10"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
