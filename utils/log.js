import chalk from "chalk";

function logger(content, type = "INFO") {
  const time = new Date().toLocaleTimeString("bn-BD", { hour12: true });

  let tagColor;

  switch (type.toUpperCase()) {
    case "ERROR":
      tagColor = chalk.red;
      break;
    case "STARTING":
      tagColor = chalk.greenBright;
      break;
    case "REPO":
    case "PROFILE":
    case "UID INFO":
    case "BOT":
      tagColor = chalk.magentaBright;
      break;
    case "DEVELOPER":
      tagColor = chalk.blueBright;
      break;
    case "VERSION":
    case "NAME":
    case "DESCRIPTION":
      tagColor = chalk.yellowBright;
      break;
    case "RESTARTING":
      tagColor = chalk.cyanBright;
      break;
    case "STOPPED":
      tagColor = chalk.gray;
      break;
    default:
      tagColor = chalk.white;
  }

  console.log(chalk.gray(`[ ${time} ]`), tagColor(`[ ${type} ]`), chalk.white(content));
}

export default logger;
