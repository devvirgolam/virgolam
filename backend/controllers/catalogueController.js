const Catalogue = require("../models/mysql/Catalogue");
const CacheService = require("../services/cache");
const { v4: uuidv4 } = require("uuid");

exports.listCatalogues = async (req, res) => {
  const cacheKey = "catalogues_list";
  let catalogues = await CacheService.get(cacheKey);

  if (!catalogues) {
    catalogues = await Catalogue.findAll();
    await CacheService.set(cacheKey, catalogues, 300); // Cache for 5 minutes
  }

  res.json(catalogues);
};

exports.getCatalogueById = async (req, res) => {
  const { id } = req.params;
  const cacheKey = `catalogue_${id}`;
  let catalogue = await CacheService.get(cacheKey);

  if (!catalogue) {
    catalogue = await Catalogue.findByPk(id);
    if (!catalogue)
      return res.status(404).json({ message: "Catalogue not found" });
    await CacheService.set(cacheKey, catalogue, 300);
  }

  res.json(catalogue);
};

exports.createCatalogue = async (req, res) => {
  const { name, pdf_url, banner_image_url } = req.body;
  const catalogue = await Catalogue.create({
    id: uuidv4(),
    name,
    pdf_url,
    banner_image_url,
  });
  await CacheService.del("catalogues_list");
  res.status(201).json(catalogue);
};

exports.updateCatalogue = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const catalogue = await Catalogue.findByPk(id);
  if (!catalogue)
    return res.status(404).json({ message: "Catalogue not found" });
  await catalogue.update(updates);
  await CacheService.del(`catalogue_${id}`);
  await CacheService.del("catalogues_list");
  res.json(catalogue);
};

exports.deleteCatalogue = async (req, res) => {
  const { id } = req.params;
  const catalogue = await Catalogue.findByPk(id);
  if (!catalogue)
    return res.status(404).json({ message: "Catalogue not found" });
  await catalogue.destroy();
  await CacheService.del(`catalogue_${id}`);
  await CacheService.del("catalogues_list");
  res.status(204).send();
};
