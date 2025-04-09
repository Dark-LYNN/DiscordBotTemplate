/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { env } from 'process';
import { execSync } from 'child_process';

/**
 * Detects the package manager being used (npm, pnpm, or yarn).
 * @returns {string} The detected package manager.
 */
export function getPackageManager() {
  const execPath = env.npm_execpath || '';

  if (execPath.includes('pnpm')) return 'pnpm';
  if (execPath.includes('yarn')) return 'yarn';
  return 'npm'; // Default to npm
}

/**
 * Checks if the Yarn version is v2 or higher.
 * @returns {boolean} True if Yarn v2+, false if Yarn v1.
 */
export function isYarnV2OrHigher() {
  try {
    const versionOutput = execSync('yarn -v', { encoding: 'utf8' }).trim();
    const majorVersion = parseInt(versionOutput.split('.')[0], 10);
    return majorVersion >= 2;
  } catch {
    return false; // Default to Yarn v1 behavior if version check fails
  }
}

/**
 * Returns the correct command prefix for running Prisma with the detected package manager.
 * @returns {string} The appropriate command prefix (`npx`, `pnpm dlx`, or `yarn dlx` for v2+).
 */
export function getCommandPrefix() {
  const packageManager = getPackageManager();
  if (packageManager === 'pnpm') return 'pnpm dlx';
  if (packageManager === 'yarn') return isYarnV2OrHigher() ? 'yarn dlx' : 'npx';
  return 'npx';
}
