import assetsData from "@/services/mockData/assets.json";

export const assetService = {
  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 350));
    return [...assetsData];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const asset = assetsData.find(a => a.Id === id);
    if (!asset) {
      throw new Error("Asset not found");
    }
    return { ...asset };
  },

  async create(asset) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newId = Math.max(...assetsData.map(a => a.Id)) + 1;
    const newAsset = {
      ...asset,
      Id: newId,
      purchaseDate: new Date().toISOString()
    };
    assetsData.push(newAsset);
    return { ...newAsset };
  },

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = assetsData.findIndex(a => a.Id === id);
    if (index === -1) {
      throw new Error("Asset not found");
    }
    assetsData[index] = { ...assetsData[index], ...updates };
    return { ...assetsData[index] };
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = assetsData.findIndex(a => a.Id === id);
    if (index === -1) {
      throw new Error("Asset not found");
    }
    assetsData.splice(index, 1);
    return { success: true };
  }
};