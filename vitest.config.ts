import { defineConfig } from "vitest/config";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: [
      { find: "adapters", replacement: path.resolve(__dirname, "src/adapters") },
      { find: "config", replacement: path.resolve(__dirname, "src/config") },
      { find: "enum", replacement: path.resolve(__dirname, "src/enum") },
      { find: "errors", replacement: path.resolve(__dirname, "src/errors") },
    ],
  },
  test: {
    globals: true,
    environment: "node",
    include: ["test/**/*.test.ts"],
  },
});
