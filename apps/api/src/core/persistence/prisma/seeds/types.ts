export abstract class SeedService {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  logInfo(type: 'SEED' | 'REMOVE'): void {
    // TODO: Use logger
    console.log(`  ${type === 'SEED' ? '🌻' : '🧹'} ${this.name}`);
  }

  abstract removeAll(): void;
  abstract seed(): void;
  // abstract seedTestData(): void;
}
