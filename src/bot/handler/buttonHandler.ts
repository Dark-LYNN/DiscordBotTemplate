import { ExtendedClient } from '../../types/extendedClient';
import { logger } from '../../utils';
import { Interaction, ButtonInteraction } from 'discord.js';
import { readdirSync } from 'fs';
import path from 'path';

export const loadButtons = async (client: ExtendedClient) => {
  const buttonsPath = path.join(__dirname, '../../buttons');
  const buttonFiles = readdirSync(buttonsPath).filter(
    (file) => file.endsWith('.ts') || file.endsWith('.js'),
  );

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
};

const handleInteractionError = async (interaction: ButtonInteraction) => {
  const errorMessage = {
    content: 'There was an error handling this button.',
    flags: 'Ephemeral' as any,
  };

  try {
    interaction.replied || interaction.deferred
      ? await interaction.followUp(errorMessage)
      : await interaction.reply(errorMessage);
  } catch (err) {
    logger.error(`❌ | Error responding to button interaction: ${err}`);
  }
};

export const buttonHandler = async (
  client: ExtendedClient,
  interaction: Interaction,
) => {
  if (!interaction.isButton() || !interaction.inCachedGuild()) return;

  const button = client.buttons.find((handler) =>
    typeof handler.customId === 'string'
      ? handler.customId === interaction.customId
      : handler.customId(interaction.customId),
  );

  if (!button) {
    logger.warn(`⚠️ | Button handler not found: ${interaction.customId}`);
    return;
  }

  try {
    await button.execute(client, interaction as ButtonInteraction);
  } catch (error) {
    logger.error(
      `❌ | Error executing button handler: ${interaction.customId}`,
      error,
    );
    console.error(error);
    await handleInteractionError(interaction);
  }
};
