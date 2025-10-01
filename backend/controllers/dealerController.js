const Dealer = require("../models/dealer");
const Address = require("../models/address");
const CacheService = require("../models/cache");
const { v4: uuidv4 } = require("uuid");

exports.listDealers = async (req, res) => {
  const cacheKey = "dealers_list";
  let dealers = await CacheService.get(cacheKey);

  if (!dealers) {
    dealers = await Dealer.findAll({ include: Address });
    await CacheService.set(cacheKey, dealers, 300);
  }

  res.json(dealers);
};

exports.getDealerById = async (req, res) => {
  const { id } = req.params;
  const cacheKey = `dealer_${id}`;
  let dealer = await CacheService.get(cacheKey);

  if (!dealer) {
    dealer = await Dealer.findByPk(id, { include: Address });
    if (!dealer) return res.status(404).json({ message: "Dealer not found" });
    await CacheService.set(cacheKey, dealer, 300);
  }

  res.json(dealer);
};

exports.getDealerBySlug = async (req, res) => {
  const { slug } = req.params;
  const cacheKey = `dealer_slug_${slug}`;
  let dealer = await CacheService.get(cacheKey);

  if (!dealer) {
    dealer = await Dealer.findOne({ where: { slug }, include: Address });
    if (!dealer) return res.status(404).json({ message: "Dealer not found" });
    await CacheService.set(cacheKey, dealer, 300);
  }

  res.json(dealer);
};

exports.createDealer = async (req, res) => {
  const { name, slug, company_name, address } = req.body;
  const dealer = await Dealer.create({
    id: uuidv4(),
    name,
    slug,
    company_name,
  });

  if (address) {
    await Address.create({
      id: uuidv4(),
      owner_type: "dealer",
      owner_id: dealer.id,
      ...address,
    });
  }

  await CacheService.del("dealers_list");
  res.status(201).json(dealer);
};

exports.updateDealer = async (req, res) => {
  const { id } = req.params;
  const { address, ...updates } = req.body;
  const dealer = await Dealer.findByPk(id);
  if (!dealer) return res.status(404).json({ message: "Dealer not found" });

  await dealer.update(updates);
  if (address) {
    const existingAddress = await Address.findOne({
      where: { owner_type: "dealer", owner_id: id },
    });
    if (existingAddress) {
      await existingAddress.update(address);
    } else {
      await Address.create({
        id: uuidv4(),
        owner_type: "dealer",
        owner_id: id,
        ...address,
      });
    }
  }

  await CacheService.del(`dealer_${id}`);
  await CacheService.del(`dealer_slug_${dealer.slug}`);
  await CacheService.del("dealers_list");
  res.json(dealer);
};

exports.contactDealer = async (req, res) => {
  const { id } = req.params;
  const { message, name, email, phone } = req.body;
  // Implement contact logic (e.g., send email or create contact entry)
  res.status(200).json({ message: "Contact request sent" });
};
