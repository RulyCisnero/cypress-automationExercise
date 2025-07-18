// .github/scripts/generate-history-index.js

const fs = require("fs");
const path = require("path");

const historyDir = path.resolve("allure-history");
const sourceReportDir = path.resolve("allure-report");
const runId = process.env.GITHUB_RUN_ID || `run-${Date.now()}`;
const runDir = path.join(historyDir, runId);

// 1. Crear la carpeta allure-history si no existe
if (!fs.existsSync(historyDir)) {
  fs.mkdirSync(historyDir, { recursive: true });
  console.log(`🟡 Directorio 'allure-history' no existía. Se creó.`);
  console.log(`📁 ${historyDir}`);
}

// 2. Copiar el contenido de allure-report a allure-history/<runId>
if (!fs.existsSync(sourceReportDir)) {
  console.error("❌ La carpeta 'allure-report' no existe. Abortando.");
  process.exit(1);
}
fs.mkdirSync(runDir, { recursive: true });

fs.readdirSync(sourceReportDir).forEach((file) => {
  const src = path.join(sourceReportDir, file);
  const dest = path.join(runDir, file);
  fs.cpSync(src, dest, { recursive: true });
});
console.log(`✅ Reporte copiado a ${runDir}`);

// 3. Leer subdirectorios dentro de allure-history para generar índice
const dirs = fs
  .readdirSync(historyDir)
  .filter((f) => fs.statSync(path.join(historyDir, f)).isDirectory())
  .sort((a, b) => b.localeCompare(a)); // orden descendente

// 4. Generar HTML estilizado
const indexHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Historial de Reportes</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background-color: #f9f9f9;
      color: #333;
      padding: 2rem;
    }
    h1 {
      color: #222;
      border-bottom: 2px solid #e2e2e2;
      padding-bottom: 0.5rem;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      background: #ffffff;
      margin: 0.5rem 0;
      padding: 1rem;
      border: 1px solid #e0e0e0;
      border-left: 5px solid #007acc;
      transition: all 0.2s ease-in-out;
    }
    li:hover {
      background-color: #f0f8ff;
      transform: scale(1.01);
    }
    a {
      text-decoration: none;
      color: #007acc;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1>Historial de Reportes</h1>
  <ul>
    ${dirs
      .map(
        (dir) =>
          `<li><a href="./${dir}/index.html" target="_blank">${dir}</a></li>`
      )
      .join("\n")}
  </ul>
</body>
</html>`;

// 5. Guardar el archivo index.html
fs.writeFileSync(path.join(historyDir, "index.html"), indexHtml);
console.log(`📄 Índice generado en ${path.join(historyDir, "index.html")}`);
