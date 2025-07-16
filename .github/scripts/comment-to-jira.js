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
            //const matches = content.match(/@JIRA:([A-Z]+-\d+)/g) || [];
            //matches.forEach((tag) => keys.add(tag.split(":")[1]));
            const matches = content.match(/@JIRA:([A-Z]+-\d+)/g) || [];
            matches.forEach((tag) => keys.add(tag.split(":")[1])); // --> ["SCRUM-7"]
        }
    });
    return [...keys];
}

function addComment(issueKey, body) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({ body })/*  */;
        const url = new URL(`${process.env.JIRA_BASE_URL}/rest/api/3/issue/${issueKey}/comment`);
        const options = {
            method: "POST",
            auth: `${process.env.JIRA_EMAIL}:${process.env.JIRA_TOKEN}`,
            headers: {
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

(async () => {
    const jiraKeys = collectJiraKeys(FEATURES_DIR);
    console.log("🔑 Claves Jira encontradas:", jiraKeys);
    if (!jiraKeys.length) {
        console.log("No Jira tags found");
        return;
    }

    const comment = `
✅ Tests automatizados ejecutados (Products)

📊 **Reporte Allure:** ${RESULTS_URL}
🔁 Ejecución: GitHub Actions (#${process.env.GITHUB_RUN_NUMBER})

_Comentario generado automáticamente por el pipeline de QA._
`;

    for (const key of jiraKeys) {
        try {
            await addComment(key, comment);
            console.log(`✔ Comentario agregado a ${key}`);
        } catch (e) {
            console.warn(`⚠ No se pudo comentar en ${key}: ${e.message}`);
        }
    }
})();
