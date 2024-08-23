module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      '@babel/preset-env',
      '@babel/preset-typescript',
    ],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          safe: false,
          allowUndefined: false,
          verbose: false,
        },
      ],
      ["@babel/plugin-transform-runtime"],
      ["@babel/plugin-transform-private-property-in-object", { "loose": true }],
      ["@babel/plugin-transform-class-properties", { "loose": true }],
      ["@babel/plugin-transform-private-methods", { "loose": true }]
    ],
  };
};
