const express = require('express');
const { collectDefaultMetrics, register } = require('prom-client');
const cors = require('cors');

const app = express();
const port = 3030;

// Включаем CORS для доступа из React-приложения
app.use(cors());

// Сбор стандартных метрик
collectDefaultMetrics();

// Эндпоинт для получения метрик Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
