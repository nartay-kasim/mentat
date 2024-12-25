import { App, LogLevel } from '@slack/bolt';
import dotenv from 'dotenv';

dotenv.config()

const app = new App({
  token: process.env.SLACK_BOT_TOKEN ?? '',
  signingSecret: process.env.SLACK_SIGNING_SECRET ?? '',
  logLevel: LogLevel.DEBUG, 
});

// Listen to messages in channels
app.message(/.*/, async ({ message, say }) => {
  if ('text' in message && 'user' in message) {
    console.log(`Message received: ${(message as any).text}`);
    await say(`Hello, <@${(message as any).user}>! You said: "${(message as any).text}"`);
  }
});

// Start the app
(async () => {
  await app.start(3000);

  console.log('⚡️ Slack bot is running on port 3000!');
})();