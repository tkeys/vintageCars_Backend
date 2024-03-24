import mongoose from "mongoose";
import app from "./app";

import { OrderDocument, OrderSchema } from "./model/Order";
import { VintageCarDocument, VintageCarSchema } from "./model/VintageCar";
import { BrandDocument, BrandSchema } from "./model/Brand";
import { ConditionDocument, ConditionSchema } from "./model/Condition";

const mongodbUrl = process.env.MONGODB_URL as string;
const port = process.env.PORT as string;

mongoose
  .connect(mongodbUrl, {
    dbName: "vintagecarsmarket",
  })
  .then(() => {
    app.listen(port, () => {
      console.log("Database vintagecarsmarket is connected");
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.log("MongDB connection error" + error);
    process.exit(1);
  });

mongoose.model<OrderDocument>("Order", OrderSchema);
mongoose.model<VintageCarDocument>("VintageCar", VintageCarSchema);
mongoose.model<BrandDocument>("Brand", BrandSchema);
mongoose.model<ConditionDocument>("Condition", ConditionSchema);
