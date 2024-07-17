const { PrismaClient } = require("@prisma/client")
const MessageEmbed = require("davie-eris-embed")

const prisma = new PrismaClient()

module.exports = {
    name: 'togglemarkovchannel',
    description: 'Toggle randomly speaking in the current channel.',
    usage: '',
    args: false,
    aliases: ["tmc"],
    permissions: ["manageChannels"],
    async execute(client, message) {
        let channel = message.channel
        let channelObject = await prisma.channel.upsert({
            where: {
                id: channel.id
            },
            create: {
                id: channel.id,
                guildId: message.guildID
            },
            update: {}
        })

        channelObject = await prisma.channel.upsert({
            where: {
                id: channel.id
            },
            create: {
                id: channel.id,
                guildId: message.guildID
            },
            update: {
                markovAllowed: !channelObject.markovAllowed
            }
        })

        message.channel.sendEmbed((new MessageEmbed())
            .setTitle(`Nibble will ${channelObject.markovAllowed ? "now" : "no longer"} randomly speak in <#${channel.id}>.`)
        )
    }
}