import { CreateTable } from "./create-table.use-case";

describe("CreateTableUseCase", () => {
  it("should create a table successfully", () => {
    const createTable = new CreateTable();

    expect(createTable).toBeInstanceOf(CreateTable);

    const table = createTable.execute({ base: 2 });
    const rows = table.split("\n");

    expect(rows.length).toBe(10);
    expect(table).toContain("2 x 1 = 2");
    expect(table).toContain("2 x 10 = 20");
  });

  it("should create a table with a custom values", () => {
    const options = {
      base: 3,
      limit: 20,
    };
    const createTable = new CreateTable();
    const table = createTable.execute(options);
    const rows = table.split("\n");

    expect(rows.length).toBe(20);
    expect(table).toContain("3 x 1 = 3");
    expect(table).toContain("3 x 20 = 60");
  });
});
