import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: [
      { find: "adapters", replacement: "/src/adapters" },
      { find: "config", replacement: "/src/config" },
      { find: "enum", replacement: "/src/enum" },
    ],
  },
  test: {
    globals: true,
    environment: "node",
    include: ["test/**/*.test.ts"],
  },
});
