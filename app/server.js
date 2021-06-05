const dbd = require("dbd.js")

const bot = new dbd.Bot({
token: "TOKEN", 
prefix: "$getServerVar[prefix]" 
})

bot.onMessage()

// BOT STATUS OR BIO //
bot.status({
  text: "Subscribe Jastin Ch",
  type: "PLAYING",
  time: 12
})
///////

// BOT VARIABLE //
bot.variables({
 prefix: "PREFIX",
 rch: "",
 rmsg: "Congrats {user.tag}🎉, you leveled up to level {level}",
 lvl: "0",
 exp: "0",
 rexp: "40",
 rsystem: "0"
})
///////

// COMMAND //
bot.command({
  name: "help",
  code: `$title[Help Levelling System Menu]
  $description[

**🔰 Levelling / Rank Command List**

\`$getServerVar[prefix]setrankchannel\` - Set Channel leveled up.
\`$getServerVar[prefix]setrankmsg\` - Set Message for the leveled up.
\`$getServerVar[prefix]rank\` - See the current level and exp.
\`$getServerVar[prefix]resetrank\` - Reset the levelup channel.

**[Invite My Bot, Miu#1332\\](https://discord.com/api/oauth2/authorize?client_id=797794333759766528&permissions=8&scope=bot) | [Support Server\\](https://dsc.gg/jastinch) | [Support Server My Bot\\](https://dsc.gg/miubothome) | [Web Dev\\](https://jastinch.xyz/) | [Donate\\](https://jastinch.xyz/donate.html)**]
$color[$random[0;999999]]
$footer[Subscribe Jastin Ch | https://jastinch.xyz/]
$addTimestamp`
})

bot.command({
    name: "$alwaysExecute",
    code: `$useChannel[$getServerVar[rch]]
$replaceText[$replaceText[$replaceText[$replaceText[$getServerVar[rmsg];{user.tag};$userTag];{user.mention};<@$authorID>];{level};$getUserVar[lvl]];{exp};$getUserVar[exp]]
$setUserVar[lvl;$sum[$getUserVar[lvl];1]]
$setUserVar[rexp;$multi[$getUserVar[rexp];2]]
$onlyIf[$getUserVar[exp]>=$getUserVar[rexp];]
$onlyForServers[$guildID;]`
    
})

bot.command({
    name: "$alwaysExecute",
    code: `$setUserVar[exp;$sum[$getUserVar[exp];$random[1;4]]]
$onlyIf[$getServerVar[rsystem]>=1;]
$onlyForServers[$guildID;]`
})
bot.awaitedCommand({
    name: "errorrank",
    code: `$setServerVar[rch;]
$onlyForServers[$guildID;]`
})

bot.command({
    name: "setrankmsg",
    usage: "setrankmsg <message>",
    description: "message for the leveled up",
    code: `$description[You have been setted the message to:
\`$message\`]
$color[01ff00]
$setServerVar[rmsg;$message]
$onlyIf[$message!=;You can also use this variables:
\`\`\`
{user.tag} = $userTag
{user.mention} = <@$authorID>
{level} = 1
{exp} = 25
\`\`\`
Current msg is:
\`$getServerVar[rmsg]\`]
$onlyBotPerms[mentioneveryone;managemessages;{description:I need permission \`MANAGE_MESSAGES\`/\`MENTION_EVERYONE\`}{color:ff2050}]
$onlyPerms[manageserver;{description:You need \`MANAGE_SERVER\` permission}{color:ff2050}]
$cooldown[5s;Please wait **%time%**]
$onlyForServers[$guildID;]`
})

bot.command({
    name: "rank",
    aliases: ["level"],
    usage: "rank (user)",
    description: "see the current level and exp",
    code: `$image[https://vacefron.nl/api/rankcard?username=$replaceText[$username[$mentioned[1;yes]]; ;+;-1]&avatar=$userAvatar[$mentioned[1;yes]]?size=4096&level=$getUserVar[lvl;$mentioned[1;yes]]&rank=&currentxp=$getUserVar[exp;$mentioned[1;yes]]&nextlevelxp=$getUserVar[rexp;$mentioned[1;yes]]&previouslevelxp=0&custombg=https://cdn.discordapp.com/attachments/793071150614970388/794565647760752650/20210101_205624.jpg&xpcolor=ffffff&isboosting=true]
$onlyIf[$getServerVar[rsystem]>=1;{description:Leveling system is __disabled__}{color:ff2050}]
$cooldown[5s;]
$onlyForServers[$guildID;]
$color[RANDOM]`
})

bot.command({
    name: "resetrank",
    usage: "resetrank",
    description: "reset the levelup channel",
    code: `$description[Okay, Done!]
$color[01ff00]
$setServerVar[rch;]
$setServerVar[rmsg;$getVar[rmsg]]
$setServerVar[rsystem;0]
$onlyIf[$getServerVar[rsystem]>=1;{description:Leveling system is __disabled__ on this server}{color:ff2050}]
$onlyBotPerms[mentioneveryone;{description:I dont have permission \`MENTION_EVERYONE\`}{color:ff2050}]
$onlyPerms[manageserver;{description:You need \`MANAGE_SERVER\` permission}{color:ff2050}]
$cooldown[5s;Please wait **%time%**]
$onlyForServers[$guildID;]`
})

bot.command({
    name: "setrankchannel",
    usage: "setrankchannel",
    description: "setrank server",
    code: `$description[Rank channel has been set up to <#$mentionedChannels[1;yes]>]
$color[40ff00]
$setServerVar[rsystem;1]
$setServerVar[rch;$mentionedChannels[1;yes]]
$onlyIf[$getServerVar[rsystem]<=1;{description:System leveling has been activated!}{color:ff2050}]
$onlyPerms[manageserver;{description:You need \`MANAGE_SERVER\` permission}{color:ff2050}]
$onlyForServers[$guildID;]`
})

///////