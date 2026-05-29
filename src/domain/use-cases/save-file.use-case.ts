import fs from "fs";

export interface SaveFileUseCase {
  execute(options: Options): boolean;
}

export interface Options {
  fileContent: string;
  destination?: string;
  fileName?: string;
}

export class SaveFile implements SaveFileUseCase {
  constructor() {
    /**
     * DI - Dependency Injection
     */
  }

  execute({
    fileContent,
    destination = "outputs",
    fileName,
  }: Options): boolean {
    try {
      fs.mkdirSync(destination, { recursive: true });
      fs.writeFileSync(`${destination}/${fileName}`, fileContent);
      return true;
    } catch (error) {
      console.error("Error creating file:", error);
      return false;
    }
  }
}
