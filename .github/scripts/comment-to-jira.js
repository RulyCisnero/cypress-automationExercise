// ---------------------------------------------
// comment-to-jira.js
// Lee todos los .feature de /cypress/e2e/features/products
// extrae @JIRA:<KEY> y deja un comentario con el link al reporte
// Requiere tres variables de entorno:
//   JIRA_EMAIL, JIRA_TOKEN, JIRA_BASE_URL
// ---------------------------------------------
import fs from "fs";
import path from "path";
import https from "https";

const RESULTS_URL = "https://rulycisnero.github.io/cypress-automationExercise/products/";
const FEATURES_DIR = "cypress/e2e/features/products";

function collectJiraKeys(dir) {
  const keys = new Set();
  fs.readdirSync(dir).forEach((file) => {
    if (file.endsWith(".feature")) {
      const content = fs.readFileSync(path.join(dir, file), "utf8");
      const matches = content.match(/@JIRA:([A-Z]+-\d+)/g) || [];
      matches.forEach((tag) => keys.add(tag.split(":")[1]));
    }
  });
  return [...keys];
}

function addComment(issueKey, bodyObj) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(bodyObj);
    const url = new URL(`${process.env.JIRA_BASE_URL}/rest/api/3/issue/${issueKey}/comment`);
    const options = {
      method: "POST",
      auth: `${process.env.JIRA_EMAIL}:${process.env.JIRA_TOKEN}`,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data),
      },
    };
    const req = https.request(url, options, (res) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        resolve();
      } else {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => reject(new Error(`Jira response ${res.statusCode}: ${body}`)));
      }
    });
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

(async () => {
  const jiraKeys = collectJiraKeys(FEATURES_DIR);
  console.log("🔑 Claves Jira encontradas:", jiraKeys);

  if (!jiraKeys.length) {
    console.log("No Jira tags found");
    return;
  }

  const commentBody = {
    body: {
      type: "doc",
      version: 1,
      content: [
        {
          type: "paragraph",
          content: [
            {
              text:
                `✅ Tests automatizados ejecutados (Products)\n\n` +
                `📊 Reporte Allure: ${RESULTS_URL}\n` +
                `🔁 Ejecución: GitHub Actions (#${process.env.GITHUB_RUN_NUMBER})\n\n` +
                `_Comentario generado automáticamente por el pipeline de QA._`,
              type: "text",
            },
          ],
        },
      ],
    },
  };

  for (const key of jiraKeys) {
    try {
      await addComment(key, commentBody);
      console.log(`✔ Comentario agregado a ${key}`);
    } catch (e) {
      console.warn(`⚠ No se pudo comentar en ${key}: ${e.message}`);
    }
  }
})();
