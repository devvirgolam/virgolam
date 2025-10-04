"use strict";
const { v4: uuidv4 } = require("uuid");
const catalogues = require("../data/catalogues.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const catalogueData = catalogues.map((item) => ({
      ...item,
      id: uuidv4(),
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await queryInterface.bulkInsert("catalogues", catalogueData);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("catalogues", null, {});
  },
};
