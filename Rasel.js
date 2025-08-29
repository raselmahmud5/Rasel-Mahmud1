const moment = require("moment-timezone");
const { readdirSync, readFileSync, writeFileSync, existsSync, unlinkSync } = require("fs-extra");
const { join, resolve } = require("path");
const { execSync } = require('child_process');
const logger = require("./utils/log.js");
const login = require("fca-priyansh"); 
const axios = require("axios");
const listPackage = JSON.parse(readFileSync('./package.json')).dependencies;
const listbuiltinModules = require("module").builtinModules;

global.client = {
    commands: new Map(),
    events: new Map(),
    cooldowns: new Map(),
    eventRegistered: [],
    handleSchedule: [],
    handleReaction: [],
    handleReply: [],
    mainPath: process.cwd(),
    configPath: "",
    getTime: function(option) {
        switch(option) {
            case "seconds": return `${moment.tz("Asia/Dhaka").format("ss")}`;
            case "minutes": return `${moment.tz("Asia/Dhaka").format("mm")}`;
            case "hours": return `${moment.tz("Asia/Dhaka").format("HH")}`;
            case "date": return `${moment.tz("Asia/Dhaka").format("DD")}`;
            case "month": return `${moment.tz("Asia/Dhaka").format("MM")}`;
            case "year": return `${moment.tz("Asia/Dhaka").format("YYYY")}`;
            case "fullHour": return `${moment.tz("Asia/Dhaka").format("HH:mm:ss")}`;
            case "fullYear": return `${moment.tz("Asia/Dhaka").format("DD/MM/YYYY")}`;
            case "fullTime": return `${moment.tz("Asia/Dhaka").format("HH:mm:ss DD/MM/YYYY")}`;
        }
    }
};

global.data = {
    threadInfo: new Map(),
    threadData: new Map(),
    userName: new Map(),
    userBanned: new Map(),
    threadBanned: new Map(),
    commandBanned: new Map(),
    threadAllowNSFW: [],
    allUserID: [],
    allCurrenciesID: [],
    allThreadID: []
};

global.utils = require("./utils");
global.nodemodule = {};
global.config = {};
global.configModule = {};
global.moduleData = [];
global.language = {};

//========= Load Config =========//
try {
    global.client.configPath = join(global.client.mainPath, "config.json");
    var configValue = require(global.client.configPath);
    logger.loader("Found file config: config.json");
} catch {
    if (existsSync(global.client.configPath.replace(/\.json/g,"") + ".temp")) {
        configValue = JSON.parse(readFileSync(global.client.configPath.replace(/\.json/g,"") + ".temp"));
        logger.loader(`Found: ${global.client.configPath.replace(/\.json/g,"") + ".temp"}`);
    } else return logger.loader("config.json not found!", "error");
}

try {
    for(const key in configValue) global.config[key] = configValue[key];
    logger.loader("Config Loaded!");
} catch { return logger.loader("Can't load file config!", "error"); }

//========= Write temp config =========//
writeFileSync(global.client.configPath + ".temp", JSON.stringify(global.config, null, 4), 'utf8');

//========= Load Language =========//
const langFile = readFileSync(join(__dirname, "languages", global.config.language || "en" + ".lang"), "utf-8").split(/\r?\n|\r/);
const langData = langFile.filter(line => line && line.indexOf("#") !== 0);
for(const item of langData) {
    const sep = item.indexOf("=");
    const keyFull = item.slice(0, sep);
    const value = item.slice(sep + 1).replace(/\\n/g,"\n");
    const head = keyFull.slice(0, keyFull.indexOf("."));
    const key = keyFull.replace(head + ".", "");
    if(!global.language[head]) global.language[head] = {};
    global.language[head][key] = value;
}

global.getText = function(...args) {
    const langText = global.language;
    if(!langText.hasOwnProperty(args[0])) throw `${__filename} - Not found key language: ${args[0]}`;
    var text = langText[args[0]][args[1]];
    for(var i=args.length-1; i>0; i--) text = text.replace(new RegExp(`%${i}`, "g"), args[i+1]);
    return text;
}

//========= Load AppState =========//
let appStateFile;
let appState;
try {
    appStateFile = resolve(join(global.client.mainPath, global.config.APPSTATEPATH || "appstate.json"));
    appState = require(appStateFile);
    logger.loader(global.getText("RASEL","foundPathAppstate"));
} catch {
    return logger.loader(global.getText("RASEL","notFoundPathAppstate"), "error");
}

//========= Bot Login & Start =========//
async function onBot({ models }) {
    const loginData = { appState };
    login(loginData, async (err, api) => {
        if(err) return logger(JSON.stringify(err), "error");
        api.setOptions(global.config.FCAOption);
        writeFileSync(appStateFile, JSON.stringify(api.getAppState(), null, 4));
        global.client.api = api;
        global.client.timeStart = Date.now();
        global.config.version = "1.2.14";

        //========= Load Commands =========//
        const commandFiles = readdirSync(join(global.client.mainPath, "Script/commands")).filter(f=>f.endsWith(".js"));
        for(const cmd of commandFiles) {
            try {
                const module = require(join(global.client.mainPath,"Script/commands", cmd));
                if(!module.config || !module.run || !module.config.commandCategory) throw new Error(global.getText("RASEL","errorFormat"));
                global.client.commands.set(module.config.name, module);
                logger.loader(global.getText("RASEL","successLoadModule", module.config.name));
            } catch(err) {
                logger.loader(global.getText("RASEL","failLoadModule", cmd, err), "error");
            }
        }

        //========= Load Events =========//
        const eventFiles = readdirSync(join(global.client.mainPath, "Script/events")).filter(f=>f.endsWith(".js"));
        for(const ev of eventFiles) {
            try {
                const module = require(join(global.client.mainPath,"Script/events", ev));
                if(!module.config || !module.run) throw new Error(global.getText("RASEL","errorFormat"));
                global.client.events.set(module.config.name, module);
                logger.loader(global.getText("RASEL","successLoadModule", module.config.name));
            } catch(err) {
                logger.loader(global.getText("RASEL","failLoadModule", ev, err), "error");
            }
        }

        logger.loader(global.getText("RASEL","finishLoadModule", global.client.commands.size, global.client.events.size));

        //========= Listen Messages =========//
        const listener = require('./includes/listen')({ api, models });
        global.handleListen = api.listenMqtt((err, message) => {
            if(err) return logger(global.getText("RASEL","handleListenError", JSON.stringify(err)), "error");
            if(["presence","typ","read_receipt"].includes(message.type)) return;
            return listener(message);
        });
    });
}

//========= Database Connect =========//
(async () => {
    const { Sequelize, sequelize } = require("./includes/database");
    try {
        await sequelize.authenticate();
        const models = require('./includes/database/model')({ Sequelize, sequelize });
        logger(global.getText("RASEL","successConnectDatabase"), "[ DATABASE ]");
        onBot({ models });
    } catch(err) {
        logger(global.getText("RASEL","successConnectDatabase", JSON.stringify(err)), "[ DATABASE ]");
    }
})();

process.on('unhandledRejection', (err, p) => {});
