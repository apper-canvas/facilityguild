import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import WorkOrderFormModal from "@/components/molecules/WorkOrderFormModal";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import WorkOrderCard from "@/components/molecules/WorkOrderCard";
import StatusFilter from "@/components/molecules/StatusFilter";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import { workOrderService } from "@/services/api/workOrderService";

const WorkOrderList = () => {
  const [workOrders, setWorkOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const statusOptions = [
    { value: "New", label: "New" },
    { value: "In Progress", label: "In Progress" },
    { value: "Completed", label: "Completed" },
    { value: "On Hold", label: "On Hold" }
  ];

  const loadWorkOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await workOrderService.getAll();
      setWorkOrders(data);
      setFilteredOrders(data);
    } catch (err) {
      setError("Failed to load work orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkOrders();
  }, []);

  useEffect(() => {
    let filtered = workOrders;

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.assignee.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [workOrders, searchTerm, statusFilter]);

  const handleView = (workOrder) => {
    console.log("View work order:", workOrder);
  };

  const handleEdit = (workOrder) => {
    console.log("Edit work order:", workOrder);
  };

  const handleDelete = (workOrder) => {
    console.log("Delete work order:", workOrder);
  };

const handleCreateNew = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCreateSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      const result = await workOrderService.create(formData);
      
      if (result) {
        toast.success("Work order created successfully");
        setIsModalOpen(false);
        // Refresh the work orders list
        await loadWorkOrders();
      }
    } catch (error) {
      console.error("Error creating work order:", error);
      toast.error("Failed to create work order");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <Loading type="workorders" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadWorkOrders} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Work Orders</h2>
          <p className="text-slate-600">Manage maintenance requests and tasks</p>
        </div>
        <Button onClick={handleCreateNew} className="flex items-center space-x-2">
          <ApperIcon name="Plus" className="h-4 w-4" />
          <span>Create Work Order</span>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <SearchBar
          onSearch={setSearchTerm}
          placeholder="Search work orders..."
        />
        <StatusFilter
          value={statusFilter}
          onChange={setStatusFilter}
          options={statusOptions}
        />
      </div>

      {/* Work Orders Grid */}
      {filteredOrders.length === 0 ? (
        <Empty
          title="No work orders found"
          message="There are no work orders matching your criteria."
          actionLabel="Create Work Order"
          onAction={handleCreateNew}
          icon="ClipboardList"
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid gap-6"
        >
          {filteredOrders.map((workOrder, index) => (
            <motion.div
              key={workOrder.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <WorkOrderCard
                workOrder={workOrder}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </motion.div>
))}
        </motion.div>
      )}

      <WorkOrderFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleCreateSubmit}
        loading={isSubmitting}
      />
    </div>
  );

export default WorkOrderList;