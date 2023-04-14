import * as dotenv from 'dotenv';
import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { downloadShort } from './download-short';
import { onYoutubeShortLink } from './setup';
import { logger } from './logger';

dotenv.config();

export const dasha = new Telegraf(process.env.BOT_TOKEN as string);

dasha.on(message('entities'), ctx => {
  logger.log({
    level: 'info',
    label: 'index',
    message: 'got a message',
  });
  onYoutubeShortLink(ctx, url => {
    return downloadShort(ctx, url);
  });
});

dasha.launch().catch(err => {
  logger.log({
    level: 'error',
    message: 'Bot did not launch. This happened: ' + JSON.stringify(err),
  });
});

logger.info('Bot launched.');

// Enable graceful stop
process.once('SIGINT', () => dasha.stop('SIGINT'));
process.once('SIGTERM', () => dasha.stop('SIGTERM'));
