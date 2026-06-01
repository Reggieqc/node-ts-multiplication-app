export interface CreateTableUseCase {
  execute(options: CreateTableOptions): string;
}

export interface CreateTableOptions {
  base: number;
  limit?: number;
  showConsolePrint?: boolean;
}

export class CreateTable implements CreateTableUseCase {
  constructor() {
    /**
     * DI - Dependency Injection
     */
  }

  execute({ base, limit = 10, showConsolePrint }: CreateTableOptions): string {
    let outputData: string = "";
    for (let i = 1; i <= limit; i++) {
      const result = base * i;
      outputData += `${base} x ${i} = ${result}`;

      if (i < limit) {
        outputData += "\n";
      }
    }
    return outputData;
  }
}
