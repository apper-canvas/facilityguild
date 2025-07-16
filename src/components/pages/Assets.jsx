import { motion } from "framer-motion";
import AssetTable from "@/components/organisms/AssetTable";

const Assets = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AssetTable />
    </motion.div>
  );
};

export default Assets;