import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
    >
      <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-full mb-6">
        <ApperIcon name="AlertTriangle" className="h-12 w-12 text-red-600" />
      </div>
      
      <h3 className="text-xl font-semibold text-slate-900 mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-slate-600 mb-6 max-w-md">
        {message}
      </p>
      
      {onRetry && (
        <motion.button
          onClick={onRetry}
          className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-lg font-medium hover:from-primary-700 hover:to-primary-800 transition-all duration-200 flex items-center space-x-2 interactive-scale"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name="RotateCcw" className="h-4 w-4" />
          <span>Try Again</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default Error;