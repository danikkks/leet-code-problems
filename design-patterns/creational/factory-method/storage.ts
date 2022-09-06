import {
	IdentitySerializerDeserializer,
	ISerializerDeserializer,
	ToStringSerializerDeserializer,
} from "./serializer-deserializer";

interface IAppStorage {
	save(uri: string, value: any): Promise<any>;
	update(uri: string, value: any): Promise<any>;
	retrive(uri: string): Promise<any>;
	delete(uri: string): Promise<any>;
}

abstract class AppStorage implements IAppStorage {
	protected serializerDeserializer: ISerializerDeserializer;

	abstract update(uri: string, value: any): Promise<any>;
	abstract delete(uri: string): Promise<any>;
	abstract save(uri: string, value: any): Promise<any>;
	abstract retrive(uri: string): Promise<any>;
	abstract createSerializerDeserializer(): ISerializerDeserializer;

	constructor() {
		this.serializerDeserializer = this.createSerializerDeserializer();
	}
}

export class LocalStorage extends AppStorage {
	createSerializerDeserializer() {
		return new ToStringSerializerDeserializer();
	}

	async save(uri: string, value: any) {
		localStorage.setItem(uri, this.serializerDeserializer.serialize(value));

		return value;
	}
	async update(uri: string, value: any) {
		localStorage.setItem(uri, this.serializerDeserializer.serialize(value));

		return value;
	}
	async retrive(uri: string) {
		return this.serializerDeserializer.deserialize(
			localStorage.getItem(uri)
		);
	}
	async delete(uri: string) {
		const item = this.retrive(uri);

		localStorage.removeItem(uri);

		return item;
	}
}

export class RestApiStorage extends AppStorage {
	createSerializerDeserializer() {
		return new IdentitySerializerDeserializer();
	}
	async save(uri: string, value: any) {
		const response = await fetch(uri, {
			method: "POST",
			body: this.serializerDeserializer.serialize(value),
		});

		const body = await response.json();

		return this.serializerDeserializer.deserialize(body);
	}
	async update(uri: string, value: any) {
		const response = await fetch(uri, {
			method: "PUT",
			body: this.serializerDeserializer.serialize(value),
		});

		const body = await response.json();

		return this.serializerDeserializer.deserialize(body);
	}
	async retrive(uri: string) {
		const response = await fetch(uri);

		const body = await response.json();

		return this.serializerDeserializer.deserialize(body);
	}
	async delete(uri: string) {
		const response = await fetch(uri, {
			method: "DELETE",
		});

		const body = await response.json();

		return this.serializerDeserializer.deserialize(body);
	}
}

// TODO: GraphQLApiStorage extends AppStorage { ... }
