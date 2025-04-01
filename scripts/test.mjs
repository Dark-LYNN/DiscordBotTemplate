import { execSync } from 'child_process';
import {getPackageManager} from './detectPackageManager.mjs';

/**
 * Runs the tests
 */
function runTestCommands() {
  const packageManager = getPackageManager();

  try {
    const script = (packageManager === 'yarn')
      ? `${packageManager} build && ${packageManager} test:logger`
      : `${packageManager} run build && ${packageManager} run test:logger`;

    execSync(script, { stdio: 'inherit' })
  } catch (error) {
    console.error('Error running test commands:', error.message);
    process.exit(1);
  }
}

runTestCommands();
