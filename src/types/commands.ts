import { ChatInputCommandInteraction } from 'discord.js';
import { ExtendedClient } from './extendedClient';

export interface Command {
  data: {
    name: string;
    description: string;
  };
  execute: (
    client: ExtendedClient,
    interaction: ChatInputCommandInteraction<'cached'>,
  ) => Promise<void>;
}
