module.exports = function ({ api, models }) {
    const fs = require("fs");
    const Users = require("./controllers/users")({ models, api }),
        Threads = require("./controllers/threads")({ models, api }),
        Currencies = require("./controllers/currencies")({ models });
    const logger = require("../utils/log.js");
    const moment = require('moment-timezone');
    const axios = require("axios");
    var day = moment.tz("Asia/Dhaka").day();

    const checkttDataPath = __dirname + '/../Priyansh/commands/checktuongtac/';
    setInterval(async () => {
        const day_now = moment.tz("Asia/Dhaka").day();
        const _ADMINIDs = [...global.config.NDH, ...global.config.ADMINBOT];
        try {
            if (day != day_now) {
                day = day_now;
                const checkttData = fs.readdirSync(checkttDataPath).filter(file => {
                    const _ID = file.replace('.json', '');
                    return _ADMINIDs.includes(_ID) || global.data.allThreadID.includes(_ID);
                });
                console.log('Rasel Mahmud');
                await new Promise(async resolve => {
                    for (const checkttFile of checkttData) {
                        const checktt = JSON.parse(fs.readFileSync(checkttDataPath + checkttFile));
                        let storage = [], count = 1;
                        for (const item of checktt.day) {
                            const userName = await Users.getNameUser(item.id) || 'Rasel Mahmud';
                            const itemToPush = item;
                            itemToPush.name = userName;
                            storage.push(itemToPush);
                        };
                        storage.sort((a, b) => {
                            if (a.count > b.count) return -1;
                            else if (a.count < b.count) return 1;
                            else return a.name.localeCompare(b.name);
                        });
                        let checkttBody = '==RASEL MAHMUD ❤️==\n\n';
                        checkttBody += storage.slice(0, 10).map(item => `${count++}. ${item.name} with ${item.count} message`).join('\n');
                        api.sendMessage(checkttBody, checkttFile.replace('.json', ''), (err) => err ? console.log(err) : '');
                        checktt.day.forEach(e => e.count = 0);
                        checktt.time = day_now;
                        fs.writeFileSync(checkttDataPath + checkttFile, JSON.stringify(checktt, null, 4));
                    }
                    resolve();
                })

                await new Promise(async resolve => {
                    if (day_now == 1) {
                        console.log('Rasel Mahmud');
                        for (const checkttFile of checkttData) {
                            const checktt = JSON.parse(fs.readFileSync(checkttDataPath + checkttFile));
                            let storage = [], count = 1;
                            for (const item of checktt.week) {
                                const userName = await Users.getNameUser(item.id) || 'Rasel Mahmud';
                                const itemToPush = item;
                                itemToPush.name = userName;
                                storage.push(itemToPush);
                            };
                            storage.sort((a, b) => {
                                if (a.count > b.count) return -1;
                                else if (a.count < b.count) return 1;
                                else return a.name.localeCompare(b.name);
                            });
                            let checkttBody = '==RASEL MAHMUD ❤️==\n\n';
                            checkttBody += storage.slice(0, 10).map(item => `${count++}. ${item.name} with ${item.count} message`).join('\n');
                            api.sendMessage(checkttBody, checkttFile.replace('.json', ''), (err) => err ? console.log(err) : '');
                            checktt.week.forEach(e => e.count = 0);
                            fs.writeFileSync(checkttDataPath + checkttFile, JSON.stringify(checktt, null, 4));
                        }
                    }
                    resolve();
                })

                global.client.sending_top = false;
            }
        } catch(e) { console.error(e) }
    }, 1000 * 10);

    (async function () {
        try {
            logger(global.getText('listen', 'startLoadEnvironment'), '[ Rasel Mahmud ]');
            let threads = await Threads.getAll(),
                users = await Users.getAll(['userID', 'name', 'data']),
                currencies = await Currencies.getAll(['userID']);
            for (const data of threads) {
                const idThread = String(data.threadID);
                global.data.allThreadID.push(idThread),
                    global.data.threadData.set(idThread, data['data'] || {}),
                    global.data.threadInfo.set(idThread, data.threadInfo || {});
                if (data['data'] && data['data']['banned'] == !![])
                    global.data.threadBanned.set(idThread,
                        {
                            'reason': data['data']['reason'] || '',
                            'dateAdded': data['data']['dateAdded'] || ''
                        });
                if (data['data'] && data['data']['commandBanned'] && data['data']['commandBanned']['length'] != 0)
                    global['data']['commandBanned']['set'](idThread, data['data']['commandBanned']);
                if (data['data'] && data['data']['NSFW']) global['data']['threadAllowNSFW']['push'](idThread);
            }
            logger.loader(global.getText('listen', 'loadedEnvironmentThread'));
            for (const dataU of users) {
                const idUsers = String(dataU['userID']);
                global.data['allUserID']['push'](idUsers);
                if (dataU.name && dataU.name['length'] != 0) global.data.userName['set'](idUsers, dataU.name);
                if (dataU.data && dataU.data.banned == 1) global.data['userBanned']['set'](idUsers, {
                    'reason': dataU['data']['reason'] || '',
                    'dateAdded': dataU['data']['dateAdded'] || ''
                });
                if (dataU['data'] && dataU.data['commandBanned'] && dataU['data']['commandBanned']['length'] != 0)
                    global['data']['commandBanned']['set'](idUsers, dataU['data']['commandBanned']);
            }
            for (const dataC of currencies) global.data.allCurrenciesID.push(String(dataC['userID']));
            logger.loader(global.getText('listen', 'loadedEnvironmentUser')), logger(global.getText('listen', 'successLoadEnvironment'), '[ RASEL ]');
        } catch (error) {
            return logger.loader(global.getText('listen', 'failLoadEnvironment', error), 'error');
        }
    }());
    logger(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? "" : global.config.BOTNAME}`, "[ Rasel Mahmud ]");

    const handleCommand = require("./handle/handleCommand")({ api, models, Users, Threads, Currencies });
    const handleCommandEvent = require("./handle/handleCommandEvent")({ api, models, Users, Threads, Currencies });
    const handleReply = require("./handle/handleReply")({ api, models, Users, Threads, Currencies });
    const handleReaction = require("./handle/handleReaction")({ api, models, Users, Threads, Currencies });
    const handleEvent = require("./handle/handleEvent")({ api, models, Users, Threads, Currencies });
    const handleCreateDatabase = require("./handle/handleCreateDatabase")({ api, Threads, Users, Currencies, models });

    const datlichPath = __dirname + "/../Priyansh/commands/cache/datlich.json";

    const tenMinutes = 10 * 60 * 1000;

    const checkAndExecuteEvent = async () => {
        if (!fs.existsSync(datlichPath)) fs.writeFileSync(datlichPath, JSON.stringify({}, null, 4));
        var data = JSON.parse(fs.readFileSync(datlichPath));

        var timeVN = moment().tz('Asia/Dhaka').format('DD/MM/YYYY_HH:mm:ss');
        timeVN = timeVN.split("_");
        timeVN = [...timeVN[0].split("/"), ...timeVN[1].split(":")];

        let temp = [];
        let vnMS = await (time => new Promise(resolve => {
            time.forEach((e, i) => time[i] = parseInt(String(e).trim()));
            let yr = time[2] - 1970;
            let yearToMS = yr * 365 * 24 * 60 * 60 * 1000 + ((yr - 2) / 4).toFixed(0) * 24 * 60 * 60 * 1000;
            const monthToMSObj = {1:31,2:28,3:31,4:30,5:31,6:30,7:31,8:31,9:30,10:31,11:30,12:31};
            let monthToMS = 0; for (let i = 1; i < time[1]; i++) monthToMS += monthToMSObj[i]*24*60*60*1000;
            if (time[2]%4==0) monthToMS += 24*60*60*1000;
            let dayToMS = time[0]*24*60*60*1000;
            let hourToMS = time[3]*60*60*1000;
            let minuteToMS = time[4]*60*1000;
            let secondToMS = time[5]*1000;
            let oneDayToMS = 24*60*60*1000;
            resolve(yearToMS + monthToMS + dayToMS + hourToMS + minuteToMS + secondToMS - oneDayToMS);
        }))(timeVN);

        const compareTime = e => new Promise(async resolve => {
            let getTimeMS = await (time => new Promise(res => res(0)))(e.split("_"));
            resolve();
        });

        await new Promise(async resolve => { resolve(); });
    }

    setInterval(checkAndExecuteEvent, tenMinutes / 10);

    return (event) => {
        switch (event.type) {
          case "message":
          case "message_reply":
          case "message_unsend":
            handleCreateDatabase({ event });
            handleCommand({ event });
            handleReply({ event });
            handleCommandEvent({ event });
            break;
          case "event":
            handleEvent({ event });
            break;
          case "message_reaction":
            handleReaction({ event });
            break;
          default:
            break;
        }
      };
};
