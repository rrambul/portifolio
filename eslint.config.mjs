import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "coverage/**",
      "playwright-report/**",
      "test-results/**",
      "next-env.d.ts",
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      // The `const [mounted, setMounted] = useState(false); useEffect(() =>
      // setMounted(true), [])` pattern is the documented way to gate
      // client-only rendering and avoid hydration mismatches (next-themes,
      // canvas/particle layers, etc.). This rule flags it as a false positive.
      "react-hooks/set-state-in-effect": "off",
    },
  },
  {
    // Test mocks legitimately stub next/image with a bare <img>.
    files: ["src/__tests__/**/*.{ts,tsx}"],
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
