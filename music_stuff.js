import Discord from 'discord.js';
const {
    prefix,
    token,
} = require('./config.json');
const ytdl = require('ytdl-core');
const client = new Discord.Client();
client.login(token);
