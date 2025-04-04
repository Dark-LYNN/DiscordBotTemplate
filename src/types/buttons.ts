import { ButtonInteraction } from 'discord.js';
import { ExtendedClient } from './extendedClient';
import { InteractionReturn } from './interactionReturn';

export interface Button {
  customId: string | ((id: string) => boolean)
  execute: (
    client: ExtendedClient,
    interaction: ButtonInteraction
  ) => Promise<InteractionReturn>;
}
