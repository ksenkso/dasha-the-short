import * as dotenv from 'dotenv';
import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { downloadShort } from './download-short';
import { onYoutubeShortLink } from './setup';
import { logger } from './logger';
import fastify from 'fastify';
import cors from '@fastify/cors';

dotenv.config();

export const dasha = new Telegraf(process.env.DASHA_BOT_TOKEN as string);
const server = fastify({ logger: false });

server.register(cors);

const CHATS = {
  genshin_conference: -1001536083195,
  test: -987219814,
} as const;

server.post<{ Body: { chatAlias: keyof typeof CHATS; text: string } }>(
  '/sendMessage',
  (request, reply) => {
    const { chatAlias, text } = request.body;
    const chatId = CHATS[chatAlias];

    dasha.telegram
      .sendMessage(chatId, text)
      .then(() => {
        reply.status(201).send();
      })
      .catch(err => {
        reply.status(500).send(err);
      });
  },
);

server.listen({
  port: process.env.DASHA_API_PORT,
  host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost',
});

dasha.on(message('entities'), ctx => {
  logger.log({
    level: 'info',
    label: 'index',
    message: 'got a message',
  });
  logger.info(ctx.message.chat.id);
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
