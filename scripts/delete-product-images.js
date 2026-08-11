const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

async function run() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error("Missing MONGODB_URI");
    process.exit(1);
  }

  await mongoose.connect(mongoUri);
  const db = mongoose.connection.db;

  // 1. Get all image paths from DB products before clearing
  const dbProducts = await db.collection("products").find({}).toArray();
  const productImages = new Set();

  dbProducts.forEach((p) => {
    (p.images || []).forEach((img) => {
      if (typeof img === "string") productImages.add(path.basename(img));
    });
  });

  // Read data/products.ts for image references as well
  const productsTsPath = path.join(process.cwd(), "data", "products.ts");
  if (fs.existsSync(productsTsPath)) {
    const content = fs.readFileSync(productsTsPath, "utf-8");
    const matches = content.match(/\/images\/[a-zA-Z0-9_.-]+/g) || [];
    matches.forEach((m) => productImages.add(path.basename(m)));
  }

  console.log(`Found ${productImages.size} product image filenames to remove.`);

  // 2. Update MongoDB products collection - clear images array for all products
  const updateResult = await db.collection("products").updateMany({}, { $set: { images: [] } });
  console.log(`Updated ${updateResult.modifiedCount} products in MongoDB (cleared images array).`);

  // 3. Delete matching image files from public/images
  const imagesDir = path.join(process.cwd(), "public", "images");
  let deletedFileCount = 0;

  for (const fileName of productImages) {
    const filePath = path.join(imagesDir, fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Deleted file from public/images: ${fileName}`);
      deletedFileCount++;
    }
  }

  console.log(`\nDeleted ${deletedFileCount} image file(s) from public/images directory.`);

  await mongoose.disconnect();
  console.log("\nDone!");
}

run().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
