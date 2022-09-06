// https://refactoring.guru/design-patterns/factory-method
// https://www.patterns.dev/posts/factory-pattern/

import { LocalStorage, RestApiStorage } from "./storage";

// some random usage example 👇

const data = [
	{
		type: "session",
		sessionToken: "123456",
	},
	{
		type: "user",
		name: "Dan",
		location: "Lviv, Ukraine",
	},
];

data.forEach((item) => {
	switch (item.type) {
		case "user":
		case "contact":
		case "creditCard":
			new RestApiStorage().save(`/api/${item.type}`, item);
		case "session":
		case "uiPreferences":
		case "languagePreferences":
			new LocalStorage().save(item.type, item);
	}
});
