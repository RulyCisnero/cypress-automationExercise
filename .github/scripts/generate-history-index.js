// generate-history-index.js
const fs = require("fs");
const path = require("path");

const historyDir = path.join(__dirname, "allure-history");
const indexPath = path.join(historyDir, "index.html");

// Si no existe el directorio, lo creamos vacío y salimos
if (!fs.existsSync(historyDir)) {
  fs.mkdirSync(historyDir, { recursive: true });
  fs.writeFileSync(indexPath, `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Allure Report History</title>
    </head>
    <body>
      <h1>Historial vacío</h1>
      <p>No hay reportes generados aún.</p>
    </body>
    </html>
  `);
  console.log("🟡 Directorio 'allure-history' no existía. Se creó vacío con index.html.");
  process.exit(0);
}

// Escaneamos los subdirectorios dentro de allure-history
const folders = fs.readdirSync(historyDir).filter((file) => {
  return fs.statSync(path.join(historyDir, file)).isDirectory();
});

folders.sort().reverse(); // más reciente primero

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Allure Report History</title>
  <style>
    body { font-family: sans-serif; padding: 2rem; }
    h1 { color: #333; }
    li { margin: 0.5rem 0; }
  </style>
</head>
<body>
  <h1>Historial de Reports Allure</h1>
  <ul>
    ${folders
      .map((folder) => {
        return `<li><a href="./${folder}/index.html">📅 ${folder}</a></li>`;
      })
      .join("\n")}
  </ul>
</body>
</html>
`;

fs.writeFileSync(indexPath, htmlContent);
console.log("✔️ Allure history index generado correctamente.");
