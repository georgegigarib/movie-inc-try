import 'react-native-gesture-handler/jestSetup';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));


// jest.mock('@/hooks/useThemeColor', () => ({
//   useThemeColor: jest.fn(() => 'black'),
// }));