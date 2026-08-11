const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

async function check() {
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection.db;

  const dbProducts = await db.collection("products").find({}).toArray();
  const productImages = new Set();

  dbProducts.forEach((p) => {
    (p.images || []).forEach((i) => productImages.add(path.basename(i)));
  });

  // Read data/products.ts content
  const productsTsContent = fs.readFileSync(path.join(process.cwd(), "data", "products.ts"), "utf-8");
  const matches = productsTsContent.match(/\/images\/[a-zA-Z0-9_.-]+/g) || [];
  matches.forEach((m) => productImages.add(path.basename(m)));

  console.log("Total unique image files referenced in products (DB + TS):", productImages.size);

  const imagesDir = path.join(process.cwd(), "public", "images");
  const existingFiles = fs.readdirSync(imagesDir);

  const productFilesToDelete = existingFiles.filter((f) => productImages.has(f));
  console.log(`\nFiles in public/images matching products (${productFilesToDelete.length}):`);
  console.log(productFilesToDelete);

  await mongoose.disconnect();
}

check();
