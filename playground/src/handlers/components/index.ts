import { initButtonHandler } from "./buttonsHandler";
import { initDropdownHandler } from "./dropdownHandler";
import { initModalsHandler } from "./modalHandler";

export const initComponentsHandler = async () => {
  await initButtonHandler();
  await initDropdownHandler();
  await initModalsHandler();
};
