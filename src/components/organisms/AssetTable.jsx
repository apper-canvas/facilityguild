import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AssetFormModal from "@/components/molecules/AssetFormModal";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import Assets from "@/components/pages/Assets";
import AssetRow from "@/components/molecules/AssetRow";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import { assetService } from "@/services/api/assetService";

const AssetTable = () => {
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadAssets = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await assetService.getAll();
      setAssets(data);
      setFilteredAssets(data);
    } catch (err) {
      setError("Failed to load assets. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssets();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = assets.filter(asset =>
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAssets(filtered);
    } else {
      setFilteredAssets(assets);
    }
  }, [assets, searchTerm]);

  const handleView = (asset) => {
    console.log("View asset:", asset);
  };

  const handleEdit = (asset) => {
    console.log("Edit asset:", asset);
  };

  const handleDelete = (asset) => {
    console.log("Delete asset:", asset);
  };

const handleCreateNew = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCreateSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      const result = await assetService.create(formData);
      
      if (result) {
        toast.success("Asset created successfully");
        setIsModalOpen(false);
        // Refresh the assets list
        await loadAssets();
      }
    } catch (error) {
      console.error("Error creating asset:", error);
      toast.error("Failed to create asset");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <Loading type="assets" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadAssets} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Assets</h2>
          <p className="text-slate-600">Manage facility assets and equipment</p>
        </div>
        <Button onClick={handleCreateNew} className="flex items-center space-x-2">
          <ApperIcon name="Plus" className="h-4 w-4" />
          <span>Add Asset</span>
        </Button>
      </div>

      {/* Search */}
      <SearchBar
        onSearch={setSearchTerm}
        placeholder="Search assets..."
      />

      {/* Assets Table */}
      {filteredAssets.length === 0 ? (
        <Empty
          title="No assets found"
          message="There are no assets matching your criteria."
          actionLabel="Add Asset"
          onAction={handleCreateNew}
          icon="Package"
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-lg shadow-card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Asset
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Last Maintenance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Next Maintenance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Condition
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredAssets.map((asset) => (
                  <AssetRow
                    key={asset.Id}
                    asset={asset}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
</div>
        </motion.div>
      )}
      <AssetFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleCreateSubmit}
        loading={isSubmitting}
      />
    </div>
  );
};