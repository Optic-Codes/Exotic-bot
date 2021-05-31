const discord = require ('discord.js')
const client = new discord.Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION']})
let prefix = '.'
require ('dotenv').config;
let defaultactivity = 'Exotic Scrims'
let defaultactivityType = `STREAMING`

// extra variables
// channels
const verification = '<#833802365370499092>'
const rules = '<#823230427737227335>'


client.once('ready', ()=> {
    console.log('bot is online');
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(defaultactivity);
    console.log(`activaty set to ${defaultactivity}`);
    console.log(`the prefix was set to ${prefix}`);
});

// help commands
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.substring(prefix.length).split(` `);
    const command = args.shift().toLowerCase();
    const user = message.author;

    if (command == 'apply') {
        return message.channel.send(`Our staff application can be found in <#833802371825401856>`);
    } else if (command == 'rules') {
        return message.channel.send(`Plese read <#823230427737227335>`)
    }

    if (message.content == `${prefix}help verify`) {
        return message.channel.send(`Plese verify by reacting to the message in ${verification} and follow the steaps that younite DMs you.`)
    }
})

// avatar command
client.on('message', message => {
    let args = message.content.substring(prefix.length).split(' ');
    if (message.content.startsWith(`${prefix}av`)) {
        const prefix = require ('./index.js');
        const avitarEmbed = new discord.MessageEmbed()

        if (!message.mentions.users.first()) {
            message.channel.send('Your avatar:')
            avitarEmbed.setColor('ff0000')
            avitarEmbed.setThumbnail(message.author.displayAvatarURL())
            return message.channel.send(avitarEmbed)
        } else if (message.mentions.users.first) {
            const user = message.mentions.users.first()
            avitarEmbed.setThumbnail(user.displayAvatarURL())
            avitarEmbed.setColor('ff0000')
            avitarEmbed.setThumbnail(user.displayAvatarURL())
            return message.channel.send(avitarEmbed)
        }
    }
})

// prefix questions
client.on('message', message => {
    const args = message.content.substring(prefix.length).split(` `);
    const command = args.shift().toLowerCase();
    const user = message.author;

    if (message.content.startsWith(`whats the Exotic bot prefix`)) {
        message.channel.send(`my prefix is ${prefix}`)
        console.log(`my prefix is ${prefix}`);
    }
})



// server management
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.substring(prefix.length).split(` `);
    const command = args.shift().toLowerCase();
    const user = message.author;

    if (command == `reactionrole`) {
        client.commands.get('reactionrole').execute(message, args, discord, client);
    }
})



// moderation
// kick
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.substring(prefix.length).split(` `);
    const command = args.shift().toLowerCase();
    const commandUser = message.author;
    // if they can kick funtion
    function theyCanKick() {
        if (message.member.roles.cache.some(r => r.name == 'A1')) {
            const user = message.mentions.users.first();
            // If we have a user mentioned
            if (user) {
              // Now we get the member from the user
              const member = message.guild.member(user);
              // If the member is in the guild
              if (member) {
                member
                  .kick(`${args}`)
                  .then(() => {
                    // We let the message author know we were able to kick the person
                    message.channel.send(`Successfully kicked ${user}`);
                  })
                  .catch(err => {
                    // An error happened
                    // This is generally due to the bot not being able to kick the member,
                    // either due to missing permissions or role hierarchy
                    message.channel.send(`${message.author}, I was unable to kick the member`);
                    // Log the error
                    console.error(err);
                  });
              } else {
                // The mentioned user isn't in this guild
                message.channel.send(`${message.author}, I could not find that user in this guild.`);
              }
              // Otherwise, if no user was mentioned
            } else {
              message.channel.send(`${message.author}, you didn't mention the user to kick.`);
            }
        }
    }
    // if they cant kick funtion
    function theyCantKick() {
        message.channel.send(`${message.author}, you are not aloud to kick members.`);
    }

    // if they can ban funtion
    function theyCanBan() {
            const user = message.mentions.users.first();
            let reason = args.slice(1).join(' ')
            // If we have a user mentioned
            if (user) {
              // Now we get the member from the user
              const member = message.guild.member(user);
              // If the member is in the guild
              if (member) {
                member
                  .ban(reason)
                  .then(() => {
                    // We let the message author know we were able to ban the person
                    message.channel.send(`Successfully baned ${user}`);
                  })
                  .catch(err => {
                    // An error happened
                    // This is generally due to the bot not being able to ban the member,
                    // either due to missing permissions or role hierarchy
                    message.channel.send(`${message.author}, I was unable to ban the member`);
                    // Log the error
                    console.error(err);
                  });
              } else {
                // The mentioned user isn't in this guild
                message.channel.send(`${message.author}, I could not find that user in this guild.`);
              }
              // Otherwise, if no user was mentioned
            } else {
              message.channel.send(`${message.author}, you didn't mention the user to ban.`);
            }

    }

    // if they cant ban funtion
    function theyCantban() {
        message.channel.send(`${message.author}, you are not aloud to ban members.`);
    }

    // if they can unban funtion
    function theyCanUnban() {
        const ID = args(0)
        if (user) {
            // get the member from the ping
            const member = message.guild.member
            message.guild.unban(ID, ` ${reason}`)
        }
    }

    if (message.content.startsWith(`${prefix}kick`)) {
        if (message.member.roles.cache.some(r => r.name == 'A1')) {
            theyCanKick();
        } else if (message.member.roles.cache.some(r => r.name == 'Chat Mod')) {
            theyCanKick();
        } else if (message.member.roles.cache.some(r => r.name == 'Helper')) {
            theyCanKick();
        } else if (message.member.roles.cache.some(r => r.name == 'Administrator')) {
            theyCanKick
        } else if (message.member.roles.cache.some(r => r.name == 'Management')) {
            theyCanKick();
        } else {
            theyCantKick();
        }
      } else if (message.content.startsWith(`${prefix}ban`)) {
          if (message.member.roles.cache.some(r => r.name == 'Helper')) {
              theyCanban();
          } else if (message.member.roles.cache.some(r => r.name == 'Administrator')) {
              theyCanBan();
          } else if (message.member.roles.cache.some(r => r.name == 'Management')) {
              theyCanBan();
          } else if (message.member.roles.cache.some(r => r.name == 'A1')) {
              theyCanBan();
          } else {
              theyCantban();
          }
      }

})

client.login('ODE1MDMyMjk1ODEwNzkzNDgz.YDmf-Q.vt2e5UxsH0zrVGDLrrajpikmMzI')
