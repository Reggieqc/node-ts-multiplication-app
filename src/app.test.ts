import { ServerApp } from "./presentation/server-app";

describe("App", () => {
  it("should be true", () => {
    {
      expect(true).toBe(true);
    }
  });

  it("should call Server .run with values", async () => {
    const serverRunMock = jest.fn();
    ServerApp.run = serverRunMock;
    process.argv = [
      "node",
      "app.ts",
      "-b",
      "5",
      "-l",
      "10",
      "-s",
      "-n",
      "test-file",
      "-d",
      "test-destination",
    ];

    await import("./app");

    expect(serverRunMock).toHaveBeenCalledWith({
      base: 5,
      limit: 10,
      showConsolePrint: true,
      fileName: "test-file",
      destination: "test-destination",
    });
  });
});
