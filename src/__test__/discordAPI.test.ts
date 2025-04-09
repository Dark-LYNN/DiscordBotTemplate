import { Message } from 'discord.js';

jest.mock('discord.js', () => {
  return {
    Message: jest.fn().mockImplementation(() => {
      return { reply: jest.fn() };
    }),
  };
});

describe('Bot Logic', () => {
  it('should reply to messages', () => {
    const message = { content: 'Hello', reply: jest.fn() } as unknown as Message;
    message.content = 'Hello';

    message.reply('Hi there!');

    expect(message.reply).toHaveBeenCalledWith('Hi there!');
  });
});
