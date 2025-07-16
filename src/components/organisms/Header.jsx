import { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";

const Header = ({ onMenuToggle, onSearch, showSearch = true }) => {
  const [notifications] = useState([
    { id: 1, title: "New work order created", time: "2 min ago" },
    { id: 2, title: "Asset maintenance due", time: "1 hour ago" },
    { id: 3, title: "Floor plan updated", time: "3 hours ago" }
  ]);

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="lg:hidden"
          >
            <ApperIcon name="Menu" className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-2 rounded-lg">
              <ApperIcon name="Building" className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">FacilityHub</h1>
              <p className="text-sm text-slate-600">Facility Management</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {showSearch && (
            <div className="hidden md:block">
              <SearchBar onSearch={onSearch} placeholder="Search facilities..." />
            </div>
          )}
          
          <div className="relative">
            <Button variant="ghost" size="sm">
              <ApperIcon name="Bell" className="h-5 w-5" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-slate-400 to-slate-500 p-2 rounded-full">
              <ApperIcon name="User" className="h-4 w-4 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-slate-900">Facility Manager</p>
              <p className="text-xs text-slate-500">admin@facilityhub.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;