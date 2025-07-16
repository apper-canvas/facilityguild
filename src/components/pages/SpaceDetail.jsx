import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { spaceService } from "@/services/api/spaceService";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const SpaceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [space, setSpace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await spaceService.getById(id);
        setSpace(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSpace();
    }
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!space) return <Error message="Space not found" />;

  const getOccupancyColor = (current, capacity) => {
    if (!capacity) return "bg-slate-100 text-slate-800";
    const percentage = (current / capacity) * 100;
    if (percentage >= 90) return "bg-red-100 text-red-800";
    if (percentage >= 70) return "bg-amber-100 text-amber-800";
    return "bg-green-100 text-green-800";
  };

  const getOccupancyPercentage = (current, capacity) => {
    if (!capacity) return 0;
    return Math.round((current / capacity) * 100);
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
          onClick={() => navigate("/floor-plans")}
          className="mb-4"
        >
          <ApperIcon name="ArrowLeft" className="h-4 w-4 mr-2" />
          Back to Floor Plans
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{space.name}</h1>
            <p className="text-slate-600 mt-1">Space #{space.Id}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getOccupancyColor(space.currentOccupancy, space.capacity)}>
              {getOccupancyPercentage(space.currentOccupancy, space.capacity)}% Occupied
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            <ApperIcon name="Map" className="h-5 w-5 inline mr-2" />
            Space Information
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Type
              </label>
              <p className="text-slate-900 flex items-center">
                <ApperIcon name="Tag" className="h-4 w-4 mr-2 text-slate-500" />
                {space.type || "Not specified"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Floor
              </label>
              <p className="text-slate-900 flex items-center">
                <ApperIcon name="Building" className="h-4 w-4 mr-2 text-slate-500" />
                Floor {space.floor || 1}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Capacity
              </label>
              <p className="text-slate-900 flex items-center">
                <ApperIcon name="Users" className="h-4 w-4 mr-2 text-slate-500" />
                {space.capacity || 0} people
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Current Occupancy
              </label>
              <p className="text-slate-900 flex items-center">
                <ApperIcon name="User" className="h-4 w-4 mr-2 text-slate-500" />
                {space.currentOccupancy || 0} people
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            <ApperIcon name="Settings" className="h-5 w-5 inline mr-2" />
            Amenities
          </h2>
          
          <div className="space-y-4">
            {space.amenities && space.amenities.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {space.amenities.map((amenity, index) => (
                  <Badge key={index} className="bg-blue-100 text-blue-800">
                    {amenity}
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <ApperIcon name="Package" className="h-16 w-16 mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500">No amenities listed</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      <Card className="p-6 mt-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          <ApperIcon name="TrendingUp" className="h-5 w-5 inline mr-2" />
          Occupancy Overview
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <ApperIcon name="Users" className="h-8 w-8 mx-auto text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-blue-900">{space.capacity || 0}</p>
            <p className="text-sm text-blue-700">Total Capacity</p>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <ApperIcon name="User" className="h-8 w-8 mx-auto text-green-600 mb-2" />
            <p className="text-2xl font-bold text-green-900">{space.currentOccupancy || 0}</p>
            <p className="text-sm text-green-700">Current Occupancy</p>
          </div>
          
          <div className="text-center p-4 bg-amber-50 rounded-lg">
            <ApperIcon name="Percent" className="h-8 w-8 mx-auto text-amber-600 mb-2" />
            <p className="text-2xl font-bold text-amber-900">
              {getOccupancyPercentage(space.currentOccupancy, space.capacity)}%
            </p>
            <p className="text-sm text-amber-700">Utilization Rate</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default SpaceDetail;