import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { assetService } from "@/services/api/assetService";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const AssetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await assetService.getById(id);
        setAsset(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAsset();
    }
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!asset) return <Error message="Asset not found" />;

  const getConditionColor = (condition) => {
    switch (condition?.toLowerCase()) {
      case "excellent":
        return "bg-green-100 text-green-800";
      case "good":
        return "bg-blue-100 text-blue-800";
      case "fair":
        return "bg-amber-100 text-amber-800";
      case "poor":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/assets")}
          className="mb-4"
        >
          <ApperIcon name="ArrowLeft" className="h-4 w-4 mr-2" />
          Back to Assets
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{asset.name}</h1>
            <p className="text-slate-600 mt-1">Asset #{asset.Id}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getConditionColor(asset.condition)}>
              {asset.condition || "Unknown"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            <ApperIcon name="Package" className="h-5 w-5 inline mr-2" />
            Asset Information
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Type
              </label>
              <p className="text-slate-900 flex items-center">
                <ApperIcon name="Tag" className="h-4 w-4 mr-2 text-slate-500" />
                {asset.type || "Not specified"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Location
              </label>
              <p className="text-slate-900 flex items-center">
                <ApperIcon name="MapPin" className="h-4 w-4 mr-2 text-slate-500" />
                {asset.location || "Not specified"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Serial Number
              </label>
              <p className="text-slate-900 flex items-center">
                <ApperIcon name="Hash" className="h-4 w-4 mr-2 text-slate-500" />
                {asset.serialNumber || "Not specified"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Purchase Date
              </label>
              <p className="text-slate-900 flex items-center">
                <ApperIcon name="Calendar" className="h-4 w-4 mr-2 text-slate-500" />
                {asset.purchaseDate ? new Date(asset.purchaseDate).toLocaleDateString() : "Not specified"}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            <ApperIcon name="Wrench" className="h-5 w-5 inline mr-2" />
            Maintenance Schedule
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Last Maintenance
              </label>
              <p className="text-slate-900 flex items-center">
                <ApperIcon name="CheckCircle" className="h-4 w-4 mr-2 text-green-500" />
                {asset.lastMaintenance ? new Date(asset.lastMaintenance).toLocaleDateString() : "No maintenance recorded"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Next Maintenance
              </label>
              <p className="text-slate-900 flex items-center">
                <ApperIcon name="Clock" className="h-4 w-4 mr-2 text-amber-500" />
                {asset.nextMaintenance ? new Date(asset.nextMaintenance).toLocaleDateString() : "Not scheduled"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Condition
              </label>
              <div className="flex items-center">
                <ApperIcon name="Activity" className="h-4 w-4 mr-2 text-slate-500" />
                <Badge className={getConditionColor(asset.condition)}>
                  {asset.condition || "Unknown"}
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 mt-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          <ApperIcon name="BarChart" className="h-5 w-5 inline mr-2" />
          Maintenance History
        </h2>
        <div className="text-center py-8">
          <ApperIcon name="Calendar" className="h-16 w-16 mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500">No maintenance history available</p>
        </div>
      </Card>
    </motion.div>
  );
};

export default AssetDetail;