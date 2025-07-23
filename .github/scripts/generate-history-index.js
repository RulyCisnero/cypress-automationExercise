// .github/scripts/generate-history-index.js

const fs = require("fs");
const path = require("path");

// Ruta base donde están las carpetas de tipo de test (Smoke, login, etc.)
const BASE_DIR = path.resolve("gh-pages");

// Función para formatear fechas desde el nombre del directorio
function formatRunId(dirName) {
  const date = new Date(dirName.replace("_", "T").replace(/-/g, ":"));
  return isNaN(date.getTime()) ? dirName : date.toLocaleString("es-AR");
}

// Recorre todas las carpetas dentro de gh-pages/
fs.readdirSync(BASE_DIR).forEach((testType) => {
  const testPath = path.join(BASE_DIR, testType);
  const historyPath = path.join(testPath, "history");

  if (!fs.existsSync(historyPath) || !fs.statSync(historyPath).isDirectory()) return;

  const runs = fs
    .readdirSync(historyPath)
    .filter((name) => fs.statSync(path.join(historyPath, name)).isDirectory())
    .sort((a, b) => b.localeCompare(a)); // Descendente

  if (runs.length === 0) return;


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
  <h1>📊 Historial de Reportes: ${testType}</h1>
  <ul>
    ${runs
      .map(
        (dir) => `
    <li>
      <span>📁 <a href="./${dir}/index.html" target="_blank">${dir}</a></span>
      <span class="meta">${formatRunId(dir)}</span>
    </li>`
      )
      .join("")}
  </ul>
</body>
</html>`;

  // Guardar index
  fs.writeFileSync(path.join(historyPath, "index.html"), indexHtml);
  console.log(`✅ Generado: ${path.join("gh-pages", testType, "history/index.html")}`);
});