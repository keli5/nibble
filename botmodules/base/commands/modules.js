const MessageEmbed = require("davie-eris-embed")
const Eris = require("eris")
const { isModuleEnabled } = require("../../../util/moduleUtil")

module.exports = {
    name: 'modules',
    description: 'View this server\'s enabled/disabled modules',
    usage: '[module name]',
    /**
     * 
     * @param {Eris.Client} client 
     * @param {Eris.Message} message 
     * @param {Array.<string>} args 
     */
    async execute(client, message, args) {
        let embed = new MessageEmbed()

        if (args[0]) {
            let module = args[0].trim().toLowerCase()
            module = client.modules.find((mdl) => mdl.name.toLowerCase() == module) || null
            
            if (!module || !module.db) {
                return message.channel.sendEmbed((new MessageEmbed())
                    .setTitle("Could not find module.")
                    .setDescription("You can see what modules exist with `)modules`.")
                    .setColor("#aa6666")
                )
            }

            enabledbool = await isModuleEnabled(message.guildID, module.db)
            enabled = enabledbool ? "Enabled" : "Disabled"
            if (manifest.name == "Base") enabled = "Enabled"

            embed.setTitle(`${module.name} (${enabled})`)
            embed.setDescription(module.desc)
            embed.setColor(enabledbool ? "#66aa66" : "#aa6666")

        } else {
            embed.setTitle("Modules in " + message.channel.guild.name)
            embed.setColor("#6666aa")
    
            for (const manifest of client.modules.values()) {
                enabled = (await isModuleEnabled(message.guildID, manifest.db)) ? "Enabled" : "Disabled"
                if (manifest.name == "Base") enabled = "Enabled"
                embed.addField(`${manifest.name} (${enabled})`, manifest.shortdesc || manifest.desc, true)
            }
        }

        await message.channel.sendEmbed(embed)
        
    }
}