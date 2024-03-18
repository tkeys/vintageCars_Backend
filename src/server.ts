import mongoose from "mongoose";
import app from "./app";

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
