import fs from "fs";
import path from "path";
import axios from "axios";
import config from "./config.json" assert { type: "json" };
import logger from "./utils/log.js";

const PREFIX = config.PREFIX || "*";

function handleCommand(message, senderID, threadID) {
  const content = message.toLowerCase();

  if (config.autoReplyRules.enable) {
    for (const keyword in config.autoReplyRules.keywords) {
      if (content.includes(keyword.toLowerCase())) {
        return sendMessage(config.autoReplyRules.keywords[keyword], threadID);
      }
    }
  }

  if (content.startsWith(PREFIX)) {
    return sendMessage("❓ আমি বুঝতে পারলাম না, সাহায্যের জন্য *help লিখো", threadID);
  }
}

function sendMessage(message, threadID) {
  logger(`📤 Sent to ${threadID}: ${message}`, "[ Bot ]");
}

function listenToMessages() {
  logger("📩 Listening to incoming messages...", "[ Bot ]");

  setInterval(() => {
    const sampleMessage = {
      body: "hello",
      senderID: config.OWNER_UID[0],
      threadID: "123456"
    };

    logger(`💬 New Message: ${sampleMessage.body}`, "[ Message ]");

    if (config.adminOnly && !config.ADMINBOT.includes(sampleMessage.senderID)) {
      return sendMessage("⛔️ এই বট শুধুমাত্র অ্যাডমিনদের জন্য!", sampleMessage.threadID);
    }
import fs from "fs";
import path from "path";
import axios from "axios";
import config from "./config.json" assert { type: "json" };
import logger from "./utils/log.js";

const PREFIX = config.PREFIX || "*";

function handleCommand(message, senderID, threadID) {
  const content = message.toLowerCase();

  if (config.autoReplyRules.enable) {
    for (const keyword in config.autoReplyRules.keywords) {
      if (content.includes(keyword.toLowerCase())) {
        return sendMessage(config.autoReplyRules.keywords[keyword], threadID);
      }
    }
  }

  if (content.startsWith(PREFIX)) {
    return sendMessage("❓ আমি বুঝতে পারলাম না, সাহায্যের জন্য *help লিখো", threadID);
  }
}

function sendMessage(message, threadID) {
  logger(`📤 Sent to ${threadID}: ${message}`, "[ Bot ]");
}

function listenToMessages() {
  logger("📩 Listening to incoming messages...", "[ Bot ]");

  setInterval(() => {
    const sampleMessage = {
      body: "hello",
      senderID: config.OWNER_UID[0],
      threadID: "123456"
    };

    logger(`💬 New Message: ${sampleMessage.body}`, "[ Message ]");

    if (config.adminOnly && !config.ADMINBOT.includes(sampleMessage.senderID)) {
      return sendMessage("⛔️ এই বট শুধুমাত্র অ্যাডমিনদের জন্য!", sampleMessage.threadID);
    }

    handleCommand(sampleMessage.body, sampleMessage.senderID, sampleMessage.threadID);
  }, 10000);
}

function start() {
  logger(`✅ Bot "${config.BOTNAME}" চালু হয়েছে`, "[ Start ]");
  listenToMessages();
}

start();

    handleCommand(sampleMessage.body, sampleMessage.senderID, sampleMessage.threadID);
  }, 10000);
}

functionimport fs from "fs";
import path from "path";
import axios from "axios";
import config from "./config.json" assert { type: "json" };
import logger from "./utils/log.js";

const PREFIX = config.PREFIX || "*";

function handleCommand(message, senderID, threadID) {
  const content = message.toLowerCase();

  if (config.autoReplyRules.enable) {
    for (const keyword in config.autoReplyRules.keywords) {
      if (content.includes(keyword.toLowerCase())) {
        return sendMessage(config.autoReplyRules.keywords[keyword], threadID);
      }
    }
  }

  if (content.startsWith(PREFIX)) {
    return sendMessage("❓ আমি বুঝতে পারলাম না, সাহায্যের জন্য *help লিখো", threadID);
  }
}

function sendMessage(message, threadID) {
  logger(`📤 Sent to ${threadID}: ${message}`, "[ Bot ]");
}

function listenToMessages() {
  logger("📩 Listening to incoming messages...", "[ Bot ]");

  setInterval(() => {
    const sampleMessage = {
      body: "hello",
      senderID: config.OWNER_UID[0],
      threadID: "123456"
    };

    logger(`💬 New Message: ${sampleMessage.body}`, "[ Message ]");

    if (config.adminOnly && !config.ADMINBOT.includes(sampleMessage.senderID)) {
      return sendMessage("⛔️ এই বট শুধুমাত্র অ্যাডমিনদের জন্য!", sampleMessage.threadID);
    }
import fs from "fs";
import path from "path";
import axios from "axios";
import config from "./config.json" assert { type: "json" };
import logger from "./utils/log.js";

const PREFIX = config.PREFIX || "*";

function handleCommand(message, senderID, threadID) {
  const content = message.toLowerCase();

  if (config.autoReplyRules.enable) {
    for (const keyword in config.autoReplyRules.keywords) {
      if (content.includes(keyword.toLowerCase())) {
        return sendMessage(config.autoReplyRules.keywords[keyword], threadID);
      }
    }
  }

  if (content.startsWith(PREFIX)) {
    return sendMessage("❓ আমি বুঝতে পারলাম না, সাহায্যের জন্য *help লিখো", threadID);
  }
}

function sendMessage(message, threadID) {
  logger(`📤 Sent to ${threadID}: ${message}`, "[ Bot ]");
}

function listenToMessages() {
  logger("📩 Listening to incoming messages...", "[ Bot ]");

  setInterval(() => {
    const sampleMessage = {
      body: "hello",
      senderID: config.OWNER_UID[0],
      threadID: "123456"
    };

    logger(`💬 New Message: ${sampleMessage.body}`, "[ Message ]");

    if (config.adminOnly && !config.ADMINBOT.includes(sampleMessage.senderID)) {
      return sendMessage("⛔️ এই বট শুধুমাত্র অ্যাডমিনদের জন্য!", sampleMessage.threadID);
    }

    handleCommand(sampleMessage.body, sampleMessage.senderID, sampleMessage.threadID);
  }, 10000);
}

function start() {
  logger(`✅ Bot "${config.BOTNAME}" চালু হয়েছে`, "[ Start ]");
  listenToMessages();
}

start();

    handleCommand(sampleMessage.body, sampleMessage.senderID, sampleMessage.threadID);
  }, 10000);
}

function start() {
  logger(`✅ Bot "${config.BOTNAME}" চালু হয়েছে`, "[ Start ]");
  listenToMessages();
}

start();
 start() {
  logger(`✅ Bot "${config.BOTNAME}" চালু হয়েছে`, "[ Start ]");
  listenToMessages();
}

start();
