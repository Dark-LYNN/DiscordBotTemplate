import { ExtendedClient } from '@/types/extendedClient';
import fs from 'fs';
import path from 'path';
import { logger } from '@/utils';

export const loadLoops = async (
  client: ExtendedClient,
):Promise<void> => {
  const loopsPath = path.join(__dirname, '../../loops');
  const loopFiles = fs.readdirSync(loopsPath)
    .filter(file => file.endsWith('.js') && !file.startsWith('_'));

  for (const file of loopFiles) {
    const loopPath = path.join(loopsPath, file);
    const loop = (await import(loopPath)).default;

    if (loop && typeof loop === 'function') {
      logger.info(`✅ | Loaded loop: ${file}`);
      loop(client);
    } else {
      logger.warn(`⚠️ | Skipping invalid loop file: ${file}`);
    }
  }
  return;
};
