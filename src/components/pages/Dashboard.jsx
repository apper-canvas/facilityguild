import { motion } from "framer-motion";
import DashboardMetrics from "@/components/organisms/DashboardMetrics";

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
        <p className="text-slate-600">
          Overview of your facility management operations
        </p>
      </div>

      <DashboardMetrics />
    </motion.div>
  );
};

export default Dashboard;