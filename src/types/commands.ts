/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChatInputCommandInteraction } from 'discord.js';
import { ExtendedClient } from './extendedClient';

export interface Command {
  data: {
    name: string;
    description: string;
  };
  execute: (
    _client: ExtendedClient,
    _interaction: ChatInputCommandInteraction<'cached'>,
  ) => Promise<void>;
}
