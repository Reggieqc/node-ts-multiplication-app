import { yarg } from "./config/plugins/yargs.plugin";
import { ServerApp } from "./presentation/server-app";

// console.log(process.argv);

// console.log(yarg); // Makes easier to read script args

(async () => {
  await main();
  // IIFE what is IIFE? Immediately Invoked Function Expression
})();

async function main() {
  const {
    b: base,
    l: limit,
    s: showConsolePrint,
    n: fileName,
    d: destination,
  } = yarg;
  ServerApp.run({ base, limit, showConsolePrint, fileName, destination });
}
