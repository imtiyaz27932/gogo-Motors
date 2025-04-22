export class Logger {
    private static async getChalk() {
      // Dynamically import chalk for CommonJS compatibility
      const chalk = await import('chalk');
      return chalk.default;
    }
  
    static async info(message: string) {
      const chalk = await this.getChalk();
      console.log(`${chalk.blue('ℹ️ [INFO]')} ${message}`);
    }
  
    static async success(message: string) {
      const chalk = await this.getChalk();
      console.log(`${chalk.green('✅ [SUCCESS]')} ${message}`);
    }
  
    static async error(message: string) {
      const chalk = await this.getChalk();
      console.error(`${chalk.red('❌ [ERROR]')} ${message}`);
    }
  
    static async warn(message: string) {
      const chalk = await this.getChalk();
      console.warn(`${chalk.yellow('⚠️ [WARN]')} ${message}`);
    }
  
    static async divider() {
      const chalk = await this.getChalk();
      console.log(chalk.gray('--------------------------------------------'));
    }
  
    static async timestampedInfo(message: string) {
      const chalk = await this.getChalk();
      const timestamp = new Date().toISOString();
      console.log(`${chalk.cyan(`[${timestamp}]`)} ${chalk.blue('INFO')} ${message}`);
    }
  }
  