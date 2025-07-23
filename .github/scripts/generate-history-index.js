const fs = require("fs");
const path = require("path");

const BASE_DIR = path.resolve("gh-pages");

// Función para formatear fechas desde el nombre del directorio
function formatRunId(dirName) {
  const date = new Date(dirName.replace("_", "T").replace(/-/g, ":"));
  return isNaN(date.getTime()) ? dirName : date.toLocaleString("es-AR");
}

const linksIndex = []; // 👈 para armar el index general

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

  // Generar HTML para el historial del tipo de test
  const indexHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Historial de Reportes</title>
  <link rel="icon" href="https://allurereport.org/images/favicon.ico" />
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #f9f9f9; padding: 2rem; max-width: 800px; margin: auto; }
    h1 { color: #222; border-bottom: 2px solid #e2e2e2; padding-bottom: 0.5rem; margin-bottom: 1rem; }
    ul { list-style: none; padding: 0; }
    li { background: #fff; margin: 0.5rem 0; padding: 1rem; border: 1px solid #e0e0e0; border-left: 5px solid #007acc; display: flex; justify-content: space-between; align-items: center; transition: all 0.2s ease-in-out; }
    li:hover { background-color: #f0f8ff; transform: scale(1.01); }
    a { text-decoration: none; color: #007acc; font-weight: bold; }
    .meta { font-size: 0.85rem; color: #666; text-align: right; }
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

  fs.writeFileSync(path.join(historyPath, "index.html"), indexHtml);
  console.log(`✅ Generado: ${path.join("gh-pages", testType, "history/index.html")}`);

  // Agregar link al índice general
  linksIndex.push(
    `<li><a href="./${testType}/history/index.html">${testType}</a></li>`
  );
});

// Crear index.html general
const htmlContenido = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Reportes de Test</title>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #f4f4f4; padding: 2rem; max-width: 600px; margin: auto; }
    h1 { color: #333; border-bottom: 2px solid #ccc; padding-bottom: 0.5rem; }
    ul { list-style: none; padding: 0; }
    li { background: #fff; padding: 1rem; margin-bottom: 1rem; border: 1px solid #ddd; }
    a { text-decoration: none; color: #007acc; font-weight: bold; }
  </style>
</head>
<body>
  <h1>📁 Índice General de Reportes</h1>
  <ul>
    ${linksIndex.join("\n")}
  </ul>
</body>
</html>`;

const outputPath = path.join(BASE_DIR, "index.html");
fs.writeFileSync(outputPath, htmlContenido);
console.log(`✅ Generado índice principal: gh-pages/index.html`);
