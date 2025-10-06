const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// Load your raw JSON
const input = require("../laminates_raw.json"); // replace with your actual JSON file

if (!Array.isArray(input)) {
  throw new Error(
    "❌ Input JSON is not an array. Please check your source file."
  );
}

// Step 1: Extract Addresses first
const addresses = [];
const dealers = [];
const stores = [];

for (const item of input) {
  // Generate UUIDs
  const dealerId = uuidv4();
  const addressId = uuidv4();
  const storeId = uuidv4();

  // ---- Address ----
  addresses.push({
    id: addressId,
    owner_type: "dealer",
    owner_id: dealerId,
    street: item.address,
    city: item.address.split(",").pop().trim(),
    state: item.state,
    country: "India",
    pincode: item.pincode,
  });

  // ---- Dealer ----
  dealers.push({
    id: dealerId,
    name: item.name,
    slug: item.name.toLowerCase().replace(/\s+/g, "-"),
    company_name: item.name,
  });

  // ---- Store ----
  stores.push({
    id: storeId,
    dealer_id: dealerId,
    name: item.name + " Store",
    phone: item.mobile,
    address_id: addressId,
  });
}

// ---- Write to JSON ----
fs.writeFileSync("addresses.json", JSON.stringify(addresses, null, 2));
fs.writeFileSync("dealers.json", JSON.stringify(dealers, null, 2));
fs.writeFileSync("stores.json", JSON.stringify(stores, null, 2));

console.log("✅ Transformation completed. Files generated:");
console.log("- addresses.json");
console.log("- dealers.json");
console.log("- stores.json");
