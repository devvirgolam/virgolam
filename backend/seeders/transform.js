const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// Load your raw JSON
const input = require("../acp.json"); // Directly use the array

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
  if (!item.name) {
    console.warn("⚠️ Missing 'name' field in item:", item);
    continue; // skip this entry
  }

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
    city: item.city || item.address.split(",").pop().trim(),
    state: item.state,
    country: "India",
    pincode: item.pin_code,
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
    email: item.email,
    address_id: addressId,
    parent_category_id: "5ecb2d5f-a03c-11f0-b1b4-f875a42d8cde",
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
