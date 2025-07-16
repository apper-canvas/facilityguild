import mockNotifications from "@/services/mockData/notifications.json";

// Simulate API delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Local storage for notifications state
const STORAGE_KEY = "notifications_state";

const getStoredNotifications = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return [...mockNotifications];
};

const saveNotifications = (notifications) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
};

const notificationService = {
  async getAll() {
    await delay(300);
    return getStoredNotifications();
  },

  async getById(id) {
    await delay(200);
    const notifications = getStoredNotifications();
    const notification = notifications.find(n => n.Id === parseInt(id));
    if (!notification) {
      throw new Error(`Notification with ID ${id} not found`);
    }
    return { ...notification };
  },

  async create(notificationData) {
    await delay(400);
    const notifications = getStoredNotifications();
    const newNotification = {
      ...notificationData,
      Id: Math.max(...notifications.map(n => n.Id), 0) + 1,
      CreatedAt: new Date().toLocaleString(),
      IsRead: false
    };
    const updatedNotifications = [newNotification, ...notifications];
    saveNotifications(updatedNotifications);
    return { ...newNotification };
  },

  async update(id, notificationData) {
    await delay(350);
    const notifications = getStoredNotifications();
    const index = notifications.findIndex(n => n.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Notification with ID ${id} not found`);
    }
    
    const updatedNotification = {
      ...notifications[index],
      ...notificationData,
      Id: parseInt(id) // Ensure ID doesn't change
    };
    
    notifications[index] = updatedNotification;
    saveNotifications(notifications);
    return { ...updatedNotification };
  },

  async delete(id) {
    await delay(300);
    const notifications = getStoredNotifications();
    const filteredNotifications = notifications.filter(n => n.Id !== parseInt(id));
    if (filteredNotifications.length === notifications.length) {
      throw new Error(`Notification with ID ${id} not found`);
    }
    saveNotifications(filteredNotifications);
    return { success: true };
  },

  async markAsRead(id) {
    await delay(250);
    const notifications = getStoredNotifications();
    const index = notifications.findIndex(n => n.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Notification with ID ${id} not found`);
    }
    
    notifications[index].IsRead = true;
    saveNotifications(notifications);
    return { ...notifications[index] };
  },

  async markAllAsRead() {
    await delay(400);
    const notifications = getStoredNotifications();
    const updatedNotifications = notifications.map(n => ({
      ...n,
      IsRead: true
    }));
    saveNotifications(updatedNotifications);
    return updatedNotifications;
  },

  async getUnreadCount() {
    await delay(150);
    const notifications = getStoredNotifications();
    return notifications.filter(n => !n.IsRead).length;
  },

  async getByType(type) {
    await delay(250);
    const notifications = getStoredNotifications();
    return notifications.filter(n => n.Type === type);
  },

  async getByPriority(priority) {
    await delay(250);
    const notifications = getStoredNotifications();
    return notifications.filter(n => n.Priority === priority);
  }
};

export default notificationService;