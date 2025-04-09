import { ModalSubmitInteraction } from 'discord.js';
import { ExtendedClient } from '@/types/extendedClient';

export default {
  customId: 'test-modal',
  async execute(
    client: ExtendedClient,
    interaction: ModalSubmitInteraction,
  ): Promise<void> {
    interaction.reply({content: 'this modelId is exactly test-modal.'});
  },
};