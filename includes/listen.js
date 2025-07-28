const logger = require("./utils/log");
const chalk = require("chalk");
const moment = require("moment-timezone");
const login = require("fb-chat-api");
const fs = require("fs");
const path = require("path");

logger("༊✨𝐌𝐀𝐆𝐈𝐂🔹𝐎𝐅🔸𝐒𝐎𝐔𝐍𝐃✨᯾ বট চালু হচ্ছে...", "BOT");

const configPath = path.join(__dirname, "includes", "config.json");
let config = {};
if (fs.existsSync(configPath)) {
  config = JSON.parse(fs.readFileSync(configPath, "utf8"));
}

const PREFIX = config.PREFIX || "*";
const OWNER_UIDS = config.OWNER_UID || ["61571550050635", "100024220812646"];

login({ appState: JSON.parse(fs.readFileSync("appstate.json", "utf8")) }, (err, api) => {
  if (err) return logger("লগইন করতে সমস্যা হয়েছে: " + err.error || err, "ERROR");

  api.setOptions({
    listenEvents: true,
    selfListen: false,
    logLevel: "silent",
    forceLogin: true,
  });

  logger(`✅ বট চালু হয়েছে সফলভাবে!
👤 মালিক: Rasel Mahmud
🤖 বট নাম: ༊✨𝐌𝐀𝐆𝐈𝐂🔹𝐎𝐅🔸𝐒𝐎𝐔𝐍𝐃✨᯾
📅 তারিখ: ${moment().tz("Asia/Dhaka").format("YYYY-MM-DD HH:mm:ss")}
📣 Prefix: ${PREFIX}
🛡️ মালিক UID: ${OWNER_UIDS.join(", ")}
`, "READY");

  const listen = require("./includes/listen")(api, config);
  listen();
});
