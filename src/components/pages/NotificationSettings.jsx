import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNotifications } from "@/components/organisms/NotificationContext";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import { toast } from "react-toastify";

const NotificationSettings = () => {
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useNotifications();
  const [filter, setFilter] = useState("all");
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    workOrderNotifications: true,
    assetNotifications: true,
    maintenanceNotifications: true,
    alertNotifications: true
  });

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "unread") return !notification.IsRead;
    if (filter === "read") return notification.IsRead;
    return true;
  });

  const handleSettingChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    toast.success("Settings updated");
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markAsRead(notificationId);
      toast.success("Notification marked as read");
    } catch (error) {
      toast.error("Failed to mark notification as read");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      toast.success("All notifications marked as read");
    } catch (error) {
      toast.error("Failed to mark all notifications as read");
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      await deleteNotification(notificationId);
      toast.success("Notification deleted");
    } catch (error) {
      toast.error("Failed to delete notification");
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "work_order":
        return "ClipboardList";
      case "asset":
        return "Package";
      case "maintenance":
        return "Wrench";
      case "alert":
        return "AlertTriangle";
      default:
        return "Bell";
    }
  };

  const getNotificationColor = (type, priority) => {
    if (priority === "high") return "text-red-500";
    if (priority === "medium") return "text-amber-500";
    
    switch (type) {
      case "work_order":
        return "text-blue-500";
      case "asset":
        return "text-green-500";
      case "maintenance":
        return "text-amber-500";
      case "alert":
        return "text-red-500";
      default:
        return "text-slate-500";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Notification Settings</h1>
        <p className="text-slate-600">
          Manage your notification preferences and view all notifications
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Panel */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Notification Preferences
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Email Notifications
                  </label>
                  <p className="text-xs text-slate-500">
                    Receive notifications via email
                  </p>
                </div>
                <button
                  onClick={() => handleSettingChange("emailNotifications")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.emailNotifications ? "bg-primary-600" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.emailNotifications ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Push Notifications
                  </label>
                  <p className="text-xs text-slate-500">
                    Receive browser notifications
                  </p>
                </div>
                <button
                  onClick={() => handleSettingChange("pushNotifications")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.pushNotifications ? "bg-primary-600" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.pushNotifications ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <h3 className="text-sm font-medium text-slate-700 mb-3">
                  Notification Types
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-slate-600">Work Orders</label>
                    <button
                      onClick={() => handleSettingChange("workOrderNotifications")}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        settings.workOrderNotifications ? "bg-primary-600" : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                          settings.workOrderNotifications ? "translate-x-5" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm text-slate-600">Assets</label>
                    <button
                      onClick={() => handleSettingChange("assetNotifications")}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        settings.assetNotifications ? "bg-primary-600" : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                          settings.assetNotifications ? "translate-x-5" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm text-slate-600">Maintenance</label>
                    <button
                      onClick={() => handleSettingChange("maintenanceNotifications")}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        settings.maintenanceNotifications ? "bg-primary-600" : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                          settings.maintenanceNotifications ? "translate-x-5" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm text-slate-600">Alerts</label>
                    <button
                      onClick={() => handleSettingChange("alertNotifications")}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        settings.alertNotifications ? "bg-primary-600" : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                          settings.alertNotifications ? "translate-x-5" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Notifications List */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">
                All Notifications
              </h2>
              <div className="flex items-center space-x-2">
                <div className="flex rounded-lg bg-slate-100 p-1">
                  <button
                    onClick={() => setFilter("all")}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      filter === "all"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter("unread")}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      filter === "unread"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Unread
                  </button>
                  <button
                    onClick={() => setFilter("read")}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      filter === "read"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Read
                  </button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMarkAllAsRead}
                  className="text-primary-600 hover:text-primary-700"
                >
                  Mark all as read
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-8">
                  <ApperIcon name="Bell" className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">No notifications found</p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.Id}
                    className={`p-4 border rounded-lg transition-colors ${
                      !notification.IsRead 
                        ? "bg-blue-50 border-blue-200" 
                        : "bg-white border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${!notification.IsRead ? "bg-blue-100" : "bg-slate-100"}`}>
                        <ApperIcon
                          name={getNotificationIcon(notification.Type)}
                          className={`h-4 w-4 ${getNotificationColor(notification.Type, notification.Priority)}`}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className={`text-sm font-medium ${!notification.IsRead ? "text-slate-900" : "text-slate-700"}`}>
                              {notification.Title}
                            </h4>
                            <p className="text-sm text-slate-600 mt-1">
                              {notification.Message}
                            </p>
                            <p className="text-xs text-slate-500 mt-2">
                              {notification.CreatedAt}
                            </p>
                          </div>

                          <div className="flex items-center space-x-1 ml-2">
                            {!notification.IsRead && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMarkAsRead(notification.Id)}
                                className="p-2 h-8 w-8"
                              >
                                <ApperIcon name="Check" className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(notification.Id)}
                              className="p-2 h-8 w-8 text-red-500 hover:text-red-600"
                            >
                              <ApperIcon name="Trash2" className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationSettings;