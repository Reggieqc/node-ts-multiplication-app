const originalArgv = process.argv;

const runCommand = async (args: string[]) => {
  process.argv = [...originalArgv, ...args];
  jest.resetModules();
  const { yarg } = await import("./args.plugin");
  return yarg;
};

describe("Args Plugin", () => {
  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  it("should return default args", async () => {
    const args = await runCommand(["-b", "5"]);
    expect(args).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: "multiplication-table",
        d: "outputs",
      }),
    );
  });
  it("should return configuration with custom values", async () => {
    const args = await runCommand([
      "-b",
      "3",
      "-l",
      "15",
      "-s",
      "-n",
      "table",
      "-d",
      "tables",
    ]);
    expect(args).toEqual(
      expect.objectContaining({
        b: 3,
        l: 15,
        s: true,
        n: "table",
        d: "tables",
      }),
    );
  });
});
