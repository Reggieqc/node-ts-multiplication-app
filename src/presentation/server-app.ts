import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

//Oquestador de la aplicación del servidor
interface RunOptions {
  base: number;
  limit: number;
  showConsolePrint: boolean;
  fileName?: string;
  destination?: string;
}
export class ServerApp {
  static run({
    base,
    limit,
    showConsolePrint,
    fileName,
    destination,
  }: RunOptions) {
    console.log("Server running...");
    const table = new CreateTable().execute({ base, limit, showConsolePrint });
    const wasCreated = new SaveFile().execute({
      fileContent: table,
      ...(fileName && { fileName }),
      ...(destination && { destination }),
    });
    if (wasCreated) {
      console.log("File created!");
    } else {
      console.log("Error creating file.");
    }
    if (showConsolePrint) {
      console.log(table);
    }
  }
}
