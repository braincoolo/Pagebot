const Discord = require('discord.js')
const bot = new Discord.Client()
const client = new Discord.Client()
const config = require('./config.json');
const { send } = require('process');
const { getPokemon } = require('./pokemon.js');
const userCreatedPolls = new Map();
const search = require('youtube-search');
const duckduckgoimagesapi = require("duckduckgo-images-api");
const opts = {
    maxResults: 25,
    key: config.youtube_api,
    type: 'video'
};
 
client.on('ready', () => {
    console.log("gay")
 
});
 
 
 
//I Thank the Gods at TCD for this Fix
client.on('ready', async () => {
    let generalChannel = await client.channels.fetch('747126374900301988');
 
    if (generalChannel)
        generalChannel.send(' kjALLAH SOURIYA BASHAR');
});
 
client.on('ready', () => {
    // List servers the bot is connected to
    console.log("Servers:")
    client.guilds.cache.forEach((guild) => {
        console.log(" - " + guild.name)
 
        // List all channels
        guild.channels.cache.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        })
    })
})
 
client.on('messageDelete', message => {
    let embed = new Discord.MessageEmbed() 
        .setTitle("Someone deleted his message!")
        .setDescription(`The user ${message.author} deleted a message in <#${message.channel.id}>`)
        .addField(`Content`, message.content,true)
 
        let channel = client.channels.cache.get('873564198142087218')
 
 
    if (!channel) return;
    channel.send(embed)
  })
 
client.on('message', async message => {
 
    if (message.content === config.prefix + 'ping') {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is __${m.createdTimestamp - message.createdTimestamp}ms__. API Latency is __${Math.round(client.ws.ping)}__ ms`);
      }
    }
)
 
client.on('message', async message => {
 
    if (message.content === config.prefix + "uptime") {
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;
 
        message.channel.send(`__Uptime:__\n${days}d ${hours}h ${minutes}m ${seconds}s`);
    }
}) 
 
 
 
client.on("message", async message => {
 
  if(message.author.bot) return;
 
  if(!message.content.startsWith(config.prefix)) return;
 
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
 
  if (cmd === "say") {
      if (message.deletable) message.delete();
 
      if (args.length < 1)
          return message.reply("Nothing to say!").then(m => m.delete(5000))
 
 
      const embed = new Discord.MessageEmbed()
          .setColor("#ffed5c")
          .setTitle('Someone said something!')
          .setDescription(args.slice(0).join(" "))
          .setTimestamp()
          .setFooter(message.member.user.tag, client.user.avatarURL)
 
      message.channel.send(embed);
 
}
  });
 
 
client.on('message', message => {
 
if (message.content === config.prefix + "emojis"){
    let Emojis = "";
    let EmojisAnimated = "";
    let EmojiCount = 0;
    let Animated = 0;
    let OverallEmojis = 0;
    function Emoji(id) {
      bot.emojis.cache.get(id);
 
    }
    message.guild.emojis.cache.forEach((emoji) => {
      OverallEmojis++;
      if (emoji.animated) {
        Animated++;
        EmojisAnimated + Emoji(emoji.id);
      } else {
        EmojiCount++;
        Emojis + Emoji(emoji.id);
      }
    });
    let Embed = new Discord.MessageEmbed()
      .setTitle(`Emojis in ${message.guild.name}.`)
      .setDescription(
        `**Animated [${Animated}]**:\n${EmojisAnimated}\n\n**Standard [${EmojiCount}]**:\n${Emojis}\n\n**Over all emojis [${OverallEmojis}]**`
      )
      .setColor(`RANDOM`);
    message.channel.send(Embed);
  } 
});
 
 
client.on('message', message => {
 
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
 
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
 
    if (command === 'rps') {
        const acceptedReplies = ['rock', 'paper', 'scissors'];
        const random = Math.floor((Math.random() * acceptedReplies.length));
        const result = acceptedReplies[random];
 
        const choice = args[0];
        if (!choice) return message.channel.send(`How to play: \`${config.prefix}rps <rock|paper|scissors>\``);
        if (!acceptedReplies.includes(choice)) return message.channel.send(`Only these responses are accepted: \`${acceptedReplies.join(', ')}\``);
 
        console.log('Bot Result:', result);
        if (result === choice) return message.reply("It's a tie! We had the same choice.");
 
        switch (choice) {
            case 'rock': {
                if (result === 'paper') return message.reply('I won!');
                else return message.reply('You won!');
            }
            case 'paper': {
                if (result === 'scissors') return message.reply('I won!');
                else return message.reply('You won!');        
            }
            case 'scissors': {
                if (result === 'rock') return message.reply('I won!');
                else return message.reply('You won!');
            }
            default: {
                return message.channel.send(`Only these responses are accepted: \`${acceptedReplies.join(', ')}\``);
            }
        }
    }
});
 
