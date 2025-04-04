import { REST, Routes } from 'discord.js';
import { config } from 'dotenv';
import process from 'process';

config();

if (!process.env.DISCORD_BOT_TOKEN || !process.env.DISCORD_CLIENT_ID) {
  console.error("❌ | Missing TOKEN or CLIENT_ID in .env file!");
  process.exit(1);
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);

const unregisterCommands = async () => {
  try {
    console.log("🔃 | Unregistering all slash commands...");

    await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), { body: [] });
    await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID), { body: [] });

    console.log("✅ | Successfully unregistered all slash commands!");
  } catch (error) {
    console.error('❌ | Failed to unregister commands:' + error);
    process.exit(1);
  }
};

unregisterCommands();
