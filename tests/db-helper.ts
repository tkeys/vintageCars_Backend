import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { connect } from "mongoose";
import { BrandDocument, BrandSchema } from "../src/model/Brand";
import { VintageCarDocument, VintageCarSchema } from "../src/model/Car";
import { ConditionDocument, ConditionSchema } from "../src/model/Condition";
import { OrderDocument, OrderSchema } from "../src/model/Order";

let mongoServer: MongoMemoryServer;

export async function connectToTestDatabase() {
  if (!mongoServer) {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri);
    mongoose.model<OrderDocument>("Order", OrderSchema);
    mongoose.model<VintageCarDocument>("VintageCar", VintageCarSchema);
    mongoose.model<BrandDocument>("Brand", BrandSchema);
    mongoose.model<ConditionDocument>("Condition", ConditionSchema);
  }
}

export async function closeTestDatabase() {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
}
