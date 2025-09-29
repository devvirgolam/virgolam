const mongoose = require("mongoose");

class CacheService {
  async set(key, value, ttl = 3600) {
    // TTL in seconds
    const expiresAt = new Date(Date.now() + ttl * 1000);
    await mongoose.connection.db
      .collection("cache")
      .updateOne({ key }, { $set: { value, expiresAt } }, { upsert: true });
  }

  async get(key) {
    const result = await mongoose.connection.db
      .collection("cache")
      .findOne({ key });
    if (result && result.expiresAt > new Date()) {
      return result.value;
    }
    await mongoose.connection.db.collection("cache").deleteOne({ key });
    return null;
  }

  async del(key) {
    await mongoose.connection.db.collection("cache").deleteOne({ key });
  }
}

module.exports = new CacheService();
