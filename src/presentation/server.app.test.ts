import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";
import { ServerApp } from "./server-app";

describe("Server App", () => {
  const options = {
    base: 5,
    limit: 10,
    showConsolePrint: false,
    fileName: "test-filename",
    destination: "test-destination",
  };
  it("should create a Server App instance", () => {
    const serverApp = new ServerApp();

    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe("function");
  });
  //INTEGRATION TEST
  // it("should run server with options", () => {
  //   const logSpy = jest.spyOn(console, "log");
  //   const createTableSpy = jest.spyOn(CreateTable.prototype, "execute");
  //   const saveFileSpy = jest.spyOn(SaveFile.prototype, "execute");

  //   ServerApp.run(options);

  //   expect(logSpy).toHaveBeenCalledWith("Server running...");
  //   expect(createTableSpy).toHaveBeenCalledWith({
  //     base: options.base,
  //     limit: options.limit,
  //     showConsolePrint: options.showConsolePrint,
  //   });
  //   expect(saveFileSpy).toHaveBeenCalledWith({
  //     fileContent: expect.any(String),
  //     fileName: options.fileName,
  //     destination: options.destination,
  //   });
  //   expect(logSpy).toHaveBeenCalledWith("File created!");
  // });
  //UNIT TEST WAY
  it("should run with custom values mocked", () => {
    const logMock = jest.fn();
    const createMock = jest.fn().mockReturnValue("1 x 1 = 1");
    const saveMock = jest.fn().mockReturnValue(true);

    console.log = logMock;
    CreateTable.prototype.execute = createMock;
    SaveFile.prototype.execute = saveMock;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith("Server running...");
    expect(createMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
      showConsolePrint: options.showConsolePrint,
    });
    expect(saveMock).toHaveBeenCalledWith({
      fileContent: "1 x 1 = 1",
      fileName: options.fileName,
      destination: options.destination,
    });
    expect(logMock).toHaveBeenCalledWith("File created!");
  });
});
