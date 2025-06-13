// app/account/page.tsx
"use client";
import { useState, useEffect, JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Edit3,
  Trash2,
  Save,
  X,
  Shield,
  AlertTriangle,
  Camera,
  Settings,
  Lock,
  Bell,
  Phone,
  RefreshCw,
} from "lucide-react";
import { PrismaUser, UserFormData, NotificationSettings } from "@/types";
import Image from "next/image";

export default function AccountPage(): JSX.Element {
  const { isAuthenticated, isLoading, getPermission } = useKindeBrowserClient();
  const router = useRouter();
  const isAdmin: boolean = getPermission("admin")?.isGranted || false;

  const [user, setUser] = useState<PrismaUser | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    type: "success" | "error" | "";
    text: string;
  }>({ type: "", text: "" });

  const [formData, setFormData] = useState<UserFormData>({
    firstName: "",
    lastName: "",
    email: "",
    profileImage: "",
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    push: false,
    sms: false,
    marketing: false,
  });

  // Tab configuration with enhanced animations
  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "security", label: "Security", icon: Lock },
  ];

  // Load current user data using your existing /api/users/me endpoint
  useEffect(() => {
    if (isAuthenticated) {
      loadCurrentUser();
    }
  }, [isAuthenticated]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/api/auth/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const loadCurrentUser = async (): Promise<void> => {
    try {
      setRefreshing(true);
      const response = await fetch("/api/users/me");
      if (response.ok) {
        const userData: PrismaUser = await response.json();
        setUser(userData);
        setFormData({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          email: userData.email,
          profileImage: userData.profileImage || "",
        });
      } else {
        showMessage("error", "Failed to load user data");
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      showMessage("error", "Failed to load user data");
    } finally {
      setRefreshing(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev: UserFormData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (
    key: keyof NotificationSettings,
    value: boolean
  ): void => {
    setNotifications((prev: NotificationSettings) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadFormData = new FormData();
    uploadFormData.append("image", file);

    try {
      setLoading(true);
      // You would implement image upload endpoint
      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      if (response.ok) {
        const result = await response.json();
        setFormData((prev: UserFormData) => ({
          ...prev,
          profileImage: result.url,
        }));
        showMessage("success", "Profile image uploaded successfully!");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      showMessage("error", "Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: "success" | "error", text: string): void => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  // Use your existing PUT /api/users/me endpoint
  const handleSave = async (): Promise<void> => {
    if (!user) return;

    setLoading(true);
    try {
      const response = await fetch("/api/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          profileImage: formData.profileImage,
        }),
      });

      if (response.ok) {
        const updatedUser: PrismaUser = await response.json();
        setUser(updatedUser);
        setIsEditing(false);
        showMessage("success", "Profile updated successfully!");
      } else {
        const errorData = await response.json();
        showMessage("error", errorData.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      showMessage("error", "An error occurred while updating your profile.");
    } finally {
      setLoading(false);
    }
  };

  // Use your existing DELETE /api/users/[userId] endpoint
  const handleDeleteAccount = async (): Promise<void> => {
    if (!user) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        window.location.href = "/api/auth/logout";
      } else {
        const errorData = await response.json();
        showMessage("error", errorData.error || "Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      showMessage("error", "An error occurred while deleting your account.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async (): Promise<void> => {
    await loadCurrentUser();
    showMessage("success", "Profile refreshed successfully!");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your account...</p>
        </motion.div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <></>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Message Display with Animations */}
        <AnimatePresence>
          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              className={`mb-6 p-4 rounded-lg shadow-lg border-l-4 ${
                message.type === "success"
                  ? "bg-green-50 border-green-400 text-green-800"
                  : "bg-red-50 border-red-400 text-red-800"
              }`}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {message.type === "success" ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center"
                    >
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </motion.div>
                  ) : (
                    <AlertTriangle size={20} />
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{message.text}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Header with Interactive Elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-6 overflow-hidden border border-gray-100"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center overflow-hidden shadow-lg"
                >
                  {user.profileImage ? (
                    <Image
                      width={80}
                      height={80}
                      src={user.profileImage}
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <User size={40} className="text-white" />
                  )}
                </motion.div>
                {isEditing && (
                  <motion.label
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <Camera size={24} className="text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </motion.label>
                )}
              </div>
              <div>
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-3xl font-bold text-gray-900"
                >
                  {user.firstName} {user.lastName}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-gray-600 text-lg"
                >
                  {user.email}
                </motion.p>
                <div className="flex items-center space-x-2 mt-2">
                  {user.role === "admin" && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200"
                    >
                      <Shield size={12} className="mr-1" />
                      Administrator
                    </motion.span>
                  )}
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-2 h-2 bg-green-400 rounded-full mr-1"
                    ></motion.div>
                    Active
                  </motion.span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                disabled={refreshing}
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                <RefreshCw
                  size={20}
                  className={refreshing ? "animate-spin" : ""}
                />
              </motion.button>

              {isAdmin && (
                <motion.a
                  href="/dashboard"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Shield size={16} className="mr-2" />
                  Admin Dashboard
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Tabs with Smooth Animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm mb-6 border border-gray-100"
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map(({ id, label, icon: Icon }, index) => (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 relative ${
                    activeTab === id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={16} />
                  </motion.div>
                  <span>{label}</span>
                  {activeTab === id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-blue-50 rounded-lg -z-10"
                      initial={false}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Enhanced Tab Content with Smooth Transitions */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === "profile" && (
                <ProfileTab
                  key="profile"
                  formData={formData}
                  isEditing={isEditing}
                  loading={loading}
                  onInputChange={handleInputChange}
                  onEdit={() => setIsEditing(true)}
                  onSave={handleSave}
                  onCancel={() => {
                    setIsEditing(false);
                    // Reset form data to original values
                    setFormData({
                      firstName: user?.firstName || "",
                      lastName: user?.lastName || "",
                      email: user?.email || "",
                      profileImage: user?.profileImage || "",
                    });
                  }}
                />
              )}

              {activeTab === "settings" && (
                <SettingsTab
                  key="settings"
                  notifications={notifications}
                  loading={loading}
                  onNotificationChange={handleNotificationChange}
                  onSave={() =>
                    showMessage("success", "Settings saved successfully!")
                  }
                />
              )}

              {activeTab === "security" && (
                <SecurityTab
                  key="security"
                  onDeleteAccount={() => setShowDeleteModal(true)}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Enhanced Delete Account Modal */}
        <DeleteAccountModal
          isOpen={showDeleteModal}
          loading={loading}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteAccount}
          userName={`${user.firstName} ${user.lastName}`}
        />
      </div>
    </div>
  );
}

// Enhanced Profile Tab Component with Better Animations
function ProfileTab({
  formData,
  isEditing,
  loading,
  onInputChange,
  onEdit,
  onSave,
  onCancel,
}: {
  formData: UserFormData;
  isEditing: boolean;
  loading: boolean;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-semibold text-gray-900"
        >
          Profile Information
        </motion.h2>
        {!isEditing ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEdit}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Edit3 size={16} className="mr-2" />
            Edit Profile
          </motion.button>
        ) : (
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSave}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                />
              ) : (
                <Save size={16} className="mr-2" />
              )}
              Save Changes
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCancel}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <X size={16} className="mr-2" />
              Cancel
            </motion.button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          <label className="block text-sm font-medium text-gray-700">
            <User size={16} className="inline mr-2" />
            First Name
          </label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={onInputChange}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200"
            placeholder="Enter your first name"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <label className="block text-sm font-medium text-gray-700">
            <User size={16} className="inline mr-2" />
            Last Name
          </label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={onInputChange}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200"
            placeholder="Enter your last name"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="md:col-span-2 space-y-2"
        >
          <label className="block text-sm font-medium text-gray-700">
            <Mail size={16} className="inline mr-2" />
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled={true}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 flex items-center">
            <AlertTriangle size={12} className="mr-1" />
            Email cannot be changed for security reasons
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Enhanced Settings Tab Component
function SettingsTab({
  notifications,
  loading,
  onNotificationChange,
  onSave,
}: {
  notifications: NotificationSettings;
  loading: boolean;
  onNotificationChange: (
    key: keyof NotificationSettings,
    value: boolean
  ) => void;
  onSave: () => void;
}): JSX.Element {
  const notificationConfigs = [
    {
      key: "email" as keyof NotificationSettings,
      title: "Email Notifications",
      description: "Receive important updates via email",
      icon: Mail,
      color: "blue",
    },
    {
      key: "push" as keyof NotificationSettings,
      title: "Push Notifications",
      description: "Get instant notifications on your device",
      icon: Bell,
      color: "green",
    },
    {
      key: "sms" as keyof NotificationSettings,
      title: "SMS Notifications",
      description: "Receive critical alerts via text message",
      icon: Phone,
      color: "yellow",
    },
    {
      key: "marketing" as keyof NotificationSettings,
      title: "Marketing Communications",
      description: "Stay updated with new features and promotions",
      icon: Mail,
      color: "purple",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-semibold text-gray-900"
        >
          Notification Preferences
        </motion.h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSave}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
            />
          ) : (
            <Save size={16} className="mr-2" />
          )}
          Save Settings
        </motion.button>
      </div>

      <div className="space-y-4">
        {notificationConfigs.map(
          ({ key, title, description, icon: Icon, color }, index) => (
            <motion.div
              key={String(key)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-all duration-200 bg-white hover:shadow-md"
            >
              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`p-2 rounded-lg bg-${color}-100`}
                >
                  <Icon size={20} className={`text-${color}-600`} />
                </motion.div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{title}</h3>
                  <p className="text-sm text-gray-500">{description}</p>
                </div>
              </div>
              <motion.label
                whileHover={{ scale: 1.05 }}
                className="relative inline-flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={notifications[key]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onNotificationChange(key, e.target.checked)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </motion.label>
            </motion.div>
          )
        )}
      </div>
    </motion.div>
  );
}

// Enhanced Security Tab Component
function SecurityTab({
  onDeleteAccount,
}: {
  onDeleteAccount: () => void;
}): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-semibold text-gray-900"
      >
        Security & Privacy
      </motion.h2>

      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-all duration-200 bg-white hover:shadow-md"
        >
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            Password Management
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Your password is securely managed by our authentication provider.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
          >
            Change Password
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-all duration-200 bg-white hover:shadow-md"
        >
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            Two-Factor Authentication
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Add an extra layer of security to protect your account.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
          >
            Enable 2FA
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4"
        >
          <div className="flex items-start space-x-3">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <AlertTriangle size={20} className="text-red-600 mt-0.5" />
            </motion.div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-red-800 mb-2">
                Danger Zone
              </h3>
              <p className="text-sm text-red-600 mb-4">
                Permanently delete your account and all associated data. This
                action cannot be undone.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onDeleteAccount}
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Trash2 size={16} className="mr-2" />
                Delete Account
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Enhanced Delete Account Modal with Better UX
function DeleteAccountModal({
  isOpen,
  loading,
  onClose,
  onConfirm,
  userName,
}: {
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}): JSX.Element {
  const [confirmText, setConfirmText] = useState<string>("");
  const confirmationText: string = "DELETE MY ACCOUNT";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Delete Account
              </h3>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X size={20} />
              </motion.button>
            </div>

            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <AlertTriangle size={24} className="text-red-600" />
                </motion.div>
                <p className="text-sm text-gray-600">
                  This action cannot be undone. All your data will be
                  permanently deleted.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4"
              >
                <p className="text-sm text-yellow-800">
                  <strong>Account:</strong> {userName}
                </p>
              </motion.div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type &quot;
                <span className="font-mono text-red-600">
                  {confirmationText}
                </span>
                &quot; to confirm:
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder={confirmationText}
              />
            </div>

            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                disabled={loading}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-all duration-200"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onConfirm}
                disabled={confirmText !== confirmationText || loading}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    Deleting...
                  </div>
                ) : (
                  "Delete Account"
                )}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
