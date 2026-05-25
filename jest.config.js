// Конфигурация Jest для запуска unit-тестов на TypeScript.
module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/RPGSagaUnitTests'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }],
  },
};
