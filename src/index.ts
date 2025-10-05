import { RunCLI } from "./core/RunCLI.js";

async function main() {
  const cli = await RunCLI.run();
  cli.parseArgs();
}
main();
