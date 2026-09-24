import { Bell, MessageSquarePlus, Search, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

export function ChatHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-(--header-height) w-full items-center overflow-x-hidden border-b bg-background">
      <div className="flex h-full min-w-[980px] w-full items-center justify-between gap-3 overflow-x-hidden px-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <h1 className="max-w-[72px] truncate font-medium text-base">Studio Chat</h1>
          <InputGroup className="h-7 w-full min-w-[360px] max-w-sm">
            <InputGroupInput className="h-7" placeholder="Search conversations..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Button variant="ghost" size="icon-sm" aria-label="New conversation">
            <MessageSquarePlus />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Notifications">
            <Bell />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Settings">
            <Settings />
          </Button>
        </div>
      </div>
    </header>
  );
}
