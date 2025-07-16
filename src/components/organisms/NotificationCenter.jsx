import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNotifications } from "@/components/organisms/NotificationContext";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { toast } from "react-toastify";

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useNotifications();

  const unreadCount = notifications.filter(n => !n.IsRead).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <ApperIcon name="Bell" className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
<motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-lg shadow-elevated border border-slate-200 z-50"
          >
            <div className="p-4 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMarkAllAsRead}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    Mark all as read
                  </Button>
                )}
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <ApperIcon name="Bell" className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">No notifications yet</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.Id}
                    className={`p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                      !notification.IsRead ? "bg-blue-50" : ""
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
                                className="p-1 h-6 w-6"
                              >
                                <ApperIcon name="Check" className="h-3 w-3" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(notification.Id)}
                              className="p-1 h-6 w-6 text-red-500 hover:text-red-600"
                            >
                              <ApperIcon name="X" className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-4 border-t border-slate-200">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsOpen(false);
                    window.location.href = "/notifications";
                  }}
                  className="w-full text-primary-600 hover:text-primary-700"
                >
                  View all notifications
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;