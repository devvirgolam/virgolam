const Store = require("../models/mysql/Store");
const Dealer = require("../models/mysql/Dealer");
const Address = require("../models/mysql/Address");
const CacheService = require("../services/cache");
const { v4: uuidv4 } = require("uuid");

exports.listStores = async (req, res) => {
  const cacheKey = "stores_list";
  let stores = await CacheService.get(cacheKey);

  if (!stores) {
    stores = await Store.findAll({ include: [Dealer, Address] });
    await CacheService.set(cacheKey, stores, 300);
  }

  res.json(stores);
};

exports.getStoreById = async (req, res) => {
  const { id } = req.params;
  const cacheKey = `store_${id}`;
  let store = await CacheService.get(cacheKey);

  if (!store) {
    store = await Store.findByPk(id, { include: [Dealer, Address] });
    if (!store) return res.status(404).json({ message: "Store not found" });
    await CacheService.set(cacheKey, store, 300);
  }

  res.json(store);
};

exports.createStore = async (req, res) => {
  const { dealer_id, name, phone, address } = req.body;
  const store = await Store.create({
    id: uuidv4(),
    dealer_id,
    name,
    phone,
  });

  if (address) {
    const addressData = await Address.create({
      id: uuidv4(),
      owner_type: "store",
      owner_id: store.id,
      ...address,
    });
    store.address_id = addressData.id;
    await store.save();
  }

  await CacheService.del("stores_list");
  res.status(201).json(store);
};

exports.findStoresByLocation = async (req, res) => {
  const { city, pincode } = req.query;
  const stores = await Store.findAll({
    include: [
      {
        model: Address,
        where: {
          [Op.or]: [
            city ? { city } : null,
            pincode ? { pincode } : null,
          ].filter(Boolean),
        },
      },
      Dealer,
    ],
  });
  res.json(stores);
};
