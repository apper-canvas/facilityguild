import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const MetricCard = ({ title, value, change, icon, color = "primary" }) => {
  const colorClasses = {
    primary: "from-primary-600 to-primary-700",
    amber: "from-amber-500 to-amber-600",
    green: "from-green-500 to-green-600",
    red: "from-red-500 to-red-600"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 card-hover">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-slate-900 mb-2">{value}</p>
            {change && (
              <div className="flex items-center space-x-1">
                <ApperIcon
                  name={change > 0 ? "TrendingUp" : "TrendingDown"}
                  className={`h-4 w-4 ${change > 0 ? "text-green-600" : "text-red-600"}`}
                />
                <span className={`text-sm font-medium ${change > 0 ? "text-green-600" : "text-red-600"}`}>
                  {Math.abs(change)}%
                </span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-lg bg-gradient-to-r ${colorClasses[color]}`}>
            <ApperIcon name={icon} className="h-6 w-6 text-white" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default MetricCard;