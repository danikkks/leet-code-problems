import {
  IStorage,
  LocalStorageAdapter,
  RestAPIStorageAdapter,
} from "./storage";

abstract class StateStore {
  protected abstract createStorageProvider(): IStorage;

  private name: string;
  data: any[];

  constructor(name: string) {
    this.name = name;
    this.data = [];
  }

  async create(id: string, data: any) {
    const result = await this.createStorageProvider().create(
      `${name}/${id}`,
      data
    );

    this.data.push(result);

    return result;
  }

  async readAll() {
    const result = await this.createStorageProvider().read(`${name}`);

    this.data.concat(result);

    return this.data;
  }

  // ... update, delete
}

export class UserStateStore extends StateStore {
  constructor() {
    super("users");
  }

  createStorageProvider(): IStorage {
    return new RestAPIStorageAdapter("/api/v1");
  }
}

export class SettingsStateStore extends StateStore {
  constructor() {
    super("settings");
  }

  createStorageProvider(): IStorage {
    return new LocalStorageAdapter();
  }
}