client.on('message', message => {
  if(message.author.bot) return;
  console.log(message.mentions);
  if(message.content.toLowerCase().startsWith('page!stats')) {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    console.log(args);
    if(args.length > 2) {
      message.channel.send(`Incorrect Usage: page!stats | page!stats <user_id> | page!stats @mention`);
    } else if(args.length === 2) {
      const member = message.mentions.members.size === 1 ? 
        message.mentions.members.first() :
        message.guild.members.cache.get(args[1]);
      if(member) {
        const embed = new Discord.MessageEmbed()
          .setAuthor(`${member.user.tag} (${member.id})`, member.user.displayAvatarURL())
          .setThumbnail(member.user.displayAvatarURL())
          .addField('Created On', member.user.createdAt.toLocaleString(), true)
          .addField('Joined On', member.joinedAt, true)
          .addField('Kickable', member.kickable, false)
          .addField('Voice Channel', member.voice.channel ? member.voice.channel.name + `(${member.voice.channel.id})` : 'None')
          .addField('Presence', member.presence.status)
          .setDescription(`${member.roles.cache.map(role => role.toString()).join(' ')}`);
        message.channel.send(embed);
      } else {
        message.channel.send(`I couldn't find that member with ID ${args[1]}`);
      }
    }}});
 
 
    client.on('message', async message => {
      if(message.author.bot) return;
      if(message.content.toLowerCase().startsWith('page!pokemon')) {
          const pokemon = message.content.toLowerCase().split(" ")[1];
          try {
              const pokeData = await getPokemon(pokemon);
              const { 
                  sprites, 
                  stats, 
                  weight, 
                  name, 
                  id, 
                  base_experience,
                  abilities,
                  types
              } = pokeData;
              const embed = new Discord.MessageEmbed();
              embed.setTitle(`${name} #${id}`)
              embed.setThumbnail(`${sprites.front_default}`);
              stats.forEach(stat => embed.addField(stat.stat.name, stat.base_stat, true));
              types.forEach(type => embed.addField('Type', type.type.name, true));
              embed.addField('Weight', weight);
              embed.addField('Base Experience', base_experience);
              embed.setColor(`RANDOM`)
              message.channel.send(embed);
          }
          catch(err) {
              console.log(err);
              message.channel.send(`Pokemon ${pokemon} does not exist.`);
          }
      }
  });
   client.on('message', async message => {
    if(message.author.bot) return;

    if(message.content.toLowerCase() === 'ppage!search') {
        let embed = new Discord.MessageEmbed()
            .setColor("#73ffdc")
            .setDescription("Please enter a search query. Remember to narrow down your search.")
            .setTitle("YouTube Search API");
        let embedMsg = await message.channel.send(embed);
        let filter = m => m.author.id === message.author.id;
        let query = await message.channel.awaitMessages(filter, { max: 1 });
        let results = await search(query.first().content, opts).catch(err => console.log(err));
        if(results) {
            let youtubeResults = results.results;
            let i  =0;
            let titles = youtubeResults.map(result => {
                i++;
                return i + ") " + result.title;
            });
            console.log(titles);
            message.channel.send({
                embed: {
                    title: 'Select which song you want by typing the number',
                    description: titles.join("\n")
                }
            }).catch(err => console.log(err));
            
            filter = m => (m.author.id === message.author.id) && m.content >= 1 && m.content <= youtubeResults.length;
            let collected = await message.channel.awaitMessages(filter, { max: 1 });
            let selected = youtubeResults[collected.first().content - 1];

            const embed = new Discord.MessageEmbed()
                .setTitle(`${selected.title}`)
                .setURL(`${selected.link}`)
                .setDescription(`${selected.description}`)
                .setThumbnail(`${selected.thumbnails.default.url}`);

            message.channel.send(embed);
        }
    }
});

client.on('message', message => {
  if (message.author.bot) return;
  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "imagesearch") {
    const searcharguments = args[0]
   
    duckduckgoimagesapi.image_search({query: searcharguments, moderate: true, iterations: 2}).then(results=>{
      const imageurl = results[(Math.floor(Math.random()*results.length))].image
      message.channel.send("", {
        embed: {
          title: "You are responsible for anything you search.",
          image: {
            url: imageurl,
          }
        }
      })
      .catch(console.error);
    });
  };
});  
  
client.on('message', async message => {
  if(message.author.bot) return;
  if(message.content.toLowerCase().startsWith('page!createpoll')) {
      const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
      let time = args[1];
      let question = args.slice(1).join(" ");
          const embed = new Discord.MessageEmbed()
              .setTitle(`Question : ${question}`)
              .setDescription('React with 👍 or 👎 or 🖐️')
              .setTimestamp()
              .setColor(`RANDOM`);
          try {
              const polls = new Map();
              const userVotes = new Map();
              let filter = (reaction, user) => {
                  if(user.bot) return false;
                  if(['👍', '👎'].includes(reaction.emoji.name)) {
                      if(polls.get(reaction.message.id).get(user.id))
                          return false;
                      else {
                          userVotes.set(user.id, reaction.emoji.name);
                          return true;
                      }
                  }
              }
              let msg = await message.channel.send(embed);
              await msg.react('👍');
              await msg.react('👎');
              await msg.react('🖐️')
              polls.set(msg.id, userVotes);
              let reactions = await msg.awaitReactions
              let thumbsUp = reactions.get('👍');
              let thumbsDown = reactions.get('👎');
              let neutral = reactions.get('🖐️')
              let thumbsUpResults = 0, thumbsDownResults = 0, neutralResults = 0;
              if(thumbsUp)
                  thumbsUpResults = thumbsUp.users.cache.filter(u => !u.bot).size;
              if(thumbsDown)
                  thumbsDownResults = thumbsDown.users.cache.filter(u => !u.bot).size;
              if(neutral)
                  neutralResults = neutral.users.cache.filter(u => !u.bot).size;
              const resultsEmbed = new Discord.MessageEmbed()
                  .setTitle('Results')
                  .setDescription(`👍 - ${thumbsUpResults} votes\n\n👎 - ${thumbsDownResults} votes\n\n🖐️ - ${neutralResults}`);
              await message.channel.send(resultsEmbed);
          }
          catch(err) {
              console.log(err);
          }
      }
  }
);

 
client.login(config.token)