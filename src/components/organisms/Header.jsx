import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { useSelector } from 'react-redux';
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import NotificationCenter from "@/components/organisms/NotificationCenter";
import { AuthContext } from "@/App";

const Header = ({ onMenuToggle, onSearch, showSearch = true }) => {
  const { logout } = useContext(AuthContext);
  const { user } = useSelector((state) => state.user);

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
          <NotificationCenter />
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-slate-400 to-slate-500 p-2 rounded-full">
                <ApperIcon name="User" className="h-4 w-4 text-white" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-slate-900">
                  {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'Facility Manager'}
                </p>
                <p className="text-xs text-slate-500">
                  {user?.emailAddress || 'admin@facilityhub.com'}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="flex items-center space-x-1 text-slate-600 hover:text-slate-800"
            >
              <ApperIcon name="LogOut" className="h-4 w-4" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;