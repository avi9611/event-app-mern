import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, ShieldCheck } from "lucide-react";

const ProfilePage = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 pt-20 pb-10">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white shadow-xl rounded-2xl p-8 space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Your Profile</h1>
            <p className="text-gray-500 mt-2">Manage your account details</p>
          </div>

          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow-lg"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 
                  text-white p-2 rounded-full cursor-pointer transition-all 
                  duration-200 shadow-lg ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }`}
              >
                <Camera className="w-5 h-5" />
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
            <p className="text-sm text-gray-500">
              {isUpdatingProfile ? "Uploading your photo..." : "Tap the camera icon to update"}
            </p>
          </div>

          {/* User Information */}
          <div className="grid md:grid-cols-2 gap-6">
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

          {/* Account Information */}
          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Account Details</h2>
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

          {/* Edit Button */}
          <div className="text-center mt-6">
            <button className="btn btn-primary px-6 py-2.5 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
