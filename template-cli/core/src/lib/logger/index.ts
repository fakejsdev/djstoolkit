const colors = {
  reset: "\x1b[0m",
  gray: "\x1b[90m",
  brightRed: "\x1b[91m",
  brightYellow: "\x1b[93m",
  brightBlue: "\x1b[94m",
};

const icons = {
  warning: "⚠",
  error: "✗",
  log: "✓",
};

const formatMessage = (args: unknown[], color: string, level: string, icon: string) => {
  const timestamp = new Date().toLocaleTimeString();
  const message = args
    .map((arg) => {
      if (arg instanceof Error) {
        return `Error: ${arg.message}`;
      }
      if (typeof arg === "object" && arg !== null) {
        try {
          return JSON.stringify(arg, null, 2);
        } catch {
          return String(arg);
        }
      }
      return String(arg);
    })
    .join(" ");

  return `${color}${icon} ${level.padEnd(6)}${colors.reset} ${colors.gray}${timestamp}${colors.reset} ${colors.gray}│${colors.reset} ${message}`;
};

const log = (...args: unknown[]) => {
  console.log(formatMessage(args, colors.brightBlue, "LOG", icons.log));
};

const warn = (...args: unknown[]) => {
  console.warn(formatMessage(args, colors.brightYellow, "WARN", icons.warning));
};

const error = (...args: unknown[]) => {
  console.error(formatMessage(args, colors.brightRed, "ERROR", icons.error));
};

export const Console = {
  Log: log,
  Warn: warn,
  Error: error,
};
