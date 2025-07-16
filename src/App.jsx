import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "@/components/organisms/Header";
import Sidebar from "@/components/organisms/Sidebar";
import Dashboard from "@/components/pages/Dashboard";
import WorkOrders from "@/components/pages/WorkOrders";
import Assets from "@/components/pages/Assets";
import FloorPlans from "@/components/pages/FloorPlans";
import Reports from "@/components/pages/Reports";
import NotificationSettings from "@/components/pages/NotificationSettings";
import NotificationProvider from "@/components/organisms/NotificationContext";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleSearch = (searchTerm) => {
    console.log("Search:", searchTerm);
  };

return (
    <NotificationProvider>
      <div className="h-screen bg-slate-50">
        <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
      
      <div className="lg:pl-64 flex flex-col flex-1">
        <Header 
          onMenuToggle={handleMenuToggle}
          onSearch={handleSearch}
          showSearch={true}
        />
        
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/work-orders" element={<WorkOrders />} />
<Route path="/assets" element={<Assets />} />
              <Route path="/floor-plans" element={<FloorPlans />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/notifications" element={<NotificationSettings />} />
            </Routes>
          </div>
        </main>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="z-50"
/>
      </div>
    </NotificationProvider>
  );
}

export default App;