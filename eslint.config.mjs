import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "max-lines-per-function": ["warn", { max: 80, skipBlankLines: true, skipComments: true }],
      "max-depth": ["warn", { max: 3 }],
      "max-params": ["warn", { max: 4 }],
      "no-magic-numbers": ["warn", { ignore: [0, 1, -1, 2], ignoreArrayIndexes: true, ignoreDefaultValues: true }],
    },
  },
  {
    files: ["**/*.test.*", "**/*.spec.*", "**/constants/**"],
    rules: {
      "no-magic-numbers": "off",
    },
  },
]);

export default eslintConfig;
