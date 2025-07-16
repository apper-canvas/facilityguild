import { motion } from "framer-motion";
import FloorPlanViewer from "@/components/organisms/FloorPlanViewer";

const FloorPlans = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <FloorPlanViewer />
    </motion.div>
  );
};

export default FloorPlans;