import { Client, Collection, ClientOptions } from 'discord.js';
import { Command } from './commands';
import { Button } from './buttons';
import { Modal } from './modal';
import dotenv from 'dotenv';
import { logger } from '@/utils';

dotenv.config();

/**
 * An extended Discord client with collections for commands, buttons, modals, etcetera.
 */
export class ExtendedClient extends Client<true> {
  readonly commands: Collection<string, Command>;
  readonly subcommands: Collection<string, Command>;
  readonly buttons: Collection<string, Button>;
  readonly emoji: Collection<string, string>;
  readonly modals: Collection<string, Modal>;

  /**
   * Creates a new ExtendedClient instance.
   * @param {ClientOptions} options - Discord.js client options.
   */
  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection();
    this.subcommands = new Collection();
    this.buttons = new Collection();
    this.emoji = new Collection();
    this.modals = new Collection();
  }

  /**
   * Gets an environment variable.
   * @param {string} key - The environment variable name.
   * @param {string} [defaultValue=''] - Optional default value.
   * @returns {string} The environment variable value or the default.
   */
  env(key: string, defaultValue: string = ''): string {
    const value = process.env[key] || defaultValue;
    if (!value) {
      logger.warn(`Environment variable ${key} is not set`);
    }
    return value;
  }

  /**
   * Finds a custom emoji by name.
   * @param {string} name - The emoji name.
   * @returns {string | undefined} The emoji ID or undefined if not found.
   */
  findEmoji(name: string): string | undefined {
    return this.emoji.get(name);
  }

}
