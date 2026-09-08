const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Разрешаем CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Статическая папка для фронтенда / стилей / страниц задач (если потребуются файлы)
app.use(express.static(path.join(__dirname, '../public')));

/**
 * ЗАДАНИЕ 1:
 * По протоколу HTTPS возвращает по корневому маршруту: spoon222
 * Заголовок X-Author: spoon222
 * Заголовок Access-Control-Allow-Origin: *
 */
app.get('/', (req, res) => {
  res.setHeader('X-Author', 'spoon222');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.type('text/plain; charset=utf-8');
  res.status(200).send('spoon222');
});

/**
 * Меню со списком страниц заданий (для удобной навигации)
 */
app.get('/tasks', (req, res) => {
  res.type('text/html; charset=utf-8');
  res.send(`
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Задания Node.js</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          background: #0f172a;
          color: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          margin: 0;
        }
        .container {
          background: #1e293b;
          border-radius: 12px;
          padding: 2rem;
          max-width: 600px;
          width: 90%;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
        }
        h1 { margin-top: 0; color: #38bdf8; font-size: 1.5rem; }
        ul { list-style: none; padding: 0; margin: 1.5rem 0 0; }
        li {
          padding: 1rem;
          background: #334155;
          margin-bottom: 0.75rem;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        a {
          color: #38bdf8;
          text-decoration: none;
          font-weight: 500;
        }
        a:hover { text-decoration: underline; }
        .badge {
          background: #0ea5e9;
          color: white;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          font-size: 0.75rem;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Список заданий</h1>
        <ul>
          <li>
            <span><strong>Задание 1:</strong> Корневой ответ и кастомные заголовки</span>
            <a href="/" target="_blank">Открыть (/)</a>
          </li>
          <li>
            <span><strong>Задание 2:</strong> <i>(Зарезервировано)</i></span>
            <a href="/task2">Открыть (/task2)</a>
          </li>
        </ul>
      </div>
    </body>
    </html>
  `);
});

/**
 * ЗАДАНИЕ 2:
 * Маршрут /login: возвращает логин (spoon222)
 * Маршрут /hour: возвращает текущий час по Московскому времени в формате HH (например, 07 или 13)
 */
app.get('/login', (req, res) => {
  res.type('text/plain; charset=utf-8');
  res.status(200).send('spoon222');
});

app.get('/hour', (req, res) => {
  const formatter = new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Europe/Moscow',
    hour: '2-digit',
    hourCycle: 'h23'
  });
  const moscowHour = formatter.format(new Date()).padStart(2, '0');
  res.type('text/plain; charset=utf-8');
  res.status(200).send(moscowHour);
});

/**
 * Заготовка для Задания 2 (страница)
 */
app.get('/task2', (req, res) => {
  res.type('text/html; charset=utf-8');
  res.send(`
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
      <title>Задание 2</title>
      <style>
        body { font-family: sans-serif; background: #0f172a; color: #f8fafc; padding: 2rem; }
        a { color: #38bdf8; }
      </style>
    </head>
    <body>
      <h2>Страница для Задания 2</h2>
      <p>Маршруты:</p>
      <ul>
        <li><a href="/login" target="_blank">/login</a> — логин</li>
        <li><a href="/hour" target="_blank">/hour</a> — текущий час (МСК)</li>
      </ul>
      <a href="/tasks">← Назад к списку заданий</a>
    </body>
    </html>
  `);
});

// Запуск локального сервера (для локальной разработки)
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

// Экспорт для Vercel Serverless
module.exports = app;
