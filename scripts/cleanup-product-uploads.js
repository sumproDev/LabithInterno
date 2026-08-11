const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

async function cleanup() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error("Missing MONGODB_URI in .env");
    process.exit(1);
  }

  await mongoose.connect(mongoUri);
  const db = mongoose.connection.db;

  console.log("Connected to MongoDB. Fetching products...");
  const products = await db.collection("products").find({}).toArray();

  const deletedUploadFiles = new Set();
  let updatedProductsCount = 0;

  for (const product of products) {
    if (!Array.isArray(product.images) || product.images.length === 0) continue;

    const originalImages = product.images;
    const remainingImages = [];

    for (const img of originalImages) {
      if (typeof img === "string" && img.includes("/uploads/")) {
        const fileName = path.basename(img);
        deletedUploadFiles.add(fileName);
      } else {
        remainingImages.push(img);
      }
    }

    if (remainingImages.length !== originalImages.length) {
      await db.collection("products").updateOne(
        { _id: product._id },
        { $set: { images: remainingImages } }
      );
      console.log(
        `Updated product '${product.slug}': removed ${originalImages.length - remainingImages.length} uploaded image(s). Remaining: ${remainingImages.length}`
      );
      updatedProductsCount++;
    }
  }

  console.log(`\nUpdated ${updatedProductsCount} products in MongoDB.`);

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  if (fs.existsSync(uploadsDir)) {
    const localFiles = fs.readdirSync(uploadsDir);
    let deletedCount = 0;

    for (const file of localFiles) {
      if (deletedUploadFiles.has(file) || localFiles.length > 0) {
        const filePath = path.join(uploadsDir, file);
        fs.unlinkSync(filePath);
        console.log(`Deleted local upload file: ${file}`);
        deletedCount++;
      }
    }
    console.log(`\nDeleted ${deletedCount} file(s) from public/uploads.`);
  }

  await mongoose.disconnect();
  console.log("\nCleanup completed successfully!");
}

cleanup().catch((err) => {
  console.error("Cleanup error:", err);
  process.exit(1);
});
