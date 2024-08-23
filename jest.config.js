module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['./jest-setup.ts'],
  moduleNameMapper: {
    '^@env$': './__mocks__/@env.ts',
  },
  transform: {
    '^.+\\.(js|ts|tsx)$': ['babel-jest', { configFile: './babel.config.test.js' }],
  },
  testPathIgnorePatterns: [
    '<rootDir>/babel.config.test.js', // Ignora el archivo de configuración de Babel para los tests
  ],
};