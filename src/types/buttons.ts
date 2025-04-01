 
import { ButtonInteraction } from 'discord.js';
import { ExtendedClient } from './extendedClient';

export interface Button {
  customId: string | ((_id: string) => boolean);
  execute: (
    _client: ExtendedClient,
    _interaction: ButtonInteraction,
  ) => Promise<void>;
}
