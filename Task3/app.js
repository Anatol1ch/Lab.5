const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// middleware для розбору запитів з тілом в форматі JSON
app.use(bodyParser.json());

// middleware для розбору запитів з тілом у формі даних
app.use(bodyParser.urlencoded({ extended: true }));

// маршрут для головної сторінки
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Vector Sum and Squares</title>
      </head>
      <body>
        <h1>Vector Sum and Squares</h1>
        <form action="/calculate" method="POST">
          <label for="vector">Enter vector:</label>
          <input type="text" id="vector" name="vector" />
          <br />
          <button type="submit">Calculate</button>
        </form>
      </body>
    </html>
  `);
});

// маршрут для обробки запиту на розрахунок суми та квадратів вектора
app.post("/calculate", (req, res) => {
  const vector = req.body.vector;

  // перетворення вектора зі строки в масив чисел
  const numbers = vector.split(",").map(Number);

  // розрахунок суми та квадратів елементів вектора
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  const squares = numbers.map((num) => num ** 2);

  // відправлення результатів у відповідь на запит
  res.send(`
    <html>
      <head>
        <title>Vector Sum and Squares</title>
      </head>
      <body>
        <h1>Vector Sum and Squares</h1>
        <p>Vector: [${vector}]</p>
        <p>Sum: ${sum}</p>
        <p>Squares: [${squares}]</p>
        <br />
        <a href="/">Back to input form</a>
      </body>
    </html>
  `);
});

// запуск сервера на порту 3000
app.listen(3000, () => {
  console.log("Server listening on port 3000...");
});
