import { Reporter, TestCase, TestResult, FullResult } from '@playwright/test/reporter';
import Table from 'cli-table3';

let chalk: any;

export default class CustomTableReporter implements Reporter {
  private results: {
    title: string;
    status: string;
    duration: string;
    file: string;
  }[] = [];

  async onTestEnd(test: TestCase, result: TestResult) {
    
    if (!chalk) {
      chalk = (await import('chalk')).default;
    }

    const seconds = Math.floor(result.duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const duration = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

    const statusColor = {
      passed: chalk.green('✅ PASSED'),
      failed: chalk.red('❌ FAILED'),
      skipped: chalk.yellow('⚠ SKIPPED'),
      timedOut: chalk.redBright('❌ TIMEOUT'),
    };

    this.results.push({
      title: test.title.length > 45 ? test.title.slice(0, 42) + '...' : test.title,
      status: statusColor[result.status] || chalk.gray(result.status.toUpperCase()),
      duration,
      file: test.location.file.split('\\').pop() || ''
    });
  }

  async onEnd(result: FullResult) {
    if (!chalk) {
      chalk = (await import('chalk')).default;
    }

    console.log(chalk.cyanBright('\n📊 TEST RESULTS (Custom Table Format):\n'));

    const table = new Table({
      head: [chalk.bold('Test Title'), chalk.bold('Status'), chalk.bold('Time'), chalk.bold('File')],
      colWidths: [48, 15, 10, 30],
      wordWrap: true,
    });

    for (const res of this.results) {
      table.push([res.title, res.status, res.duration, res.file]);
    }

    console.log(table.toString());

    const passed = this.results.filter(r => r.status.includes('PASSED')).length;
    const failed = this.results.filter(r => r.status.includes('FAILED')).length;
    const timedOut = this.results.filter(r => r.status.includes('TIMEOUT')).length;
    const total = this.results.length;

    console.log(chalk.green(`🎯 Passed: ${passed}`) + ' | ' +
                chalk.red(`❌ Failed: ${failed}`) + ' | ' +
                chalk.redBright(`⏰ Timeout: ${timedOut}`) + ' | ' +
                chalk.cyanBright(`Total: ${total}\n`));
  }
}
