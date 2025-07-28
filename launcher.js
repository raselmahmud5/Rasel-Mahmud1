const { spawn } = require("child_process");
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", function (_, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

let botProcess;
let retryCount = 0;
const maxRetries = 5;

function launchBot() {
  botProcess = spawn("node", ["RASEL.js"], { stdio: "inherit" });

  botProcess.on("close", (code) => {
    console.log(`Bot exited with code ${code}`);
    if (retryCount < maxRetries) {
      retryCount++;
      console.log(`Restarting bot (${retryCount}/${maxRetries})...`);
      launchBot();
    } else {
      console.log("Max retries reached. Bot not restarted.");
    }
  });
}

launchBot();
