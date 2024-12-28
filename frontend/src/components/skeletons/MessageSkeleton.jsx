const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`chat flex items-start ${
            idx % 2 === 0 ? "justify-start" : "justify-end"
          }`}
        >
          {/* Skeleton avatar */}
          <div className="chat-image avatar flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
          </div>

          {/* Skeleton message bubble */}
          <div
            className={`chat-bubble max-w-xs sm:max-w-sm md:max-w-md p-4 rounded-lg shadow-md bg-gray-300 animate-pulse ${
              idx % 2 === 0 ? "ml-4" : "mr-4"
            }`}
          >
            <div
              className={`h-4 mb-2 ${
                idx % 2 === 0 ? "w-2/3" : "w-1/2"
              } bg-gray-400 rounded`}
            />
            <div className="h-4 w-full bg-gray-400 rounded" />
            {Math.random() > 0.5 && (
              <div className="h-4 mt-2 w-1/4 bg-gray-400 rounded" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
