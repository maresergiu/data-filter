module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  preset: "@vue/cli-plugin-unit-jest",
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
    "^.+\\.(js|jsx)?$": "babel-jest"
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  testMatch: ["<rootDir>/*tests/**/*.js"],
  snapshotSerializers: ["jest-serializer-vue"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"]
};
