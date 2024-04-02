import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer: MongoMemoryServer;

export async function connectToTestDatabase() {
  if (!mongoServer) {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri);
  }
}

export async function closeTestDatabase() {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
}
