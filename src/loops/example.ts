import { ExtendedClient } from '../types/extendedClient';
import { logger } from '../utils';

export default (client: ExtendedClient) => {
  const example = async () => {
    logger.info('A loop ran.');
  };

  setInterval(() => example(), 30 * 60 * 1000); // runs example every 30 minutes (in ms)
};
// Loops don't run on start!
