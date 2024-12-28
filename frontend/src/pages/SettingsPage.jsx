import { useNavigate } from "react-router-dom";
import { THEMES } from "../themes/theme.js";
import { themeStore } from "../store/themeStore";
import { useAuthStore } from "../store/useAuthStore";
import { Send, LogOut, Trash } from "lucide-react";
import { useState } from "react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How do I change Theme", isSent: false },
  {
    id: 2,
    content: "It's easy just Click on Color Palette under Theme..",
    isSent: true,
  },
];

const SettingsPage = () => {
  const { theme, setTheme } = themeStore();
  const { authUser } = useAuthStore();
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleDeleteAccount = () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      // API call to delete account
    }
  };

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Column - Settings */}
      <div className="space-y-6">
        {/* Profile Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Profile</h2>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-base-300 flex items-center justify-center text-primary-content font-bold text-xl">
              {authUser?.fullName?.charAt(0) || "U"}
            </div>
            <div>
              <h3 className="font-medium text-lg">
                {authUser?.fullName || "User Name"}
              </h3>
              <p className="text-sm text-base-content/70">{authUser?.email}</p>
            </div>
          </div>
        </div>

        {/* Theme Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-base-content/70">
            Choose a theme for your chat interface
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {THEMES.map((t) => (
              <button
                key={t}
                className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${
                  theme === t ? "bg-base-200" : "hover:bg-base-200/50"
                }`}
                onClick={() => setTheme(t)}
              >
                <div
                  className="relative h-8 w-full rounded-md overflow-hidden"
                  data-theme={t}
                >
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                    <div className="rounded bg-primary"></div>
                    <div className="rounded bg-secondary"></div>
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>
                  </div>
                </div>
                <span className="text-[11px] font-medium truncate w-full text-center">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Notification Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm">Enable Notifications</span>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              className="toggle toggle-primary"
            />
          </div>
        </div>

        {/* Account Management Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Account Management</h2>
          <div className="flex flex-col gap-4">
            <button className="btn btn-primary" onClick={handleLogout}>
              <LogOut size={16} className="mr-2" />
              Logout
            </button>
            <button className="btn btn-error" onClick={handleDeleteAccount}>
              <Trash size={16} className="mr-2" />
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Right Column - Preview Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Preview</h3>
        <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
          <div className="p-4 bg-base-200">
            <div className="max-w-lg mx-auto">
              {/* Mock Chat UI */}
              <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                {/* Chat Header */}
                <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                      J
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">John Doe</h3>
                      <p className="text-xs text-base-content/70">Online</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.isSent ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-xl p-3 shadow-sm ${
                          message.isSent
                            ? "bg-primary text-primary-content"
                            : "bg-base-200"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-[10px] mt-1.5 ${
                            message.isSent
                              ? "text-primary-content/70"
                              : "text-base-content/70"
                          }`}
                        >
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-base-300 bg-base-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="input input-bordered flex-1 text-sm h-10"
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <button className="btn btn-primary h-10 min-h-0">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
