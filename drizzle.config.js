import 'dotenv/config';

/** @type { import("drizzle-kit").Config} */
export default {
  dialect: "postgresql",
  schema: "./configs/schema.jsx",
  dbCredentials: {
    url: process.env.DB_URL,
  }
};
