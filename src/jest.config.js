// jest.config.js

module.exports = {  
  transformIgnorePatterns: ['node_modules/(?!(sucrase)/)'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
  },
  collectCoverage: true, // Включаем сбор покрытия
  collectCoverageFrom: [
    'src/**/*.{js,jsx}', // Указываем файлы для сбора покрытия
    '!src/index.js', // Исключаем файл index.js
  ],
  // ...the rest of your config
}