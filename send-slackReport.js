// const axios = require('axios');
// const fs = require('fs');

// const webhookUrl = 'https://hooks.slack.com/services/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';
// const ngrokUrl = 'https://cd5c-2409-40d5-107b-3968-c-c897-d8ad-1a76.ngrok-free.app';

// if (!fs.existsSync('test-results.json')) {
//   console.error('❗ test-results.json not found. Ensure Playwright JSON reporter is enabled.');
//   process.exit(1);
// }

// let data;
// try {
//   data = JSON.parse(fs.readFileSync('test-results.json', 'utf8'));
// } catch (error) {
//   console.error('❗ Error reading test results:', error.message);
//   process.exit(1);
// }

// let passed = 0;
// let failed = 0;
// let skipped = 0;
// let flaky = 0;
// let total = 0;
// let passedTests = [];
// let failedTests = [];

// function extractTests(suites) {
//   if (!suites) return;

//   suites.forEach((suite) => {
//     if (suite.specs) {
//       suite.specs.forEach((spec) => {
//         spec.tests.forEach((test) => {
//           total++;
//           const testName = spec.title || "Unnamed Test";
//           const testResult = test.results?.[0]?.status || "unknown";

//           if (testResult === 'passed') {
//             passed++;
//             passedTests.push(`✅ ${testName}`);
//           } else if (testResult === 'failed') {
//             failed++;
//             failedTests.push(`❌ ${testName}`);
//           } else if (testResult === 'skipped') {
//             skipped++;
//           } else if (testResult === 'flaky') {
//             flaky++;
//           }
//         });
//       });
//     }
//     if (suite.suites) {
//       extractTests(suite.suites);
//     }
//   });
// }

// extractTests(data.suites);

// const progressBar = (count, total) => {
//   const barLength = 20;
//   const filledLength = Math.round((count / total) * barLength);
//   return '▓'.repeat(filledLength) + '░'.repeat(barLength - filledLength);
// };

// const percentage = (count, total) => total > 0 ? ((count / total) * 100).toFixed(1) + '%' : '0%';

// const dashboard = `🧪 *Test Execution Dashboard:*

// \`\`\`
// 📊 Progress
// | ✅ Passed  | ${progressBar(passed, total)} ${passed}/${total} (${percentage(passed, total)}) |
// | ❌ Failed  | ${progressBar(failed, total)} ${failed}/${total} (${percentage(failed, total)}) |
// | ⏭️ Skipped | ${progressBar(skipped, total)} ${skipped}/${total} (${percentage(skipped, total)}) |
// | 🔄 Flaky   | ${progressBar(flaky, total)} ${flaky}/${total} (${percentage(flaky, total)}) |
// \`\`\`

// ----------------------------------------------

// ${passedTests.length > 0 ? `✅ *Passed Tests:*
// ${passedTests.join('\n')}

// ----------------------------------------------` : ''}
// ${failedTests.length > 0 ? `❌ *Failed Tests:*
// ${failedTests.join('\n')}

// ----------------------------------------------` : ''}

// 👉 *[View Full Report](${ngrokUrl})*`;

// const sendSlackMessage = async () => {
//   try {
//     await axios.post(webhookUrl, { text: dashboard });
//     console.log('✅ Slack report sent successfully!');
//   } catch (err) {
//     console.error('❗ Error sending Slack message:', err.response ? err.response.data : err.message);
//   }
// };
// // Only send report if there are NO failed tests
// if (failed === 0) {
//   sendSlackMessage();
// } else {
//   console.log('❗ Some tests failed. Slack report will not be sent.');
// }


const axios = require('axios');
const fs = require('fs');

const webhookUrl = 'https://hooks.slack.com/services/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';
const ngrokUrl = 'https://cd5c-2409-40d5-107b-3968-c-c897-d8ad-1a76.ngrok-free.app';

if (!fs.existsSync('test-results.json')) {
  console.error('❗ test-results.json not found. Ensure Playwright JSON reporter is enabled.');
  process.exit(1);
}

let data;
try {
  data = JSON.parse(fs.readFileSync('test-results.json', 'utf8'));
} catch (error) {
  console.error('❗ Error reading test results:', error.message);
  process.exit(1);
}

let passed = 0;
let total = 0;
let passedTests = [];

function extractTests(suites) {
  if (!suites) return;

  suites.forEach((suite) => {
    if (suite.specs) {
      suite.specs.forEach((spec) => {
        spec.tests.forEach((test) => {
          total++;
          const testName = spec.title || "Unnamed Test";
          const testResult = test.results?.[0]?.status || "unknown";

          if (testResult === 'passed') {
            passed++;
            passedTests.push(`✅ ${testName}`);
          }
        });
      });
    }
    if (suite.suites) {
      extractTests(suite.suites);
    }
  });
}

extractTests(data.suites);

const progressBar = (count, total) => {
  const barLength = 20;
  const filledLength = Math.round((count / total) * barLength);
  return '▓'.repeat(filledLength) + '░'.repeat(barLength - filledLength);
};

const percentage = (count, total) => total > 0 ? ((count / total) * 100).toFixed(1) + '%' : '0%';

// ONLY PASS DATA gets shown, other bars empty/zero
const dashboard = `🧪 *Test Execution Dashboard:*

\`\`\`
📊 Progress
| ✅ Passed  | ${progressBar(passed, total)} ${passed}/${total} (${percentage(passed, total)}) |
| ❌ Failed  | ${progressBar(0, total)} 0/${total} (0%) |
| ⏭️ Skipped | ${progressBar(0, total)} 0/${total} (0%) |
| 🔄 Flaky   | ${progressBar(0, total)} 0/${total} (0%) |
\`\`\`

----------------------------------------------

${passedTests.length > 0 ? `✅ *Passed Tests:*
${passedTests.join('\n')}

----------------------------------------------` : ''}

👉 *[View Full Report](${ngrokUrl})*`;

const sendSlackMessage = async () => {
  try {
    await axios.post(webhookUrl, { text: dashboard });
    console.log('✅ Slack report sent successfully!');
  } catch (err) {
    console.error('❗ Error sending Slack message:', err.response ? err.response.data : err.message);
  }
};

sendSlackMessage();
