// https://refactoring.guru/design-patterns/factory-method
// https://www.patterns.dev/posts/factory-pattern/

import { SettingsStateStore, UserStateStore } from "./state-store";

const userState = new UserStateStore(); // use rest api to store users
userState.readAll();
console.log(userState.data);

const settingsState = new SettingsStateStore(); // use local storage to store user ui settings
settingsState.readAll();
console.log(settingsState.data);
