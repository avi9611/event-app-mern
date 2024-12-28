import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } =
    useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  // Fetch messages when a user is selected
  useEffect(() => {
    if (selectedUser && selectedUser._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser, getMessages]);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-gray-100">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-inherit bg-opacity-30 dark:bg-opacity-15 bg-white dark:bg-gray-700">
      {/* Header */}
      <div className="bg-gray-200 text-gray-700 py-4 px-6 shadow">
        <ChatHeader />
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message._id}
              className={`chat flex items-start ${
                message.senderId === authUser?._id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {/* Profile Picture */}
              <div className="chat-image avatar flex-shrink-0">
                <div className="w-10 h-10 rounded-full border border-gray-300 overflow-hidden">
                  <img
                    src={
                      message.senderId === authUser?._id
                        ? authUser?.profilePic ||
                          "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png"
                        : selectedUser?.profilePic ||
                          "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png"
                    }
                    alt="profile pic"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* Message Content */}
              <div
                className={`chat-bubble max-w-xs sm:max-w-sm md:max-w-md p-4 rounded-lg shadow-md ${
                  message.senderId === authUser?._id
                    ? "bg-gray-300 text-gray-900"
                    : "bg-white text-gray-700"
                }`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="rounded-md mb-2 max-w-full"
                  />
                )}
                {message.text && <p className="break-words">{message.text}</p>}
                <time
                  className={`text-xs mt-1 block ${
                    message.senderId === authUser?._id
                      ? "text-gray-600"
                      : "text-gray-500"
                  }`}
                >
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center mt-4">
            No messages yet. Start the conversation!
          </div>
        )}

        {/* Scroll-to-end reference */}
        <div ref={messageEndRef}></div>
      </div>

      {/* Input area */}
      <div className="bg-white border-t border-gray-300 p-4">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
