import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "lib/generated/**/*",
      "**/generated/**/*",
      "**/*.generated.js",
      "prisma/generated/**/*",
      "**/prisma/default.js",
      "**/prisma/edge.js",
      "**/prisma/wasm.js",
    ],
  },
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    rules: {},
  }),
];

export default eslintConfig;
