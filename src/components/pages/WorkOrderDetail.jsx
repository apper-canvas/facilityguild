import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { workOrderService } from "@/services/api/workOrderService";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const WorkOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workOrder, setWorkOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkOrder = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await workOrderService.getById(id);
        setWorkOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchWorkOrder();
    }
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!workOrder) return <Error message="Work order not found" />;

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-amber-100 text-amber-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "in progress":
        return "bg-amber-100 text-amber-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "on hold":
        return "bg-slate-100 text-slate-800";
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
          onClick={() => navigate("/work-orders")}
          className="mb-4"
        >
          <ApperIcon name="ArrowLeft" className="h-4 w-4 mr-2" />
          Back to Work Orders
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{workOrder.title}</h1>
            <p className="text-slate-600 mt-1">Work Order #{workOrder.Id}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getPriorityColor(workOrder.priority)}>
              {workOrder.priority || "Medium"}
            </Badge>
            <Badge className={getStatusColor(workOrder.status)}>
              {workOrder.status || "New"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            <ApperIcon name="FileText" className="h-5 w-5 inline mr-2" />
            Details
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Description
              </label>
              <p className="text-slate-900 bg-slate-50 p-3 rounded-md">
                {workOrder.description || "No description provided"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Location
              </label>
              <p className="text-slate-900 flex items-center">
                <ApperIcon name="MapPin" className="h-4 w-4 mr-2 text-slate-500" />
                {workOrder.location || "Not specified"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Assignee
              </label>
              <p className="text-slate-900 flex items-center">
                <ApperIcon name="User" className="h-4 w-4 mr-2 text-slate-500" />
                {workOrder.assignee || "Unassigned"}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            <ApperIcon name="Calendar" className="h-5 w-5 inline mr-2" />
            Timeline
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Created Date
              </label>
              <p className="text-slate-900 flex items-center">
                <ApperIcon name="Calendar" className="h-4 w-4 mr-2 text-slate-500" />
                {workOrder.createdDate ? new Date(workOrder.createdDate).toLocaleDateString() : "Not specified"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Due Date
              </label>
              <p className="text-slate-900 flex items-center">
                <ApperIcon name="Clock" className="h-4 w-4 mr-2 text-slate-500" />
                {workOrder.dueDate ? new Date(workOrder.dueDate).toLocaleDateString() : "Not specified"}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {workOrder.photos && workOrder.photos.length > 0 && (
        <Card className="p-6 mt-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            <ApperIcon name="Image" className="h-5 w-5 inline mr-2" />
            Photos
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {workOrder.photos.map((photo, index) => (
              <div key={index} className="bg-slate-100 rounded-lg p-4 text-center">
                <ApperIcon name="Image" className="h-12 w-12 mx-auto text-slate-400 mb-2" />
                <p className="text-sm text-slate-600">{photo}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </motion.div>
  );
};

export default WorkOrderDetail;