// ---------------------------------------------
// comment-to-jira.js  (versión corregida)
// Lee todos los .feature de /cypress/e2e/features/products
// Extrae @JIRA:<KEY> y deja un comentario con el link al reporte
// Requiere tres variables de entorno:
//   JIRA_EMAIL, JIRA_TOKEN, JIRA_BASE_URL
// ---------------------------------------------
import fs from "fs";
import path from "path";
import https from "https";

const RESULTS_URL  = "https://rulycisnero.github.io/cypress-automationExercise/products/";
const FEATURES_DIR = "cypress/e2e/features/products";

// ---------- Obtiene todos los @JIRA:XXX ----------
function collectJiraKeys(dir) {
  const keys = new Set();
  fs.readdirSync(dir).forEach((file) => {
    if (file.endsWith(".feature")) {
      const content  = fs.readFileSync(path.join(dir, file), "utf8");
      const matches  = content.match(/@JIRA:([A-Z]+-\d+)/g) || [];
      matches.forEach((tag) => keys.add(tag.split(":")[1]));
    }
  });
  return [...keys];
}

// ---------- Publica comentario en Jira ----------
function addComment(issueKey, body) {
  return new Promise((resolve, reject) => {
    const data   = JSON.stringify({ body: body.trim() });
    const url    = new URL(`${process.env.JIRA_BASE_URL}/rest/api/3/issue/${issueKey}/comment`);

    const token  = Buffer.from(`${process.env.JIRA_EMAIL}:${process.env.JIRA_TOKEN}`).toString("base64");

    const options = {
      method: "POST",
      headers: {
        "Authorization": `Basic ${token}`,
        "Content-Type": "application/json",
        "Content-Length": data.length,
      },
    };

    const req = https.request(url, options, (res) => {
      res.statusCode >= 200 && res.statusCode < 300
        ? resolve()
        : reject(new Error(`Jira response ${res.statusCode}`));
    });

    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

// ---------- Ejecución principal ----------
(async () => {
  const jiraKeys = collectJiraKeys(FEATURES_DIR);
  if (!jiraKeys.length) {
    console.log("No Jira tags found");
    return;
  }

  // Comentario simple (puedes volver a poner emojis/markdown luego de probar)
  const comment = `Ver reporte de tests: ${RESULTS_URL} (Run #${process.env.GITHUB_RUN_NUMBER})`;

  for (const key of jiraKeys) {
    try {
      await addComment(key, comment);
      console.log(`✔ Comentario agregado a ${key}`);
    } catch (e) {
      console.warn(`⚠ No se pudo comentar en ${key}: ${e.message}`);
    }
  }
})();
