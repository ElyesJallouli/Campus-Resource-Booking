// firebase/config.js
import dotenv from "dotenv";
import admin from "firebase-admin";
import fs from "fs";

dotenv.config();
const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!serviceAccountPath) {
  throw new Error("Environment variable GOOGLE_APPLICATION_CREDENTIALS is not set.");
}

if (!fs.existsSync(serviceAccountPath)) {
  throw new Error(`Service account file not found: ${serviceAccountPath}`);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const auth = admin.auth();
export const db = admin.firestore();
export const storage = admin.storage ? admin.storage() : null;

console.log("Firebase Admin initialized successfully.");