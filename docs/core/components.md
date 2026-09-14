# Components & Modals

DJSToolkit provides a revolutionary, friction-free way to handle Discord UI Components (Buttons, String Select Menus) and Modals. We ditched complicated collectors and giant switch statements in favor of a file-based, **prefix-matching router**.

---

## 1. The Prefix Routing Magic (`split(":")`)

In traditional Discord bots, if you want a button to carry dynamic data (like an ID), you do this:
`new ButtonBuilder().setCustomId("BAN_USER_12345")`.

The problem? You can no longer just listen for `"BAN_USER"` because the ID is dynamic. You end up writing messy `.startsWith()` checks across your codebase.

**DJSToolkit solves this automatically.** 
If you set your customId to `BAN_USER:12345`, the framework splits the string by `:` behind the scenes:
- `baseId` = `"BAN_USER"`
- `sessionId` = `"12345"`

It routes the interaction to the `defineButton` registered with `"BAN_USER"`, and passes `"12345"` as a second parameter to your `run` function!

---

## 2. Defining Components

You can define components exactly like you define commands. Place them anywhere in your `src/modules/` folder with the correct extension (`.button.ts`, `.dropdown.ts`, `.modal.ts`).

### Buttons (`.button.ts`)
```typescript
import { defineButton } from "@/lib/helpers/defineButton";

export const { config, run } = defineButton(
  {
    customId: "BAN_CONFIRM", // This is the baseId
    name: "Confirm Ban Button",
    description: "Executes the ban when clicked",
  },
  async (interaction, sessionId) => {
    // If the button customId was "BAN_CONFIRM:999", sessionId will be "999"
    // If it was just "BAN_CONFIRM", sessionId will be undefined
    
    if (sessionId) {
      await interaction.reply(`Confirmed action for ID: ${sessionId}`);
    } else {
      await interaction.reply("Confirmed action!");
    }
  }
);
```

### Dropdowns (`.dropdown.ts`)
Dropdowns work exactly the same way, but provide access to the selected values.
```typescript
import { defineDropdown } from "@/lib/helpers/defineDropdown";

export const { config, run } = defineDropdown(
  {
    customId: "ROLE_SELECTOR",
    name: "Role Selector",
    description: "Let users pick a role",
  },
  async (interaction, sessionId) => {
    const selectedValues = interaction.values; // Array of selected options
    await interaction.reply(`You selected: ${selectedValues.join(", ")}`);
  }
);
```

### Modals (`.modal.ts`)
Modals also benefit from prefix routing! You can use `createSessionId` to generate unique modal sessions or just use static strings.
```typescript
import { defineModal } from "@/lib/helpers/defineModal";

export const { config, run } = defineModal(
  {
    customId: "REPORT_BUG_MODAL",
    name: "Bug Report",
    description: "Handles submitted bug reports",
  },
  async (interaction, sessionId) => {
    // Read the text inputs from the modal
    const description = interaction.fields.getTextInputValue("bug_description");
    
    await interaction.reply(`Thanks for reporting: ${description}`);
  }
);
```

---

## 3. Helpers

To make prefix routing even easier, DJSToolkit provides helpers in `src/lib/helpers/session.ts`:

- **`createCustomIdWithData(baseId, data)`**
  ```typescript
  createCustomIdWithData("BAN_USER", "12345"); // Output: "BAN_USER:12345"
  ```
  Perfect for passing simple, short strings directly through the custom ID.

- **`createSessionId(baseId)`**
  ```typescript
  createSessionId("BAN_USER"); // Output: "BAN_USER:550e8400-e29b-41d4-a716-446655440000"
  ```
  Perfect for generating unique UUIDs to be paired with the [In-Memory Store](../features/store.md) to manage complex state.