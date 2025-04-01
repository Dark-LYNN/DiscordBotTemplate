import { execSync } from 'child_process';
import { getPackageManager } from './detectPackageManager.mjs';
import { error } from 'console';
import { exit } from 'process';

/**
 * Runs the tests
 */
function runTestCommands() {
  const packageManager = getPackageManager();

  try {
    const script =
      packageManager === 'yarn'
        ? `${packageManager} build && ${packageManager} test:logger`
        : `${packageManager} run build && ${packageManager} run test:logger`;

    execSync(script, { stdio: 'inherit' });
  } catch (err) {
    error('Error running test commands:', err.message);
    exit(1);
  }
}

runTestCommands();
