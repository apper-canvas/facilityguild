import { motion } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const WorkOrderCard = ({ workOrder, onView, onEdit, onDelete }) => {
  const getPriorityVariant = (priority) => {
    switch (priority) {
      case "High":
        return "priority-high";
      case "Medium":
        return "priority-medium";
      case "Low":
        return "priority-low";
      default:
        return "default";
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "New":
        return "status-new";
      case "In Progress":
        return "status-in-progress";
      case "Completed":
        return "status-completed";
      case "On Hold":
        return "status-on-hold";
      default:
        return "default";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-6 hover:shadow-elevated transition-shadow duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {workOrder.title}
            </h3>
            <p className="text-sm text-slate-600 mb-2">
              <ApperIcon name="MapPin" className="h-4 w-4 inline mr-1" />
              {workOrder.location}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={getPriorityVariant(workOrder.priority)}>
              {workOrder.priority}
            </Badge>
            <Badge variant={getStatusVariant(workOrder.status)}>
              {workOrder.status}
            </Badge>
          </div>
        </div>

        <p className="text-slate-700 mb-4 line-clamp-2">
          {workOrder.description}
        </p>

        <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
          <span>
            Created: {format(new Date(workOrder.createdDate), "MMM d, yyyy")}
          </span>
          <span>
            Due: {format(new Date(workOrder.dueDate), "MMM d, yyyy")}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ApperIcon name="User" className="h-4 w-4 text-slate-400" />
            <span className="text-sm text-slate-600">{workOrder.assignee}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onView(workOrder)}
            >
              <ApperIcon name="Eye" className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(workOrder)}
            >
              <ApperIcon name="Edit" className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(workOrder)}
            >
              <ApperIcon name="Trash2" className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default WorkOrderCard;