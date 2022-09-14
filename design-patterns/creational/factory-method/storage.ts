export interface IStorage {
  create(uri: string, data: any): Promise<any>;
  read(uri: string): Promise<any>;
  update(uri: string, data: any): Promise<any>;
  delete(uri: string): Promise<any>;
}

export class LocalStorageAdapter implements IStorage {
  async create(uri: string, data: any) {
    localStorage.setItem(uri, data);
    return data;
  }

  async read(uri: string) {
    return localStorage.getItem(uri);
  }

  async update(uri: string, data: any) {
    localStorage.setItem(uri, data);
    return data;
  }

  async delete(uri: string) {
    const data = await this.read(uri);

    localStorage.removeItem(uri);

    return data;
  }
}

export class RestAPIStorageAdapter implements IStorage {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async create(uri: string, data: any) {
    const response = await fetch(`${this.baseURL}${uri}`, {
      // use path.join instead of string template literal
      method: "POST",
      body: data,
    });

    const payload = await response.json();

    return payload;
  }

  async read(uri: string) {
    const response = await fetch(`${this.baseURL}${uri}`);
    const payload = await response.json();

    return payload;
  }

  async update(uri: string, data: any) {
    const response = await fetch(`${this.baseURL}${uri}`, {
      method: "PUT",
      body: data,
    });

    const payload = await response.json();

    return payload;
  }

  async delete(uri: string) {
    const response = await fetch(`${this.baseURL}${uri}`, {
      method: "DELETE",
    });

    const payload = await response.json();

    return payload;
  }
}
