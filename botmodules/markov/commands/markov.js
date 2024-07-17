module.exports = {
    name: 'markov',
    description: 'Speak!',
    usage: '',
    args: false,
    cooldown: 3,
    aliases: ["mkv"],
    async execute(client, message) {
        let markov = null
        let error = null
        client.getMarkov()
            .then((data) => {
                markov = data.toString()
            })
            .catch((err) => {
                markov = null
                error = null
            })
            .finally(() => {
                if (markov == null) {
                    console.error(`Markov failed: ${err}`)
                } else {
                    message.channel.createMessage(markov)
                }
            })
        
    }
}