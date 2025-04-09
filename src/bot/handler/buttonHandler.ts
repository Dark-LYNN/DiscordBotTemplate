import { ExtendedClient } from '@/types/extendedClient';
import { logger } from '@/utils';
import { Interaction, ButtonInteraction } from 'discord.js';
import { readdirSync } from 'fs';
import path from 'path';

export const loadButtons = async (
  client: ExtendedClient,
):Promise<void> => {
  const buttonsPath = path.join(__dirname, '../../buttons');
  const buttonFiles = readdirSync(buttonsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

  for (const file of buttonFiles) {
    const filePath = path.join(buttonsPath, file);
    const button = (await import(filePath)).default;

    if (button && button.customId) {
      client.buttons.set(button.customId, button);

      const isDynamic = typeof button.customId !== 'string';
      const displayId = isDynamic ? '[Dynamic Function]' : button.customId;

      const logMessage = isDynamic ? `${displayId} (${file})` : displayId;

      logger.info(`✅ | Loaded button: ${logMessage}`);
    } else {
      logger.warn(`⚠️ Skipping invalid button file: ${file}`);
    }
  }
  return;
};

export const buttonHandler = async (
  client: ExtendedClient,
  interaction: Interaction,
):Promise<void> => {
  if (!interaction.isButton() || !interaction.inCachedGuild()) return;

  const button = client.buttons.find(handler =>
    typeof handler.customId === 'string' ? handler.customId === interaction.customId : handler.customId(interaction.customId),
  );

  if (!button) {
    logger.warn(`⚠️ | Button handler not found: ${interaction.customId}`);
    return;
  }

  try {
    await button.execute(client, interaction as ButtonInteraction);
    logger.debug(`🔘 | Executed button handler: ${interaction.customId}`);
  } catch (err) {
    logger.error(
      `❌ | Error executing button handler: ${interaction.customId}`,
      err,
    );
    console.error(err);
    interactionFollowup(interaction);
  }
};

const interactionFollowup = async (
  interaction: ButtonInteraction,
): Promise<void> => {
  if (interaction.isButton()) {
    if (interaction.replied || interaction.deferred) {
      try {
        await interaction.followUp({ content: 'There was an error handling this button.', flags: 'Ephemeral' });
      } catch (err) {
        logger.error(
          `❌ | error while trying to followUp on a button interaction: ${err}`,
        );
      }
    } else {
      try{
        await interaction.reply({ content: 'There was an error handling this button.', flags: 'Ephemeral'});
      }catch (err) {
        logger.error(
          `❌ | error while trying to reply to a button interaction: ${err}}`,
        );
      }
    }
  }
};
