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
  fs.copyFileSync(src, dest);
});
console.log(`✅ Reporte copiado a ${runDir}`);

// 3. Leer todos los subdirectorios dentro de allure-history y generar índice
const dirs = fs.readdirSync(historyDir).filter((f) =>
  fs.statSync(path.join(historyDir, f)).isDirectory()
);

// Crear índice simple con links
const indexHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Historial de Reportes</title>
</head>
<body>
  <h1>Historial de Reportes</h1>
  <ul>
    ${dirs
      .map(
        (d) =>
          `<li><a href="./${d}/index.html" target="_blank">${d}</a></li>`
      )
      .join("\n")}
  </ul>
</body>
</html>
`;

fs.writeFileSync(path.join(historyDir, "index.html"), indexHtml);
console.log(`📄 Índice generado en allure-history/index.html`);
