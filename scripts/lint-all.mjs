import { execSync } from 'child_process';
import { getPackageManager } from './detectPackageManager.mjs';
import { error } from "console";
import { exit } from "process";

/**
 * Runs the all linters
 */
function runLinterCommands() {
  const packageManager = getPackageManager();

  try {
    const script =
      packageManager === 'yarn'
        ? `${packageManager} lint:fix && ${packageManager} lint:spell && ${packageManager} lint:format`
        : `${packageManager} run lint:fix && ${packageManager} run lint:spell && ${packageManager} lint:format`;

    execSync(script, { stdio: 'inherit' });
  } catch (err) {
    error('Error running test commands:', err.message);
    exit(1);
  }
}

runLinterCommands();
