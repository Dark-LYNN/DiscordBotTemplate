import { InteractionResponse, Message } from 'discord.js';

export interface InteractionReturn {
  success: boolean;
  message?: Message<boolean> | InteractionResponse<boolean> | string;
}