import CometChat from "@cometchat-pro/chat";

declare global {
    interface Window {
      CometChat?: CometChat
    }
  }
  