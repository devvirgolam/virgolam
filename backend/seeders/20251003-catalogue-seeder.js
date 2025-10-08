"use strict";

const catalogues = require("../data/catalogues.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    if (!Array.isArray(catalogues)) {
      throw new Error("❌ catalogues.json should export an array");
    }

    // Clean up before inserting (optional — prevents duplicates)
    await queryInterface.bulkDelete("catalogues", null, {});

    // Normalize data if any timestamps missing
    const catalogueData = catalogues.map((item) => ({
      id: item.id, // keep original id
      name: item.name,
      pdf_url: item.pdf_url || null,
      banner_image_url: item.banner_image_url || null,
      parent_id: item.parent_id || null,
      created_at: item.created_at ? new Date(item.created_at) : new Date(),
      updated_at: item.updated_at ? new Date(item.updated_at) : new Date(),
    }));

    return queryInterface.bulkInsert("catalogues", catalogueData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("catalogues", null, {});
  },
};
