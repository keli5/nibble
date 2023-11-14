const MessageEmbed = require("davie-eris-embed")

module.exports = {
    name: "help",
    description: "Get a list of commands, or help with a specific command.",
    usage: "[command]",
    args: false,
    cooldown: 3,
    async execute(client, message, args) {
        const cmdmap = client.commands.filter(x => !x.hidden).map(x => x.name)
        const prefix = client.config.prefix
        const revision = require('child_process')
        .execSync('git rev-parse --short HEAD')
        .toString().trim()
        let helpEmbed = new MessageEmbed()

        if (!args.length) {
            return message.channel.sendEmbed(helpEmbed
                .setColor(client.config.embedColors.default)
                .setTitle(cmdmap.length + " commands")
                .setDescription(cmdmap.join(", "))
                .setFooter(`Want help using a specific command? Use ${prefix}help [command name]. • Nibble ${revision}`)
            )
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.channel.sendEmbed(helpEmbed
                .setColor(client.config.embedColors.error)
                .setTitle("Invalid command.")
            )
        }

        helpEmbed.setColor(client.config.embedColors.default)

        let m = command.name.split('')
        m[0] = m[0].toUpperCase();
        m = m.join('')

        helpEmbed.setTitle(m);

        if (command.description) helpEmbed.setDescription(command.description)

        if (command.aliases) helpEmbed.addField("Aliases: ", command.aliases.join(", "))
        if (command.permissions instanceof String) helpEmbed.addField("Required permissions: ", command.permissions)
        if (command.permissions instanceof Array) helpEmbed.addField("Required permissions: ", command.permissions.join(", "))
        if (command.usage) helpEmbed.addField("Usage: ", `${prefix}${command.name} ${command.usage}`)
        if (command.cooldown) {
            const minsec = minutes(command.cooldown)
            let timeString = ""
            if (minsec.m > 0) timeString += (minsec.m + "m ")
            if (minsec.s > 0) timeString += (minsec.s + "s")

            helpEmbed.addField("Cooldown: ", timeString)
        }

        message.channel.sendEmbed(helpEmbed)
    }
}