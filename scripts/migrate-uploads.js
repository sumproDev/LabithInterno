const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const { v2: cloudinary } = require("cloudinary");
require("dotenv").config();

async function migrate() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const mongoUri = process.env.MONGODB_URI;

  if (!cloudName || !apiKey || !apiSecret) {
    console.error("Error: Missing Cloudinary credentials in .env");
    process.exit(1);
  }

  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadsDir)) {
    console.log("No public/uploads directory found. Nothing to migrate.");
    process.exit(0);
  }

  const files = fs.readdirSync(uploadsDir).filter((f) => !f.startsWith("."));
  if (files.length === 0) {
    console.log("No files in public/uploads. Nothing to migrate.");
    process.exit(0);
  }

  console.log(`Found ${files.length} local files in public/uploads. Starting Cloudinary upload...`);

  const urlMap = {};

  for (const fileName of files) {
    const filePath = path.join(uploadsDir, fileName);
    const localUrl = `/uploads/${fileName}`;

    try {
      console.log(`Uploading ${fileName} to Cloudinary...`);
      const res = await cloudinary.uploader.upload(filePath, {
        folder: "labith-interno",
        use_filename: true,
        unique_filename: true,
      });

      if (res && res.secure_url) {
        urlMap[localUrl] = res.secure_url;
        console.log(`Uploaded ${fileName} -> ${res.secure_url}`);
      }
    } catch (err) {
      console.error(`Failed to upload ${fileName}:`, err.message);
    }
  }

  if (Object.keys(urlMap).length === 0) {
    console.error("No files were successfully uploaded to Cloudinary. Aborting database update.");
    process.exit(1);
  }

  console.log("\nConnecting to MongoDB to update image URLs...");
  await mongoose.connect(mongoUri);
  const db = mongoose.connection.db;

  const collectionNames = ["products", "projects", "collections", "testimonials"];

  for (const colName of collectionNames) {
    const docs = await db.collection(colName).find({}).toArray();
    let updatedCount = 0;

    for (const doc of docs) {
      let docModified = false;
      const updatedDoc = { ...doc };

      // Helper function to replace local URL with Cloudinary URL
      const replaceUrl = (str) => {
        if (typeof str !== "string") return str;
        for (const [localUrl, cloudUrl] of Object.entries(urlMap)) {
          if (str === localUrl || str.endsWith(localUrl)) {
            docModified = true;
            return cloudUrl;
          }
        }
        return str;
      };

      if (Array.isArray(updatedDoc.images)) {
        updatedDoc.images = updatedDoc.images.map((img) => replaceUrl(img));
      }
      if (typeof updatedDoc.image === "string") {
        updatedDoc.image = replaceUrl(updatedDoc.image);
      }

      if (docModified) {
        await db.collection(colName).updateOne({ _id: doc._id }, { $set: updatedDoc });
        updatedCount++;
      }
    }

    console.log(`Updated ${updatedCount} documents in collection '${colName}'`);
  }

  await mongoose.disconnect();

  console.log("\nCleaning up migrated local files from public/uploads...");
  for (const localUrl of Object.keys(urlMap)) {
    const fileName = path.basename(localUrl);
    const filePath = path.join(uploadsDir, fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Removed local file: ${fileName}`);
    }
  }

  console.log("\nMigration completed successfully!");
}

migrate().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
