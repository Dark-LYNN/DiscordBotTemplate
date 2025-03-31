import { Client, Collection } from 'discord.js';
import { Command } from './commands';
import { Button } from './buttons';
import dotenv from 'dotenv';
import process = require('process');

dotenv.config();

export class ExtendedClient extends Client<true> {
  readonly commands: Collection<string, Command>;
  readonly subcommands: Collection<string, Command>;
  readonly buttons: Collection<string, Button>;
  readonly emoji: Collection<string, string>;

  constructor(options: any) {
    super(options);
    this.commands = new Collection();
    this.subcommands = new Collection();
    this.buttons = new Collection();
    this.emoji = new Collection();
  }

  env(key: string): string | undefined {
    return process.env[key];
  }

  findEmoji(name: string): string | undefined {
    return this.emoji.get(name);
  }

}