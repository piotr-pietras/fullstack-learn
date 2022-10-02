import dotenv from "dotenv";
import { Client as Postgres } from "pg";
import { listener } from "./src/services/listener";

dotenv.config();
const env = process.env;
const host = env.BACKEND_HOST || "";
const port = parseInt(env.BACKEND_PORT || "");
const pg_user = env.PG_USER;
const pg_password = env.PG_PASSWORD;
const pg_port = parseInt(env.PG_PORT || "5432");

export const postgres = new Postgres({
  user: pg_user,
  password: pg_password,
  port: pg_port,
});

const init = async () => {
  // await postgres.connect();
  listener(host, port);
  console.log(`Running at ${host}:${port}`);
};

init();
