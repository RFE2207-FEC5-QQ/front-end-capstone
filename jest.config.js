module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^.+\\.(css)$': '<rootDir>/client/src/components/views/__mocks__/cssMock.js',
  }
};