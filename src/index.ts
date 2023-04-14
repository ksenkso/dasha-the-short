import * as dotenv from 'dotenv';
import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { downloadShort } from './download-short';
import { onYoutubeShortLink } from './setup';
import { logger } from './logger';

dotenv.config();

console.log(process.env.BOT_TOKEN);

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

// const url = 'https://www.youtube.com/shorts/WoWZaEWhplw';
dasha.launch();

// Enable graceful stop
process.once('SIGINT', () => dasha.stop('SIGINT'));
process.once('SIGTERM', () => dasha.stop('SIGTERM'));
