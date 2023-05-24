import { DashaContext } from './types';

const DOMAINS = ['youtube.com', 'youtu.be'];
DOMAINS.push(...DOMAINS.map(domain => `www.${domain}`));

export const isLink = (text: string) => text.startsWith('https://');
export const isVideoLink = (text: string) => {
  try {
    const url = new URL(text);

    return DOMAINS.includes(url.host) && url.toString();
  } catch (error) {
    return false;
  }
};

export const onYoutubeShortLink = (ctx: DashaContext, action: (link: string) => unknown) => {
  const url = isVideoLink(ctx.message.text);

  if (url) {
    action(url);
  }
};
