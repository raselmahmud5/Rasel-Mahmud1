const fs = require("fs");
const path = require("path");

function loadLang(langCode = "Bd") {
  try {
    const filePath = path.join(__dirname, `${langCode}.lang`);
    const data = fs.readFileSync(filePath, "utf-8");
    const lines = data.split("\n");
    const langObj = {};

    for (const line of lines) {
      if (!line.includes("=") || line.trim().startsWith("#")) continue;
      const [key, ...val] = line.split("=");
      langObj[key.trim()] = val.join("=").trim();
    }

    return langObj;
  } catch (err) {
    console.error(`⚠️ Language file loading failed for ${langCode}:`, err.message);
    return {};
  }
}

module.exports = loadLang;
