import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!showOnlineOnly || onlineUsers.includes(user._id))
  );

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-gray-200 flex flex-col bg-gray-50 shadow-md transition-all duration-300">
      {/* Header */}
      <div className="border-b border-gray-200 w-full p-5 bg-gradient-to-r from-pink-200 to-purple-300 text-black">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6" />
          <span className="font-semibold hidden lg:block text-lg">
            Contacts
          </span>
        </div>
        {/* Search Bar */}
        <div className="mt-4 px-2">
          <input
            type="text"
            placeholder="Search contacts"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full h-8 text-sm px-4 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        {/* Online Filter Toggle */}
        <div className="mt-4 hidden lg:flex items-center gap-3">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-lg font-medium">
            {onlineUsers.length - 1} online
          </span>
        </div>
      </div>

      {/* User List */}
      <div className="overflow-y-auto w-full py-4">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full px-4 py-3 flex items-center gap-4 transition-all rounded-md
              ${
                selectedUser?._id === user._id
                  ? "bg-blue-100 ring-2 ring-blue-400"
                  : "hover:bg-slate-200"
              }`}
          >
            {/* Profile Picture */}
            <div className="relative mx-auto lg:mx-0">
              <img
                src={
                  user.profilePic ||
                  "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png"
                }
                alt={user.name}
                className="w-12 h-12 object-cover rounded-full border-2 border-gray-300"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
              )}
            </div>

            {/* User Info */}
            <div className="hidden lg:block text-left">
              <div className="font-semibold text-gray-800 truncate">
                {user.fullName}
              </div>
              <div
                className={`text-sm ${
                  onlineUsers.includes(user._id)
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              >
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {/* Empty State */}
        <div className="text-center text-gray-500 py-6 hidden lg:block">
          {/* This will be hidden on mobile */}
          {filteredUsers.length === 0 && "No users found. Try adjusting your filters."}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
