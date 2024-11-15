const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0QrcjNuY2t3VlNxSWpYYjRUUEw3UnhsZHptNjFwd2xvZGNWTzBMY2kwOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0Yrelp4aE42Y1V1OVhzR1RJa3Qvd1NablYyNEh3RTN1bVFOVFBhWkhRTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQzJ2N3ViS1Vpc1hvRllDWndTd1hiTjZnRkZHZGpRcHdPaTZ1ZGdEUFY4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBN2lKTVVUNE5ONDM2U0F0Zkg2S3dnS3NLUTNDVmlUaWp6TGUvV013YVFzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNHdGlVUi9YSnBRU1NIZjgzMmh6ODArZWJPUDd0Ykl6S3VkV1V5TXRpSDA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImkxZFY2bkRLZjRybDFqV0dmc1ZLZzdwYW1hemxFdHg4NFVEWVJsckEvVms9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0pHbmp1N0NWRk5qYUlFTWZhTytuQzZDOE15dzRSQlNXRXYzWHZyc1Ewaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNTh4VHpCbUFpQmtTbXhJUFBPVEpTbHZMUGxSYkF5dHNDcFhBSDJrQW16WT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZlM3pmVnhabFd4L3BBd2Y3dmV0UGlZWDVQY0t0dTJIRjJOU2tEakpYeXJwVUJGSm5zc3JQTVhVRjZMdFQrM3JPZXRTd1p6RkQ3dXR4aC9rdEFHV2d3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzEsImFkdlNlY3JldEtleSI6IkVFYnBLRkxSZ3VFNHJlOXd0ZmtDWVhpMnYxOWRydEdCalhJQXVKQnVtUnM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImU3eXdBZmxqVGlHd3RlRy1kTDBkQ1EiLCJwaG9uZUlkIjoiYjczMTU3ZmItZTFlOC00NTljLWE1MmEtODY3NWE5MTIyNjNmIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9MVVM5dzNlbFVXaGpkc01tc0tTSXkxdmRKTT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnL1JvUHlNbVlvajdiVkgvNHpzYys3RFRIZTg9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRERCQVlCUlQiLCJtZSI6eyJpZCI6IjQwNzcwODExOTI5OjM1QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNML0crYVFIRUlHVTNya0dHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJweWpac1NlZGl1Tll4SjVvd2M1b2dqV25sWGZWbWpJUnBsUWQzVXhoOHdJPSIsImFjY291bnRTaWduYXR1cmUiOiJ5cUhMczN0WUtDaEhWbHRxeHdyTno2c2NFTnlaNmpBYUdEVExTRUZObWF6N2diblN1TVFMQ3VRbGNodTl1M28rcFV2blhMeE10S3pPdHF2SVJwZTZCZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiNG1TaFFYL3A3bDE1TitycEFrMmxEZktRQXZwQ2FXSEQ2Z29kVUZqMWV1ZGQ2dzlLVFhmWEZhN3M5RytjbWFkUHg5QjNEdXNvVk5mdkY0NlRIOUk5anc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI0MDc3MDgxMTkyOTozNUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJhY28yYkVubllyaldNU2VhTUhPYUlJMXA1VjMxWm95RWFaVUhkMU1ZZk1DIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMxNjkzMDcwLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUc3bSJ9',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "0770811929",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
