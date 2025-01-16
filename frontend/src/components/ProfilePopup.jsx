import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, ShieldCheck } from "lucide-react";

const ProfilePopup = ({ onClose }) => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl p-8 space-y-8 max-w-4xl w-full mx-4 shadow-2xl transform transition-all duration-500 scale-95 hover:scale-100">
        {/* Header */}
        <div className="text-center animate-slideUp">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Your Profile
          </h1>
          <p className="text-gray-500 mt-2">
            View and manage your account details
          </p>
        </div>

        {/* Profile Section */}
        <div className="flex items-center justify-center gap-6 animate-slideUp">
          {/* Avatar Section */}
          <div className="relative flex-shrink-0">
            <img
              src={
                selectedImg ||
                authUser.profilePic ||
                "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png"
              }
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-4 border-blue-500 shadow-lg"
            />
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 bg-gradient-to-r from-pink-500 to-purple-500 text-white p-2 rounded-full cursor-pointer transition-all duration-200 shadow-lg hover:scale-110 ${
                isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
              }`}
            >
              <Camera className="w-6 h-6" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>

          {/* Profile Information */}
          <div className="space-y-2">
            <div>
              <div className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                <User className="w-4 h-4 text-gray-400" />
                Full Name
              </div>
              <p className="p-3 bg-gray-100 rounded-lg border border-gray-200 shadow-sm">
                {authUser?.fullName || "Not Provided"}
              </p>
            </div>
            <div>
              <div className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                <Mail className="w-4 h-4 text-gray-400" />
                Email Address
              </div>
              <p className="p-3 bg-gray-100 rounded-lg border border-gray-200 shadow-sm">
                {authUser?.email || "Not Provided"}
              </p>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm animate-slideUp">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Account Details
          </h2>
          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span>Member Since</span>
              </div>
              <span>{authUser.createdAt?.split("T")[0] || "Unknown"}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-gray-400" />
                <span>Account Status</span>
              </div>
              <span className="text-green-600 font-medium">Active</span>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="text-center mt-6 animate-slideUp">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopup;
