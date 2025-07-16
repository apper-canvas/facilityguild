import { motion } from "framer-motion";

const Loading = ({ type = "dashboard" }) => {
  const shimmerVariants = {
    initial: { opacity: 0.4 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, repeat: Infinity, repeatType: "reverse" }
  };

  if (type === "dashboard") {
    return (
      <div className="p-6 space-y-6">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-lg shadow-card p-6"
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
            >
              <div className="shimmer h-4 w-24 rounded mb-2"></div>
              <div className="shimmer h-8 w-16 rounded mb-4"></div>
              <div className="shimmer h-3 w-32 rounded"></div>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="shimmer h-6 w-40 rounded mb-4"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="shimmer h-10 w-10 rounded-lg"></div>
                <div className="flex-1">
                  <div className="shimmer h-4 w-48 rounded mb-2"></div>
                  <div className="shimmer h-3 w-32 rounded"></div>
                </div>
                <div className="shimmer h-6 w-16 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "workorders") {
    return (
      <div className="p-6 space-y-4">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-lg shadow-card p-6"
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="shimmer h-5 w-64 rounded mb-2"></div>
                <div className="shimmer h-4 w-32 rounded"></div>
              </div>
              <div className="shimmer h-6 w-16 rounded-full"></div>
            </div>
            <div className="shimmer h-3 w-full rounded mb-2"></div>
            <div className="shimmer h-3 w-3/4 rounded mb-4"></div>
            <div className="flex items-center justify-between">
              <div className="shimmer h-4 w-24 rounded"></div>
              <div className="shimmer h-8 w-20 rounded"></div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === "assets") {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-card overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <div className="shimmer h-6 w-32 rounded"></div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4 py-3">
                  <div className="shimmer h-4 w-48 rounded"></div>
                  <div className="shimmer h-4 w-32 rounded"></div>
                  <div className="shimmer h-4 w-24 rounded"></div>
                  <div className="shimmer h-4 w-28 rounded"></div>
                  <div className="shimmer h-6 w-16 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default loading
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="shimmer h-6 w-40 rounded mb-4"></div>
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="shimmer h-4 w-full rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;