import { ExtendedClient } from '../types/extendedClient';
import { logger } from '../utils';

export default (client: ExtendedClient):void => {
  const example = async () => {
    const userName = client.user.id;
    logger.info('A loop ran.' + userName);
  };

  setInterval(() => example(), 30 * 60 * 1000); // runs example every 30 minutes (in ms)
};
// Loops don't run on start!
