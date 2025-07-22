// .github/scripts/generate-history-index.js

const fs = require("fs");
const path = require("path");

const historyDir = path.resolve("history");
const sourceReportDir = path.resolve("allure-report");
const runId = process.env.GITHUB_RUN_ID || `run-${Date.now()}`;
const runDir = path.join(historyDir, runId);

/* // Crear directorio si no existe
if (!fs.existsSync(historyDir)) {
  fs.mkdirSync(historyDir, { recursive: true });
  console.log(`🟡 Directorio 'history' no existía. Se creó.`);
}
 */

// Copiar el último reporte
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

// Leer subdirectorios ordenados
const dirs = fs
  .readdirSync(historyDir)
  .filter((f) => fs.statSync(path.join(historyDir, f)).isDirectory())
  .sort((a, b) => b.localeCompare(a));

// Función para convertir runId a fecha
function formatRunId(id) {
  const parts = id.split("-");
  const timestamp = parts[parts.length - 1];
  const date = new Date(parseInt(timestamp));
  if (isNaN(date.getTime())) return id;
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

// HTML index
const indexHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Historial de Reportes</title>
  <link rel="icon" href="https://allurereport.org/images/favicon.ico" />
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background-color: #f9f9f9;
      color: #333;
      padding: 2rem;
      max-width: 800px;
      margin: auto;
    }
    h1 {
      color: #222;
      border-bottom: 2px solid #e2e2e2;
      padding-bottom: 0.5rem;
      margin-bottom: 1rem;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      background: #ffffff;
      margin: 0.5rem 0;
      padding: 1rem;
      border: 1px solid #e0e0e0;
      border-left: 5px solid #007acc;
      display: flex;
      justify-content: space-between;
      align-items: center;
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
    .meta {
      font-size: 0.85rem;
      color: #666;
      text-align: right;
    }
    .icon {
      margin-right: 0.5rem;
    }
  </style>
</head>
<body>
  <h1>📊 Historial de Reportes Allure</h1>
  <ul>
    ${dirs
      .map((dir) => {
        const fecha = formatRunId(dir);
        return `
        <li>
          <span>
            📁 <a href="./${dir}/index.html" target="_blank">${dir}</a>
          </span>
          <span class="meta">${fecha}</span>
        </li>`;
      })
      .join("")}
  </ul>
</body>
</html>`;

// Guardar index
fs.writeFileSync(path.join(historyDir, "index.html"), indexHtml);
console.log(`📄 Índice generado en ${path.join(historyDir, "index.html")}`);
