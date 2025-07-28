const fs = require("fs");
const path = require("path");
const axios = require("axios");

const config = require("./config.json");
const logger = require("./utils/log");

const PREFIX = config.PREFIX || "*";

// Fake API simulation
function handleCommand(message, senderID, threadID) {
  const content = message.toLowerCase();

  // Auto replies from config
  if (config.autoReplyRules.enable) {
    for (const keyword in config.autoReplyRules.keywords) {
      if (content.includes(keyword.toLowerCase())) {
        return sendMessage(config.autoReplyRules.keywords[keyword], threadID);
      }
    }
  }

  // Default unknown command response
  if (content.startsWith(PREFIX)) {
    return sendMessage("❓ আমি বুঝতে পারলাম না, সাহায্যের জন্য *help লিখো", threadID);
  }
}

// Fake send message function (replace with actual Messenger API)
function sendMessage(message, threadID) {
  logger(`📤 Sent to ${threadID}: ${message}`, "[ Bot ]");
}

// Fake message listener simulation (replace with actual Messenger API logic)
function listenToMessages() {
  logger("📩 Listening to incoming messages...", "[ Bot ]");

  setInterval(() => {
    // Simulate a message
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
  }, 10000); // প্রতি 10 সেকেন্ডে টেস্ট মেসেজ
}

// Start the bot
function start() {
  logger(`✅ Bot "${config.BOTNAME}" চালু হয়েছে`, "[ Start ]");
  listenToMessages();
}

start();
