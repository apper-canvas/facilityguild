import { toast } from "react-toastify";

export const workOrderService = {
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
          { field: { Name: "description_c" } },
          { field: { Name: "location_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "assignee_c" } },
          { field: { Name: "created_date_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "photos_c" } }
        ],
        orderBy: [
          {
            fieldName: "created_date_c",
            sorttype: "DESC"
          }
        ]
      };

      const response = await apperClient.fetchRecords("work_order_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      // Map database fields to UI expected format
      return response.data?.map(item => ({
        Id: item.Id,
        title: item.title_c || item.Name || '',
        description: item.description_c || '',
        location: item.location_c || '',
        priority: item.priority_c || 'Medium',
        status: item.status_c || 'New',
        assignee: item.assignee_c || '',
        createdDate: item.created_date_c || item.CreatedOn || '',
        dueDate: item.due_date_c || '',
        photos: item.photos_c ? item.photos_c.split(',') : []
      })) || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching work orders:", error?.response?.data?.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error fetching work orders:", error.message);
        toast.error("Failed to load work orders");
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
          { field: { Name: "description_c" } },
          { field: { Name: "location_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "assignee_c" } },
          { field: { Name: "created_date_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "photos_c" } }
        ]
      };

      const response = await apperClient.getRecordById("work_order_c", parseInt(id), params);

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
        title: item.title_c || item.Name || '',
        description: item.description_c || '',
        location: item.location_c || '',
        priority: item.priority_c || 'Medium',
        status: item.status_c || 'New',
        assignee: item.assignee_c || '',
        createdDate: item.created_date_c || '',
        dueDate: item.due_date_c || '',
        photos: item.photos_c ? item.photos_c.split(',') : []
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching work order with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(`Error fetching work order with ID ${id}:`, error.message);
      }
      return null;
    }
  },

  async create(workOrder) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields - exclude System fields
      const params = {
        records: [{
          Name: workOrder.title || workOrder.Name || '',
          Tags: workOrder.tags || '',
          title_c: workOrder.title || '',
          description_c: workOrder.description || '',
          location_c: workOrder.location || '',
          priority_c: workOrder.priority || 'Medium',
          status_c: workOrder.status || 'New',
          assignee_c: workOrder.assignee || '',
          created_date_c: new Date().toISOString(),
          due_date_c: workOrder.dueDate || '',
          photos_c: Array.isArray(workOrder.photos) ? workOrder.photos.join(',') : ''
        }]
      };

      const response = await apperClient.createRecord("work_order_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);

        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} work orders:${JSON.stringify(failedRecords)}`);
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulRecords.length > 0) {
          toast.success("Work order created successfully");
          return successfulRecords[0].data;
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating work order:", error?.response?.data?.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error creating work order:", error.message);
        toast.error("Failed to create work order");
      }
      return null;
    }
  },

  async update(id, updates) {
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
      if (updates.title !== undefined) {
        updateData.Name = updates.title;
        updateData.title_c = updates.title;
      }
      if (updates.description !== undefined) updateData.description_c = updates.description;
      if (updates.location !== undefined) updateData.location_c = updates.location;
      if (updates.priority !== undefined) updateData.priority_c = updates.priority;
      if (updates.status !== undefined) updateData.status_c = updates.status;
      if (updates.assignee !== undefined) updateData.assignee_c = updates.assignee;
      if (updates.dueDate !== undefined) updateData.due_date_c = updates.dueDate;
      if (updates.photos !== undefined) {
        updateData.photos_c = Array.isArray(updates.photos) ? updates.photos.join(',') : updates.photos;
      }
      if (updates.tags !== undefined) updateData.Tags = updates.tags;

      const params = {
        records: [updateData]
      };

      const response = await apperClient.updateRecord("work_order_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);

        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} work orders:${JSON.stringify(failedUpdates)}`);
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulUpdates.length > 0) {
          toast.success("Work order updated successfully");
          return successfulUpdates[0].data;
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating work order:", error?.response?.data?.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error updating work order:", error.message);
        toast.error("Failed to update work order");
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

      const response = await apperClient.deleteRecord("work_order_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);

        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} work orders:${JSON.stringify(failedDeletions)}`);
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulDeletions.length > 0) {
          toast.success("Work order deleted successfully");
          return true;
        }
      }

      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting work order:", error?.response?.data?.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error deleting work order:", error.message);
        toast.error("Failed to delete work order");
      }
      return false;
    }
  }
};