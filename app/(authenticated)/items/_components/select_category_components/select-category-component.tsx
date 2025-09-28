"use client";

import { useState, useEffect } from "react";
import { CategoryWithChildren } from "@/types/categoryTypes";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  categories: CategoryWithChildren[];
  value?: number;
  onChange: (id: number) => void;
};

export default function SelectCategoryComponent({
  categories,
  value,
  onChange,
}: Props) {
  const [currentCategories, setCurrentCategories] =
    useState<CategoryWithChildren[]>(categories);
  const [history, setHistory] = useState<CategoryWithChildren[][]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any | null>(null);

  const flatten = (
    cats: CategoryWithChildren[],
    path: string[] = []
  ): any[] => {
    return cats.flatMap((c) => {
      const currentPath = [...path, c.title];
      return [
        { ...c, path: currentPath },
        ...(c.children ? flatten(c.children, currentPath) : []),
      ];
    });
  };

  const flatCategories = flatten(categories);

  useEffect(() => {
    if (value) {
      const found = flatCategories.find((c) => c.id === value);
      if (found) setSelected(found);
    }
  }, [value, categories]);

  const handleClick = (cat: CategoryWithChildren) => {
    if (search) {
      setSelected(cat);
      onChange(cat.id);
    } else if (cat.children?.length) {
      setHistory([...history, currentCategories]);
      setCurrentCategories(cat.children);
      setSearch("");
    } else {
      setSelected(cat);
      onChange(cat.id);
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prev = [...history];
      const last = prev.pop()!;
      setHistory(prev);
      setCurrentCategories(last);
    }
  };

  const filtered = search
    ? flatCategories.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase())
      )
    : currentCategories;

  if (selected) {
    return (
      <div className="border rounded-md w-full bg-white shadow-sm p-3">
        <div className="text-sm font-medium">{selected.title}</div>
        <div className="text-xs text-gray-500">
          {selected.path?.join(" > ")}
        </div>
        <button
          onClick={() => {
            setSelected(null);
            setCurrentCategories(categories);
          }}
          className="text-teal-600 text-xs underline mt-1"
        >
          Change
        </button>
      </div>
    );
  }

  return (
    <div className="border rounded-md w-full bg-white shadow-sm">
      <div className="p-2">
        <Input
          placeholder="Rasti kategoriją"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {history.length > 0 && !search && (
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 w-full"
        >
          ← Back
        </button>
      )}

      <ScrollArea className="max-h-64 overflow-y-auto">
        <div className="flex flex-col">
          {filtered.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleClick(cat)}
              className={cn(
                "flex justify-between items-center px-3 py-2 cursor-pointer hover:bg-gray-100",
                value === cat.id && "bg-teal-50 text-teal-700 font-medium"
              )}
            >
              <div>
                <div>{cat.title}</div>
                {search && (
                  <div className="text-xs text-gray-500">
                    {cat.path.join(" > ")}
                  </div>
                )}
              </div>
              {search ? (
                <span>○</span>
              ) : cat.children?.length ? (
                <span>›</span>
              ) : (
                <span>○</span>
              )}
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="px-3 py-2 text-sm text-gray-500">No results</div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
