import { toast } from "react-toastify";

export const assetService = {
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
          { field: { Name: "type_c" } },
          { field: { Name: "location_c" } },
          { field: { Name: "purchase_date_c" } },
          { field: { Name: "last_maintenance_c" } },
          { field: { Name: "next_maintenance_c" } },
          { field: { Name: "condition_c" } },
          { field: { Name: "serial_number_c" } }
        ],
        orderBy: [
          {
            fieldName: "Name",
            sorttype: "ASC"
          }
        ]
      };

      const response = await apperClient.fetchRecords("asset_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      // Map database fields to UI expected format
      return response.data?.map(item => ({
        Id: item.Id,
        name: item.Name || '',
        type: item.type_c || '',
        location: item.location_c || '',
        purchaseDate: item.purchase_date_c || '',
        lastMaintenance: item.last_maintenance_c || '',
        nextMaintenance: item.next_maintenance_c || '',
        condition: item.condition_c || '',
        serialNumber: item.serial_number_c || ''
      })) || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching assets:", error?.response?.data?.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error fetching assets:", error.message);
        toast.error("Failed to load assets");
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
          { field: { Name: "type_c" } },
          { field: { Name: "location_c" } },
          { field: { Name: "purchase_date_c" } },
          { field: { Name: "last_maintenance_c" } },
          { field: { Name: "next_maintenance_c" } },
          { field: { Name: "condition_c" } },
          { field: { Name: "serial_number_c" } }
        ]
      };

      const response = await apperClient.getRecordById("asset_c", parseInt(id), params);

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
        type: item.type_c || '',
        location: item.location_c || '',
        purchaseDate: item.purchase_date_c || '',
        lastMaintenance: item.last_maintenance_c || '',
        nextMaintenance: item.next_maintenance_c || '',
        condition: item.condition_c || '',
        serialNumber: item.serial_number_c || ''
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching asset with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(`Error fetching asset with ID ${id}:`, error.message);
      }
      return null;
    }
  },

  async create(asset) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields
      const params = {
        records: [{
          Name: asset.name || '',
          Tags: asset.tags || '',
          type_c: asset.type || '',
          location_c: asset.location || '',
          purchase_date_c: asset.purchaseDate || new Date().toISOString(),
          last_maintenance_c: asset.lastMaintenance || '',
          next_maintenance_c: asset.nextMaintenance || '',
          condition_c: asset.condition || '',
          serial_number_c: asset.serialNumber || ''
        }]
      };

      const response = await apperClient.createRecord("asset_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);

        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} assets:${JSON.stringify(failedRecords)}`);
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulRecords.length > 0) {
          toast.success("Asset created successfully");
          return successfulRecords[0].data;
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating asset:", error?.response?.data?.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error creating asset:", error.message);
        toast.error("Failed to create asset");
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
      if (updates.type !== undefined) updateData.type_c = updates.type;
      if (updates.location !== undefined) updateData.location_c = updates.location;
      if (updates.purchaseDate !== undefined) updateData.purchase_date_c = updates.purchaseDate;
      if (updates.lastMaintenance !== undefined) updateData.last_maintenance_c = updates.lastMaintenance;
      if (updates.nextMaintenance !== undefined) updateData.next_maintenance_c = updates.nextMaintenance;
      if (updates.condition !== undefined) updateData.condition_c = updates.condition;
      if (updates.serialNumber !== undefined) updateData.serial_number_c = updates.serialNumber;
      if (updates.tags !== undefined) updateData.Tags = updates.tags;

      const params = {
        records: [updateData]
      };

      const response = await apperClient.updateRecord("asset_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);

        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} assets:${JSON.stringify(failedUpdates)}`);
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulUpdates.length > 0) {
          toast.success("Asset updated successfully");
          return successfulUpdates[0].data;
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating asset:", error?.response?.data?.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error updating asset:", error.message);
        toast.error("Failed to update asset");
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

      const response = await apperClient.deleteRecord("asset_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);

        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} assets:${JSON.stringify(failedDeletions)}`);
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulDeletions.length > 0) {
          toast.success("Asset deleted successfully");
          return true;
        }
      }

      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting asset:", error?.response?.data?.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error deleting asset:", error.message);
        toast.error("Failed to delete asset");
      }
      return false;
    }
  }
};