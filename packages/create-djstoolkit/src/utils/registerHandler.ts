import { join } from "node:path";

export const registerHandler = async (
  targetDir: string,
  importName: string,
  importPath: string,
) => {
  const handlersPath = join(targetDir, "src/handlers/index.ts");
  let content = await Bun.file(handlersPath).text();

  content = content.replace(
    /(^import .+;\n)+/m,
    (match) => `${match}import { ${importName} } from "${importPath}";\n`,
  );

  content = content.replace(
    /(export const initHandlers = async \(\) => \{\n)/,
    `$1  await ${importName}();\n`,
  );

  await Bun.write(handlersPath, content);
};
