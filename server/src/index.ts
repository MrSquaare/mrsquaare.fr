import "dotenv/config";
import { start, stop } from "./server";

async function run() {
  await start();
}

async function close() {
  await stop();

  process.exit(0);
}

async function main() {
  process.on("SIGINT", close);
  process.on("SIGTERM", close);

  await run();
}

main().catch((e) => {
  console.error("Program exit unexpectedly\n");
  console.error(e);

  process.exit(1);
});
