import spacesData from "@/services/mockData/spaces.json";

export const spaceService = {
  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 280));
    return [...spacesData];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const space = spacesData.find(s => s.Id === id);
    if (!space) {
      throw new Error("Space not found");
    }
    return { ...space };
  },

  async create(space) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newId = Math.max(...spacesData.map(s => s.Id)) + 1;
    const newSpace = {
      ...space,
      Id: newId,
      currentOccupancy: 0
    };
    spacesData.push(newSpace);
    return { ...newSpace };
  },

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = spacesData.findIndex(s => s.Id === id);
    if (index === -1) {
      throw new Error("Space not found");
    }
    spacesData[index] = { ...spacesData[index], ...updates };
    return { ...spacesData[index] };
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = spacesData.findIndex(s => s.Id === id);
    if (index === -1) {
      throw new Error("Space not found");
    }
    spacesData.splice(index, 1);
    return { success: true };
  }
};