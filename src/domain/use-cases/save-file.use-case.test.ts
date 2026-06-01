import { SaveFile } from "./save-file.use-case";
import fs from "fs";

describe("SaveFileUseCase", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Only works for mocked functions, not for mockimplementations
    // Clean up the outputs directory before each test
    if (fs.existsSync("outputs")) {
      fs.rmSync("outputs", { recursive: true, force: true });
    }
  });
  afterEach(() => {
    // Clean up the outputs directory after each test
    if (fs.existsSync("outputs")) {
      fs.rmSync("outputs", { recursive: true, force: true });
    }
  });
  it("should save a file  with default values", () => {
    const saveFile = new SaveFile();
    const filePath = "outputs/table.txt";
    const options = {
      fileContent: "Hello, World!",
    };

    const result = saveFile.execute(options);
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });

    expect(result).toBe(true);
    expect(fileExists).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });

  it("should save a file with custom values", () => {
    const options = {
      fileContent: "Custom content",
      destination: "custom_outputs/destination.txt  ",
      fileName: "custom_file",
    };
    const saveFile = new SaveFile();
    const filePath = `${options.destination}/${options.fileName}.txt`;

    const result = saveFile.execute(options);
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });

    expect(result).toBe(true);
    expect(fileExists).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });
  it("should return file if directory could not be created", () => {
    const saveFile = new SaveFile();
    const mkdirSpy = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
      throw new Error("Failed to create directory");
    });
    const options = {
      fileContent: "Hello, World!",
    };

    const result = saveFile.execute(options);

    expect(result).toBe(false);
    mkdirSpy.mockRestore();
  });
  it("should return false if file could not be created", () => {
    const saveFile = new SaveFile();
    const writeFileSpy = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation(() => {
        throw new Error("Failed to create file");
      });
    const options = {
      fileContent: "Hello, World!",
    };

    const result = saveFile.execute(options);

    expect(result).toBe(false);
    writeFileSpy.mockRestore();
  });
});
