/* eslint-disable @typescript-eslint/no-unused-vars */
import { ButtonInteraction } from 'discord.js';
import { ExtendedClient } from './extendedClient';

export interface Button {
  customId: string | ((id: string) => boolean);
  execute: (
    client: ExtendedClient,
    interaction: ButtonInteraction,
  ) => Promise<void>;
}
