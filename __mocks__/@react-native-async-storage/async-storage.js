// __mocks__/@react-native-async-storage/async-storage.js
const mockAsyncStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    mergeItem: jest.fn(),
    clear: jest.fn(),
    getAllKeys: jest.fn(),
  };
  
  export default mockAsyncStorage;
  