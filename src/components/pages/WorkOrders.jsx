import { motion } from "framer-motion";
import WorkOrderList from "@/components/organisms/WorkOrderList";

const WorkOrders = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <WorkOrderList />
    </motion.div>
  );
};

export default WorkOrders;