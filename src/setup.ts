import { DashaContext } from './types';
import { logProc } from './logger';
import { Message } from 'typegram';

const COMMAND_TOKEN = '#';
const YOUTUBE_SHORT_URL = new RegExp(
  `^${COMMAND_TOKEN}https:\\/\\/(www\\.)?youtube.com\\/shorts\\/\\w+`,
);
const DID_NOT_UNDERSTAND_MESSAGE = `Не понимаю такое. Понимаю такое: ${COMMAND_TOKEN}https://www.youtube.com/shorts/SHORT_ID, ${COMMAND_TOKEN}https://youtube.com/shorts/SHORT_ID.`;

const log = logProc.bind(null, 'onYoutubeShortLink');
const isLink = (message: Message.TextMessage) =>
  message.text.startsWith(COMMAND_TOKEN + 'https://');

export const onYoutubeShortLink = (ctx: DashaContext, action: (link: string) => unknown) => {
  if (!isLink(ctx.message)) {
    return;
  }

  const match = ctx.message.text.match(YOUTUBE_SHORT_URL);

  if (match) {
    return action(match[0].substring(1));
  } else {
    log('Message did not match the url pattern: ' + ctx.message.text);

    return ctx.reply(DID_NOT_UNDERSTAND_MESSAGE);
  }
};
