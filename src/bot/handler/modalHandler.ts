import { ExtendedClient } from '@/types/extendedClient';
import { logger } from '@/utils';
import { Interaction, ModalSubmitInteraction } from 'discord.js';
import { readdirSync } from 'fs';
import path from 'path';

export const loadModals = async (client: ExtendedClient): Promise<void> => {
  const modalsPath = path.join(__dirname, '../../modals');
  const modalFiles = readdirSync(modalsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

  for (const file of modalFiles) {
    const filePath = path.join(modalsPath, file);
    const modal = (await import(filePath)).default;

    if (modal && modal.customId) {
      client.modals.set(modal.customId, modal);

      const isDynamic = typeof modal.customId !== 'string';
      const displayId = isDynamic ? '[Dynamic Function]' : modal.customId;
      logger.info(`✅ | Loaded modal: ${displayId}`);
    } else {
      logger.warn(`⚠️ | Skipping invalid modal file: ${file}`);
    }
  }
};

export const modalHandler = async (
  client: ExtendedClient,
  interaction: Interaction,
): Promise<void> => {
  if (!interaction.isModalSubmit() || !interaction.inCachedGuild()) return;

  const modal = client.modals.find(handler =>
    typeof handler.customId === 'string'
      ? handler.customId === interaction.customId
      : handler.customId(interaction.customId),
  );

  if (!modal) {
    logger.warn(`⚠️ | Modal handler not found: ${interaction.customId}`);
    return;
  }

  try {
    await modal.execute(client, interaction as ModalSubmitInteraction<'cached'>);
    logger.debug(`📝 | Executed modal handler: ${interaction.customId}`);
  } catch (err) {
    logger.error(
      `❌ | Error executing modal handler: ${interaction.customId}`,
      err,
    );
    console.error(err);
    modalFollowup(client, interaction)
  }
};

const modalFollowup = async (client: ExtendedClient, interaction: Interaction) => {
  if (interaction.isModalSubmit()) {
    if (interaction.replied || interaction.deferred) {
      try {
        await interaction.followUp({ content: 'There was an error handling this modal.', ephemeral: true });
      } catch (followUpErr) {
        logger.error(
          '❌ | Error while trying to followUp on a modal interaction:' +
          `${followUpErr}`,
        );
      }
    } else {
      try {
        await interaction.reply({ content: 'There was an error handling this modal.', ephemeral: true });
      } catch (replyErr) {
        logger.error(
          `❌ | Error while trying to reply to a modal interaction: ${replyErr}`,
        );
      }
    }
  } else {
    logger.warn('⚠️ | Interaction is not a modal submit interaction.');
  }
}