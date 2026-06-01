import fs from "fs";
import { yarg } from "./config/plugins/args.plugin";

console.log(yarg);
const { b: base, l: limit, s: showConsolePrint } = yarg;
// const base: number = 5;
let outputData: string = "";

const header = `
=======================================
            Tabla del ${base}
=======================================
`;

outputData += header;

for (let i = 1; i <= limit; i++) {
  const result = base * i;
  outputData += `${base} x ${i} = ${result}\n`;
}
if (showConsolePrint) {
  console.log(outputData);
}

const outputPath = `outputs/`;

fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(`${outputPath}tabla-${base}.txt`, outputData);
console.log("File created!");
