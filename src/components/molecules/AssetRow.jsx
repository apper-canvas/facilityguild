import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const AssetRow = ({ asset, onView, onEdit, onDelete }) => {
  const getConditionVariant = (condition) => {
    switch (condition) {
      case "Excellent":
        return "success";
      case "Good":
        return "info";
      case "Fair":
        return "warning";
      case "Poor":
        return "error";
      default:
        return "default";
    }
  };

  const getConditionIcon = (condition) => {
    switch (condition) {
      case "Excellent":
        return "CheckCircle";
      case "Good":
        return "Circle";
      case "Fair":
        return "AlertCircle";
      case "Poor":
        return "XCircle";
      default:
        return "Circle";
    }
  };

  return (
    <tr className="hover:bg-slate-50 transition-colors duration-200">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <ApperIcon name="Package" className="h-5 w-5 text-slate-400 mr-3" />
          <div>
            <div className="text-sm font-medium text-slate-900">{asset.name}</div>
            <div className="text-sm text-slate-500">{asset.type}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <ApperIcon name="MapPin" className="h-4 w-4 text-slate-400 mr-2" />
          <span className="text-sm text-slate-700">{asset.location}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
        {format(new Date(asset.lastMaintenance), "MMM d, yyyy")}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
        {format(new Date(asset.nextMaintenance), "MMM d, yyyy")}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Badge variant={getConditionVariant(asset.condition)}>
          <ApperIcon name={getConditionIcon(asset.condition)} className="h-3 w-3 mr-1" />
          {asset.condition}
        </Badge>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView(asset)}
          >
            <ApperIcon name="Eye" className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(asset)}
          >
            <ApperIcon name="Edit" className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(asset)}
          >
            <ApperIcon name="Trash2" className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default AssetRow;