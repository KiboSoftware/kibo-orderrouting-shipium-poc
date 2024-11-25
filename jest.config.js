module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/assets/src/domains/**/*.test.js'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  }
};