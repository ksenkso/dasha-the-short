import ytdl from 'ytdl-core';
import { DashaContext } from './types';
import { logProc } from './logger';

const log = logProc.bind(null, 'downloadShort');

export const downloadShort = async (ctx: DashaContext, url: string) => {
  const downloadingStream = ytdl(url, { filter: 'audioandvideo', quality: 'highestvideo' });
  const message = ctx.message;

  downloadingStream.on('error', err => {
    log(err);
  });

  const deleteMessageTask = ctx.deleteMessage(message.message_id).catch(err => {
    log('Error while deleting original message: ' + JSON.stringify(err));
  });
  const replyWithVideoTask = ctx.replyWithVideo({ source: downloadingStream }).catch(err => {
    log('Error while sending the video: ' + JSON.stringify(err));
  });

  return Promise.all([deleteMessageTask, replyWithVideoTask]);
};
