import workOrdersData from "@/services/mockData/workOrders.json";

export const workOrderService = {
  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...workOrdersData];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const workOrder = workOrdersData.find(wo => wo.Id === id);
    if (!workOrder) {
      throw new Error("Work order not found");
    }
    return { ...workOrder };
  },

  async create(workOrder) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newId = Math.max(...workOrdersData.map(wo => wo.Id)) + 1;
    const newWorkOrder = {
      ...workOrder,
      Id: newId,
      createdDate: new Date().toISOString(),
      status: "New"
    };
    workOrdersData.push(newWorkOrder);
    return { ...newWorkOrder };
  },

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = workOrdersData.findIndex(wo => wo.Id === id);
    if (index === -1) {
      throw new Error("Work order not found");
    }
    workOrdersData[index] = { ...workOrdersData[index], ...updates };
    return { ...workOrdersData[index] };
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = workOrdersData.findIndex(wo => wo.Id === id);
    if (index === -1) {
      throw new Error("Work order not found");
    }
    workOrdersData.splice(index, 1);
    return { success: true };
  }
};