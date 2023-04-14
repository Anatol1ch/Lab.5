const http = require("http");
const fs = require("fs");
const url = require("url");

const group = {
  name: "ІПЗ МБ 231",
  students: [
    { name: "Вдодович Олександр Мирославович" },
    { name: "Вєлєв Владислав Віталійович" },
    { name: "Вигівський Нікіта Русланович" },
    { name: "Кокось Андрій Степанович" },
    { name: "Лабунець Давид Олександрович" },
    { name: "Мироненко Анатолій Анатолійович" },
    { name: "Сафонов Микита Віталійович" },
  ],
};

function renderTemplate(data, templateFile, response) {
  fs.readFile(templateFile, "utf-8", (err, template) => {
    if (err) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end("500 Internal server error");
      return;
    }

    let content = template.replace(/{{group}}/g, data.name);

    const studentsHtml = data.students
      .map((student) => `<li>${student.name.toLowerCase()}</li>`)
      .join("");
    content = content.replace(/{{students}}/g, studentsHtml);

    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(content);
  });
}

http
  .createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === "/") {
      renderTemplate(group, "index.html", res);
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not found");
    }
  })
  .listen(3000);

// http://localhost:3000/
