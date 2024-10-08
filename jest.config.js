const nextJest = require("next/jest");
const dotenv = require("dotenv");

const createJestConfig = nextJest();
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000,
});

dotenv.config({ path: ".env.development" });

module.exports = createJestConfig(jestConfig);
