import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { spaceService } from "@/services/api/spaceService";

const FloorPlanViewer = () => {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFloor, setSelectedFloor] = useState(1);

  const loadSpaces = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await spaceService.getAll();
      setSpaces(data);
    } catch (err) {
      setError("Failed to load floor plans. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSpaces();
  }, []);

  const floors = [...new Set(spaces.map(space => space.floor))].sort();
  const currentFloorSpaces = spaces.filter(space => space.floor === selectedFloor);

  const getOccupancyColor = (occupancy, capacity) => {
    const percentage = (occupancy / capacity) * 100;
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 70) return "bg-amber-500";
    return "bg-green-500";
  };

  const getSpaceTypeIcon = (type) => {
    switch (type) {
      case "Office":
        return "Building";
      case "Conference Room":
        return "Users";
      case "Restroom":
        return "Droplet";
      case "Kitchen":
        return "Coffee";
      case "Storage":
        return "Archive";
      default:
        return "Square";
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadSpaces} />;
  }

  if (spaces.length === 0) {
    return (
      <Empty
        title="No floor plans available"
        message="Floor plans will be displayed here once they are uploaded."
        icon="Map"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Floor Plans</h2>
          <p className="text-slate-600">Interactive building layouts and space management</p>
        </div>
        <Button className="flex items-center space-x-2">
          <ApperIcon name="Upload" className="h-4 w-4" />
          <span>Upload Floor Plan</span>
        </Button>
      </div>

      {/* Floor Selection */}
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-slate-700">Floor:</span>
        <div className="flex space-x-2">
          {floors.map((floor) => (
            <Button
              key={floor}
              variant={selectedFloor === floor ? "primary" : "secondary"}
              size="sm"
              onClick={() => setSelectedFloor(floor)}
            >
              Floor {floor}
            </Button>
          ))}
        </div>
      </div>

      {/* Floor Plan */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Floor {selectedFloor} Layout
        </h3>
        
        {/* Interactive Floor Plan Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
          {currentFloorSpaces.map((space) => (
            <motion.div
              key={space.Id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4 border border-slate-200 cursor-pointer transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <ApperIcon 
                    name={getSpaceTypeIcon(space.type)} 
                    className="h-4 w-4 text-slate-600" 
                  />
                  <span className="font-medium text-slate-900">{space.name}</span>
                </div>
                <div 
                  className={`h-2 w-2 rounded-full ${getOccupancyColor(space.currentOccupancy, space.capacity)}`}
                />
              </div>
              
              <div className="text-sm text-slate-600 mb-2">
                {space.type}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  {space.currentOccupancy}/{space.capacity}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {Math.round((space.currentOccupancy / space.capacity) * 100)}%
                </Badge>
              </div>
              
              {space.amenities && space.amenities.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {space.amenities.slice(0, 3).map((amenity, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded text-xs bg-primary-100 text-primary-800"
                    >
                      {amenity}
                    </span>
                  ))}
                  {space.amenities.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-slate-100 text-slate-600">
                      +{space.amenities.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-6 pt-4 border-t border-slate-200">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-slate-600">Available (&lt;70%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 bg-amber-500 rounded-full"></div>
            <span className="text-sm text-slate-600">Busy (70-89%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-slate-600">Full (90%+)</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FloorPlanViewer;