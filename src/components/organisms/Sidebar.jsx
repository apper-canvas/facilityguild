import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Sidebar = ({ isOpen, onClose }) => {
const navigationItems = [
    { path: "/", label: "Dashboard", icon: "LayoutDashboard" },
    { path: "/work-orders", label: "Work Orders", icon: "ClipboardList" },
    { path: "/assets", label: "Assets", icon: "Package" },
    { path: "/floor-plans", label: "Floor Plans", icon: "Map" },
    { path: "/reports", label: "Reports", icon: "BarChart3" },
    { path: "/notifications", label: "Notifications", icon: "Bell" }
  ];

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: "-100%" }
  };

  // Desktop sidebar (static)
  const DesktopSidebar = () => (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0">
      <div className="flex-1 flex flex-col bg-white border-r border-slate-200">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 mb-6">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-2 rounded-lg">
              <ApperIcon name="Building" className="h-6 w-6 text-white" />
            </div>
            <div className="ml-3">
              <h2 className="text-lg font-bold text-slate-900">FacilityHub</h2>
              <p className="text-sm text-slate-600">Management Portal</p>
            </div>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                    isActive
                      ? "bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 border-r-2 border-primary-600"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <ApperIcon
                      name={item.icon}
                      className={cn(
                        "mr-3 h-5 w-5",
                        isActive ? "text-primary-600" : "text-slate-400 group-hover:text-slate-500"
                      )}
                    />
                    {item.label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );

  // Mobile sidebar (overlay)
  const MobileSidebar = () => (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-slate-600 bg-opacity-75 transition-opacity duration-300 lg:hidden z-40",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 flex flex-col w-64 bg-white border-r border-slate-200 lg:hidden z-50"
      >
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center justify-between flex-shrink-0 px-4 mb-6">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-2 rounded-lg">
                <ApperIcon name="Building" className="h-6 w-6 text-white" />
              </div>
              <div className="ml-3">
                <h2 className="text-lg font-bold text-slate-900">FacilityHub</h2>
                <p className="text-sm text-slate-600">Management Portal</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-500 transition-colors"
            >
              <ApperIcon name="X" className="h-5 w-5" />
            </button>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                    isActive
                      ? "bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 border-r-2 border-primary-600"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <ApperIcon
                      name={item.icon}
                      className={cn(
                        "mr-3 h-5 w-5",
                        isActive ? "text-primary-600" : "text-slate-400 group-hover:text-slate-500"
                      )}
                    />
                    {item.label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </motion.div>
    </>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;