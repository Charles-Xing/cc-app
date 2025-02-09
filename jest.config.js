const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testMatch: ["<rootDir>/src/__tests__/**/**/*.{spec,test}.{js,jsx,ts,tsx}"],
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/constants/(.*)$": "<rootDir>/src/constants/$1",
    "^@/store/(.*)$": "<rootDir>/src/store/$1",
    "^@/pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@/hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@/redux/(.*)$": "<rootDir>/src/redux/$1",
    "^konva": "konva/konva",
  },
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{tsx,ts}",
    "!<rootDir>/src/styles/*.{tsx,ts}",
    "!<rootDir>/src/styles/components/*.{tsx,ts}",
    "!<rootDir>/src/pages/_app.tsx",
    "!<rootDir>/src/pages/_document.tsx",
    "!<rootDir>/src/pages/index.tsx",
    "!<rootDir>/src/utils/axios.ts",
    "!<rootDir>/src/utils/getCourtAndTileInfo.ts",
    "!<rootDir>/src/utils/tileNumberCalculator.ts",
    "!<rootDir>/src/utils/printPDF.ts",
    "!<rootDir>/src/hooks/*",
    "!<rootDir>/src/components/Login/*",
    "!<rootDir>/src/components/BasketballCourt/*", // exclude canvas
    "!<rootDir>/src/components/FullCourt/*", // exclude canvas
    "!<rootDir>/src/components/ProFullCourt/*", // exclude canvas
    "!<rootDir>/src/components/ProHalfCourt/*", // exclude canvas
    "!<rootDir>/src/components/HalfCourt/*", // exclude canvas
    "!<rootDir>/src/components/MediumCourt/*", // exclude canvas
    "!<rootDir>/src/components/SmallCourt/*", // exclude canvas
    "!<rootDir>/src/store/reducer/tileSlice.ts",
    "!<rootDir>/src/store/reducer/counterSlice.ts", // should be deleted later
    "!<rootDir>/src/store/hooks.ts", // exclude redux hooks
    "!<rootDir>/src/utils/getAreaColor.ts",
    "!<rootDir>/src/store/reducer/areaTileQtySlice.ts",
    "!<rootDir>/src/components/PriceBar/TileColorBoard.tsx",
    "!<rootDir>/src/redux/api/cartApi.ts",
    "!<rootDir>/src/redux/api/designApi.ts",
    "!<rootDir>/node_modules/",
    "!<rootDir>/**/__tests__/**",
    "!<rootDir>/**/*.d.ts",
    "<rootDir>/src/hooks/useNameCheckFeedback.ts",
  ],
  verbose: true,
  collectCoverage: true,
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
};

const jestConfig = async () => {
  // createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
  const nextJestConfig = await createJestConfig(customJestConfig)();
  return {
    ...nextJestConfig,
    moduleNameMapper: {
      // Workaround to put our SVG stub first
      "\\.svg$": "<rootDir>/__mocks__/svgMock.js",
      ...nextJestConfig.moduleNameMapper,
    },
  };
};

module.exports = jestConfig;
