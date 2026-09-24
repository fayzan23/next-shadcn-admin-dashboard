"use client";

import { type CSSProperties, useState } from "react";

import { cn } from "cn";

import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { useIsLg } from "@/hooks/use-lg";
import { useIsMobile } from "@/hooks/use-mobile";

import { ChatConversationList } from "./chat-conversation-list";
import { ChatProfileDetails } from "./chat-profile-details";
import { ChatThread } from "./chat-thread";
import type { Conversation } from "./data";
import { useChat } from "./use-chat";

interface ChatProps {
  conversations: Conversation[];
}

export function Chat({ conversations }: ChatProps) {
  const [chat] = useChat();
  const [showContact, setShowContact] = useState(false);
  const [showThread, setShowThread] = useState(false);
  const [threadLocked, setThreadLocked] = useState(false);
  const isLg = useIsLg();
  const isMobile = useIsMobile();

  const activeConversation = conversations.find((c) => c.id === chat.selected) ?? conversations[0];

  return (
    <>
      <div
        className="grid h-[calc(100svh-var(--header-height))] min-h-0 min-w-[1100px] flex-1 grid-cols-[18rem_minmax(0,1fr)_16rem] overflow-x-hidden shadow-sm transition-[grid-template-columns] duration-300 ease-out *:min-h-0 *:min-w-0 md:grid-cols-[22.5rem_minmax(0,1fr)_16rem] lg:grid-cols-[22.5rem_minmax(0,1fr)_var(--profile-width)]"
        style={
          {
            "--profile-width": "20rem",
          } as CSSProperties
        }
      >
        <ChatConversationList
          conversations={conversations}
          className={cn(
            "transition-transform duration-300 ease-out will-change-transform max-md:col-start-1 max-md:row-start-1",
            showThread && "max-md:pointer-events-none max-md:-translate-x-full",
          )}
          onSelectConversation={() => {
            if (threadLocked) return;
            setShowThread(true);
          }}
        />
        <ChatThread
          contact={activeConversation.contact}
          messages={activeConversation.messages}
          showBackButton={isMobile}
          onBack={() => {
            setShowThread(false);
            setThreadLocked(true);
          }}
          onOpenContact={() => setShowContact(true)}
          className={cn(
            "transition-transform duration-300 ease-out will-change-transform max-md:col-start-1 max-md:row-start-1",
            showThread ? "max-md:translate-x-0" : "max-md:pointer-events-none max-md:translate-x-full",
          )}
        />
        <div
          aria-hidden={!showContact}
          className={cn(
            "block overflow-hidden border-l transition-colors duration-300",
            !showContact && "pointer-events-none border-l-transparent",
          )}
        >
          <div
            className={cn(
              "h-full w-80 min-w-[16rem] transition-[opacity,transform] duration-300 ease-out",
              showContact ? "translate-x-0 opacity-100" : "translate-x-0 opacity-100",
            )}
          >
            <ChatProfileDetails contact={activeConversation.contact} onClose={() => setShowContact(false)} />
          </div>
        </div>
      </div>

      {/* Tablet/Mobile: Sheet */}
      {!isLg && (
        <Sheet open={showContact} onOpenChange={setShowContact}>
          <SheetContent
            side="right"
            className="w-[480px] min-w-[480px] max-w-none overflow-hidden p-0"
            showCloseButton={false}
          >
            <SheetTitle className="sr-only">Contact profile</SheetTitle>
            <SheetDescription className="sr-only">View contact details and activity</SheetDescription>
            <ChatProfileDetails contact={activeConversation.contact} onClose={() => setShowContact(false)} />
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
