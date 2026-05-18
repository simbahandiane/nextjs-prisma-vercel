import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("PRISMA_DATABASE_URL"), // Ensure this matches the key in your .env file
  },
});   