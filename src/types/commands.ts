import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { ExtendedClient } from './extendedClient';

export interface Command {
  data: SlashCommandBuilder;
  execute: (client: ExtendedClient, interaction: ChatInputCommandInteraction<'cached'>) => Promise<void>;
}
