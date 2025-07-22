// comment-to-jira.js
//script de prueba para comentar en jira, pero sin features hardcodeadas.

import fs from "fs";
import path from "path";
import https from "https";

const epicArg = process.argv[2]; // ← argumento por línea de comandos

if (!epicArg) {
  console.error("❌ Debes pasar la épica a testear. Ej: node comment-to-jira.js login");
  process.exit(1);
}

const FEATURES_DIR = `cypress/e2e/features/${epicArg}`;
const runId = process.env.GITHUB_RUN_ID;
const allureReportUrl = `https://rulycisnero.github.io/cypress-automationExercise/${epicArg}/history/${runId}/index.html`;
//const RESULTS_URL = `https://rulycisnero.github.io/cypress-automationExercise/${epicArg}/`;
//const runId = process.env.GITHUB_RUN_ID || `run-${Date.now()}`;

// Función para convertir runId a fecha
function formatRunId(id) {
  const parts = id.split("-");
  const timestamp = parts[parts.length - 1];
  const date = new Date(parseInt(timestamp));
  if (isNaN(date.getTime())) return id;
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

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
    console.log("❌ No se encontraron tags @JIRA en la carpeta:", FEATURES_DIR);
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
                `✅ Tests automatizados ejecutados (${epicArg})\n\n` +
                `📊 Reporte Allure: ${allureReportUrl}\n` +
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
