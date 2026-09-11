import { initButtonHandler } from "./buttonsHandler";
import { initDropdownHandler } from "./dropdownHandler";

export const initComponentsHandler = async () => {
  await initButtonHandler();
  await initDropdownHandler();
};
