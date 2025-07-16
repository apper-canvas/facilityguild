import { createContext, useContext, useState, useEffect } from "react";
import notificationService from "@/services/api/notificationService";

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await notificationService.getAll();
      setNotifications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications(prev =>
        prev.map(notification =>
          notification.Id === notificationId
            ? { ...notification, IsRead: true }
            : notification
        )
      );
    } catch (err) {
      throw new Error("Failed to mark notification as read");
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, IsRead: true }))
      );
    } catch (err) {
      throw new Error("Failed to mark all notifications as read");
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      await notificationService.delete(notificationId);
      setNotifications(prev =>
        prev.filter(notification => notification.Id !== notificationId)
      );
    } catch (err) {
      throw new Error("Failed to delete notification");
    }
  };

  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const value = {
    notifications,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    addNotification,
    refreshNotifications: fetchNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;