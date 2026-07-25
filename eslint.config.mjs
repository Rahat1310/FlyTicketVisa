import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Project-wide rule overrides
  {
    rules: {
      // Escalate unused vars from warning → error; ignore vars prefixed with _
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
      ],

      // Enforce `import type` for type-only imports (better tree-shaking)
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],

      // Warn on leftover console statements
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // Prefer const over let where variable is never reassigned
      "prefer-const": "error",
    },
  },

  // Ignore generated and vendored files
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
    "prisma/**",
  ]),
]);

export default eslintConfig;

