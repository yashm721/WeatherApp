module.exports = {
  preset: 'react-native', // or 'jest-expo' if using Expo
  setupFiles: ['<rootDir>/jest.setup.js'], // 👈 IMPORTANT
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-native-async-storage)/)',
  ],
};
