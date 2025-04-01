import { execSync } from 'child_process';
import {getPackageManager} from './detectPackageManager.mjs';

/**
 * Runs the all linters
 */
function runLinterCommands() {
  const packageManager = getPackageManager();

  try {
    const script = (packageManager === 'yarn')
      ? `${packageManager} lint:fix && ${packageManager} lint:spell && ${packageManager} lint:format`
      : `${packageManager} run lint:fix && ${packageManager} run lint:spell && ${packageManager} lint:format`;

    execSync(script, { stdio: 'inherit' })
  } catch (error) {
    console.error('Error running test commands:', error.message);
    process.exit(1);
  }
}

runLinterCommands();
