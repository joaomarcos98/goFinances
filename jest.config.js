module.exports = {
    preset: "jest-expo",
    testPathIgnorePatterns: [
        "/node_modules",
        "/android",
        "/ios"
    ],
    setupFilesAfterEnv: [
        "@testing-library/jest-native/extend-expect",
        "jest-styled-components"
    ],
    setupFiles: ["./setupFile.js"],
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.tsx",
        "!src/**/*.test.tsx"
    ],
    coverageReporters: [
        "lcov"
    ],
    transform: {
        "\\.svg$": "<rootDir>/fileTransformer.js"
      }
}