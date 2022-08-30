import { argv } from "process";
import { listener } from "./src/services/listener";

const host = argv[2].slice(argv[2].indexOf("=") + 1);
const port = parseInt(argv[3].slice(argv[3].indexOf("=") + 1));
listener(host, port);
console.log(`Running at ${host}:${port}`);
