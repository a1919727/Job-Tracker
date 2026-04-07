import "dotenv/config";
import app from "./app";
import { connectToDB } from "./config/mongoose";

const port = Number(process.env.PORT) || 5000;
const host = "127.0.0.1";

connectToDB();

app.listen(port, host, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
