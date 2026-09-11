const NAME_REGEX = /^[a-z0-9-]+$/;

export const validateName = (value: string | undefined) => {
  if (!value) return "Name is required.";
  if (value.length > 50) return "Must be 50 characters or fewer.";
  if (!value.match(NAME_REGEX)) return "Only lowercase letters, numbers, and hyphens are allowed.";

  return undefined;
};
