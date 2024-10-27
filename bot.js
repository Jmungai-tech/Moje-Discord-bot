require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

// Initialize the bot client with required intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMembers,
    ],
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    updateMemberCount(); // Initial update
    setInterval(updateMemberCount, 60000); // Update every minute
});

const updateMemberCount = async () => {
    try {
        const guild = client.guilds.cache.get('1299321679218217021'); // Your Guild ID
        const channel = guild.channels.cache.get('1300056306027335773'); // Your Channel ID

        if (channel) {
            const memberCount = guild.memberCount;
            const newName = `✨𝕄𝕖𝕞𝕓𝕖𝕣𝕤┇ ${memberCount}`; // Customize here

            await channel.setName(newName);
            console.log(`Updated channel name to "${newName}"`);
        } else {
            console.error('Channel not found');
        }
    } catch (err) {
        console.error(`Failed to update channel name: ${err}`);
    }
};

// Login using the token from your .env file
client.login(process.env.TOKEN);