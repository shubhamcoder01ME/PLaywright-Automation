import chalk from 'chalk';

/**
 * Simple logger utility for Playwright tests
 */
class Logger {
  static info(message) {
    console.log(chalk.blue(`[INFO] [${new Date().toISOString()}] ${message}`));
  }

  static success(message) {
    console.log(chalk.green(`[SUCCESS] [${new Date().toISOString()}] ${message}`));
  }

  static warn(message) {
    console.warn(chalk.yellow(`[WARN] [${new Date().toISOString()}] ${message}`));
  }

  static error(message) {
    console.error(chalk.red(`[ERROR] [${new Date().toISOString()}] ${message}`));
  }
}

export default Logger;
