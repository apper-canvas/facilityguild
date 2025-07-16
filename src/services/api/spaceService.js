import { toast } from "react-toastify";

export const spaceService = {
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
          { field: { Name: "floor_c" } },
          { field: { Name: "capacity_c" } },
          { field: { Name: "current_occupancy_c" } },
          { field: { Name: "type_c" } },
          { field: { Name: "amenities_c" } }
        ],
        orderBy: [
          {
            fieldName: "floor_c",
            sorttype: "ASC"
          },
          {
            fieldName: "Name",
            sorttype: "ASC"
          }
        ]
      };

      const response = await apperClient.fetchRecords("space_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      // Map database fields to UI expected format
      return response.data?.map(item => ({
        Id: item.Id,
        name: item.Name || '',
        floor: item.floor_c || 1,
        capacity: item.capacity_c || 0,
        currentOccupancy: item.current_occupancy_c || 0,
        type: item.type_c || '',
        amenities: item.amenities_c ? item.amenities_c.split(',').map(a => a.trim()) : []
      })) || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching spaces:", error?.response?.data?.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error fetching spaces:", error.message);
        toast.error("Failed to load spaces");
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
          { field: { Name: "floor_c" } },
          { field: { Name: "capacity_c" } },
          { field: { Name: "current_occupancy_c" } },
          { field: { Name: "type_c" } },
          { field: { Name: "amenities_c" } }
        ]
      };

      const response = await apperClient.getRecordById("space_c", parseInt(id), params);

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
        name: item.Name || '',
        floor: item.floor_c || 1,
        capacity: item.capacity_c || 0,
        currentOccupancy: item.current_occupancy_c || 0,
        type: item.type_c || '',
        amenities: item.amenities_c ? item.amenities_c.split(',').map(a => a.trim()) : []
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching space with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(`Error fetching space with ID ${id}:`, error.message);
      }
      return null;
    }
  },

  async create(space) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields
      const params = {
        records: [{
          Name: space.name || '',
          Tags: space.tags || '',
          floor_c: parseInt(space.floor) || 1,
          capacity_c: parseInt(space.capacity) || 0,
          current_occupancy_c: parseInt(space.currentOccupancy) || 0,
          type_c: space.type || '',
          amenities_c: Array.isArray(space.amenities) ? space.amenities.join(', ') : space.amenities || ''
        }]
      };

      const response = await apperClient.createRecord("space_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);

        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} spaces:${JSON.stringify(failedRecords)}`);
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulRecords.length > 0) {
          toast.success("Space created successfully");
          return successfulRecords[0].data;
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating space:", error?.response?.data?.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error creating space:", error.message);
        toast.error("Failed to create space");
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
      if (updates.name !== undefined) updateData.Name = updates.name;
      if (updates.floor !== undefined) updateData.floor_c = parseInt(updates.floor);
      if (updates.capacity !== undefined) updateData.capacity_c = parseInt(updates.capacity);
      if (updates.currentOccupancy !== undefined) updateData.current_occupancy_c = parseInt(updates.currentOccupancy);
      if (updates.type !== undefined) updateData.type_c = updates.type;
      if (updates.amenities !== undefined) {
        updateData.amenities_c = Array.isArray(updates.amenities) ? updates.amenities.join(', ') : updates.amenities;
      }
      if (updates.tags !== undefined) updateData.Tags = updates.tags;

      const params = {
        records: [updateData]
      };

      const response = await apperClient.updateRecord("space_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);

        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} spaces:${JSON.stringify(failedUpdates)}`);
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulUpdates.length > 0) {
          toast.success("Space updated successfully");
          return successfulUpdates[0].data;
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating space:", error?.response?.data?.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error updating space:", error.message);
        toast.error("Failed to update space");
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

      const response = await apperClient.deleteRecord("space_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);

        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} spaces:${JSON.stringify(failedDeletions)}`);
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulDeletions.length > 0) {
          toast.success("Space deleted successfully");
          return true;
        }
      }

      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting space:", error?.response?.data?.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error deleting space:", error.message);
        toast.error("Failed to delete space");
      }
      return false;
    }
  }
};