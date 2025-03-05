import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        { "selector": "typeAlias", "format": ["PascalCase"] },
        { "selector": "interface", "format": ["PascalCase"] },
        { "selector": "enum", "format": ["PascalCase"] },
        { "selector": "enumMember", "format": ["UPPER_CASE"] },
        { "selector": "variable", "format": ["camelCase"] },
        // Next.js のコンポーネント名は PascalCase がなため許可する
        { "selector": "function", "format": ["camelCase", "PascalCase"] }
      ]
    }
  }
];

export default eslintConfig;
