import { logger } from '../utils/index';
import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';

describe('Winston Logger Tests', () => {
  it('should log info correctly', () => {
    const message = 'logger is working fine';
    let loggedOutput = '';
    const originalConsoleLog = console.log;

    console.log = (msg: string) => {
      loggedOutput += msg + '\n';
    };

    logger.info(message);

    console.log = originalConsoleLog;

    const logRegex =
      /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z \[\\[32minfo\\[39m\]: logger is working fine/;
    assert.ok(logRegex.test(loggedOutput));
  });

  it('should log warning correctly', () => {
    const message = 'This is a warning';
    let loggedOutput = '';
    const originalConsoleLog = console.log;

    console.log = (msg: string) => {
      loggedOutput += msg + '\n';
    };

    logger.warn(message);

    console.log = originalConsoleLog;

    const logRegex =
      /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z \[\\[33mwarn\\[39m\]: This is a warn/;
    assert.ok(logRegex.test(loggedOutput));
  });

  it('should log error correctly', () => {
    const message = 'This is an error';
    let loggedOutput = '';
    const originalConsoleLog = console.log;

    console.log = (msg: string) => {
      loggedOutput += msg + '\n';
    };

    logger.error(message);

    console.log = originalConsoleLog;

    const logRegex =
      /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z \[\\[31merror\\[39m\]: This is an error/;
    assert.ok(logRegex.test(loggedOutput));
  });

  it('should log with dynamic timestamp', () => {
    const message = 'Testing dynamic timestamp';
    let loggedOutput = '';
    const originalConsoleLog = console.log;

    console.log = (msg: string) => {
      loggedOutput += msg + '\n';
    };

    const timestamp = new Date().toISOString();
    logger.info(`${timestamp} - ${message}`);

    console.log = originalConsoleLog;

    const logRegex = new RegExp(
      `${timestamp} \[\\[32minfo\\[39m\]: ${timestamp} - Testing dynamic timestamp`,
    );
    assert.ok(logRegex.test(loggedOutput));
  });

  it('should write to file correctly', () => {
    const message = 'file test';
    logger.info(message);
    const fileContent = fs.readFileSync('logs/app.log', 'utf-8');
    const firstLine = fileContent
      .split('\n')
      .find((line) => line.trim() !== '');
    const timestampRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/;

    assert.ok(
      firstLine && timestampRegex.test(firstLine),
      `Log format incorrect: "${firstLine}"`,
    );
  });
});
