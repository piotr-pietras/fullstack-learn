import dotenv from "dotenv";

dotenv.config();
const env = process.env;

export const HOST_BACKEND = env.BACKEND_HOST || "";
export const PORT_BACKEND = parseInt(env.BACKEND_PORT || "");
export const ENV_POSTGRES = {
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  host: env.POSTGRES_HOST || "0.0.0.0",
  port: parseInt(env.POSTGRES_PORT || "5432"),
};
