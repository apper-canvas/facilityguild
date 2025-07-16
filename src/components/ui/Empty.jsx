import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No data found", 
  message = "There's nothing here yet.", 
  actionLabel = "Create New",
  onAction,
  icon = "Inbox"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
    >
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-full mb-6">
        <ApperIcon name={icon} className="h-16 w-16 text-slate-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-slate-900 mb-2">
        {title}
      </h3>
      
      <p className="text-slate-600 mb-8 max-w-md">
        {message}
      </p>
      
      {onAction && (
        <motion.button
          onClick={onAction}
          className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-lg font-medium hover:from-primary-700 hover:to-primary-800 transition-all duration-200 flex items-center space-x-2 interactive-scale"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name="Plus" className="h-4 w-4" />
          <span>{actionLabel}</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default Empty;