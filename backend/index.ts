import { Client as Postgres } from "pg";
import { ENV_POSTGRES, HOST_BACKEND, PORT_BACKEND } from "./src/helpers/env";
import { pause } from "./src/helpers/pause";
import { listener } from "./src/services/listener";

export let postgres = new Postgres(ENV_POSTGRES);

const start = async () => {
  try {
    await postgres.connect();
    console.log(`Postgres initialized`);
    listener(HOST_BACKEND, PORT_BACKEND);
    console.log(`Server running at ${HOST_BACKEND}:${PORT_BACKEND}`);
  } catch (err) {
    console.log(`ERROR: ${(err as { message?: string }).message}`);
    console.log(`Retrying to init postgres`);
    postgres = new Postgres(ENV_POSTGRES);

    await pause(3000);
    start();
  }
};

start();
