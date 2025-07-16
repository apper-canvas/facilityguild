import { toast } from "react-toastify";

const notificationService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } },
          { field: { Name: "title_c" } },
          { field: { Name: "message_c" } },
          { field: { Name: "type_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "is_read_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "related_id_c" } },
          { field: { Name: "related_type_c" } }
        ],
        orderBy: [
          {
            fieldName: "created_at_c",
            sorttype: "DESC"
          }
        ]
      };

      const response = await apperClient.fetchRecords("app_Notification_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      // Map database fields to UI expected format
      return response.data?.map(item => ({
        Id: item.Id,
        Title: item.title_c || item.Name || '',
        Message: item.message_c || '',
        Type: item.type_c || '',
        Priority: item.priority_c || 'medium',
        IsRead: item.is_read_c || false,
        CreatedAt: item.created_at_c || item.CreatedOn || '',
        RelatedId: item.related_id_c || null,
        RelatedType: item.related_type_c || ''
      })) || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching notifications:", error?.response?.data?.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error fetching notifications:", error.message);
        toast.error("Failed to load notifications");
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "title_c" } },
          { field: { Name: "message_c" } },
          { field: { Name: "type_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "is_read_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "related_id_c" } },
          { field: { Name: "related_type_c" } }
        ]
      };

      const response = await apperClient.getRecordById("app_Notification_c", parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (!response.data) {
        return null;
      }

      const item = response.data;
      return {
        Id: item.Id,
        Title: item.title_c || item.Name || '',
        Message: item.message_c || '',
        Type: item.type_c || '',
        Priority: item.priority_c || 'medium',
        IsRead: item.is_read_c || false,
        CreatedAt: item.created_at_c || '',
        RelatedId: item.related_id_c || null,
        RelatedType: item.related_type_c || ''
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching notification with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(`Error fetching notification with ID ${id}:`, error.message);
      }
      return null;
    }
  },

  async create(notificationData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields
      const params = {
        records: [{
          Name: notificationData.Title || notificationData.title || '',
          Tags: notificationData.tags || '',
          title_c: notificationData.Title || notificationData.title || '',
          message_c: notificationData.Message || notificationData.message || '',
          type_c: notificationData.Type || notificationData.type || '',
          priority_c: notificationData.Priority || notificationData.priority || 'medium',
          is_read_c: false,
          created_at_c: new Date().toISOString(),
          related_id_c: notificationData.RelatedId || notificationData.relatedId || null,
          related_type_c: notificationData.RelatedType || notificationData.relatedType || ''
        }]
      };

      const response = await apperClient.createRecord("app_Notification_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);

        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} notifications:${JSON.stringify(failedRecords)}`);
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulRecords.length > 0) {
          return successfulRecords[0].data;
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating notification:", error?.response?.data?.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error creating notification:", error.message);
        toast.error("Failed to create notification");
      }
      return null;
    }
  },

  async update(id, notificationData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields
      const updateData = {
        Id: parseInt(id)
      };

      // Map UI fields to database fields, only include provided updates
      if (notificationData.Title !== undefined) {
        updateData.Name = notificationData.Title;
        updateData.title_c = notificationData.Title;
      }
      if (notificationData.Message !== undefined) updateData.message_c = notificationData.Message;
      if (notificationData.Type !== undefined) updateData.type_c = notificationData.Type;
      if (notificationData.Priority !== undefined) updateData.priority_c = notificationData.Priority;
      if (notificationData.IsRead !== undefined) updateData.is_read_c = notificationData.IsRead;
      if (notificationData.RelatedId !== undefined) updateData.related_id_c = notificationData.RelatedId;
      if (notificationData.RelatedType !== undefined) updateData.related_type_c = notificationData.RelatedType;
      if (notificationData.tags !== undefined) updateData.Tags = notificationData.tags;

      const params = {
        records: [updateData]
      };

      const response = await apperClient.updateRecord("app_Notification_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);

        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} notifications:${JSON.stringify(failedUpdates)}`);
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulUpdates.length > 0) {
          return successfulUpdates[0].data;
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating notification:", error?.response?.data?.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error updating notification:", error.message);
        toast.error("Failed to update notification");
      }
      return null;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord("app_Notification_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);

        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} notifications:${JSON.stringify(failedDeletions)}`);
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulDeletions.length > 0) {
          return true;
        }
      }

      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting notification:", error?.response?.data?.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error deleting notification:", error.message);
        toast.error("Failed to delete notification");
      }
      return false;
    }
  },

  async markAsRead(id) {
    return await this.update(id, { IsRead: true });
  },

  async markAllAsRead() {
    try {
      // Get all unread notifications first
      const notifications = await this.getAll();
      const unreadNotifications = notifications.filter(n => !n.IsRead);
      
      // Update each unread notification
      const updatePromises = unreadNotifications.map(notification => 
        this.update(notification.Id, { IsRead: true })
      );
      
      await Promise.all(updatePromises);
      
      // Return updated notifications
      return await this.getAll();
    } catch (error) {
      console.error("Error marking all notifications as read:", error.message);
      toast.error("Failed to mark all notifications as read");
      return [];
    }
  },

  async getUnreadCount() {
    try {
      const notifications = await this.getAll();
      return notifications.filter(n => !n.IsRead).length;
    } catch (error) {
      console.error("Error getting unread count:", error.message);
      return 0;
    }
  },

  async getByType(type) {
    try {
      const notifications = await this.getAll();
      return notifications.filter(n => n.Type === type);
    } catch (error) {
      console.error("Error getting notifications by type:", error.message);
      return [];
    }
  },

  async getByPriority(priority) {
    try {
      const notifications = await this.getAll();
      return notifications.filter(n => n.Priority === priority);
    } catch (error) {
      console.error("Error getting notifications by priority:", error.message);
      return [];
    }
  }
};

export default notificationService;