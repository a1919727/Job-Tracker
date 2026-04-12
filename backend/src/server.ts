import "dotenv/config";
import app from "./app";
import { connectToDB } from "./config/mongoose";

const port = Number(process.env.PORT) || 5000;

connectToDB();

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
