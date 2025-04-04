import { ModalSubmitInteraction } from 'discord.js';
import { ExtendedClient } from './extendedClient';

export interface Modal {
  customId: string | ((id: string) => boolean)
  execute: (client: ExtendedClient, interaction: ModalSubmitInteraction<'cached'>) => Promise<void>;
}
