import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { ExtendedClient } from './extendedClient';

export interface Command {
  data: SlashCommandBuilder;
  guilds?: string[];
  execute: (client: ExtendedClient, interaction: ChatInputCommandInteraction<'cached'>) => Promise<void>;
}
