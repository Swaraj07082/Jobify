import * as React from "react";

import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

import ScrollAreaProps from "../types/ScrollAreaProps";

export function ScrollAreaDemo({ width }: ScrollAreaProps) {
  return (
    <ScrollArea className={` h-96 w-[${width}] rounded-3xl border`}>
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <>
            <div key={tag} className="text-sm">
              {tag}
            </div>
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
  );
}
