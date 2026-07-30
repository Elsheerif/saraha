import app from "./app";
import { connectDatabase } from "./db/mongoose";
import { env } from "./config/env";

const start = async () => {
  await connectDatabase();
  app.listen(env.port, () => {
    console.log(`Saraha backend is running on http://localhost:${env.port}`);
  });
};

start().catch((error) => {
  console.error("Unable to start server", error);
  process.exit(1);
});
