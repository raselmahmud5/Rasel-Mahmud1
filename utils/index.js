// utils/index.js

const moment = require("moment-timezone");

// লগ মেসেজ টাইমসহ কনসোলে দেখানোর জন্য
function log(message, type = "INFO") {
  const timestamp = moment().tz("Asia/Dhaka").format("YYYY-MM-DD HH:mm:ss");
  console.log(`[${timestamp}] [${type}] ➤ ${message}`);
}

// যেকোনো array থেকে র‍্যান্ডম item আনার জন্য
function getRandomItem(array) {
  if (!Array.isArray(array) || array.length === 0) return null;
  return array[Math.floor(Math.random() * array.length)];
}

// নির্দিষ্ট সময় ডিলে করার জন্য
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  log,
  getRandomItem,
  delay
};
