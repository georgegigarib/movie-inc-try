import 'react-native-gesture-handler/jestSetup';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));


import MockIcon from './__mocks__/MockIcon';

jest.mock('react-native-vector-icons/FontAwesome', () => MockIcon);