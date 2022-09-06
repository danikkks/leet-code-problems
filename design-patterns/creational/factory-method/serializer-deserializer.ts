export interface ISerializerDeserializer {
	serialize(value: any): any;
	deserialize(value: any): any;
}

export class ToStringSerializerDeserializer implements ISerializerDeserializer {
	serialize(value: any) {
		return JSON.stringify(value);
	}
	deserialize(value: any) {
		return JSON.parse(value);
	}
}

export class IdentitySerializerDeserializer implements ISerializerDeserializer {
	serialize(value: any) {
		return value;
	}
	deserialize(value: any) {
		return value;
	}
}

// TODO: class BlobSerializer implements ISerializerDeserializer { ... }
