import { isVideoLink } from '../src/matching';

describe('Matching', () => {
  const URLS = [
    'https://www.youtube.com/watch?v=keE3YCtj4jo',
    'https://youtube.com/watch?v=keE3YCtj4jo',
    'https://youtu.be/keE3YCtj4jo',
    'https://www.youtube.com/shorts/GKjfcifA9lg',
    'https://youtube.com/shorts/GKjfcifA9lg',
    'https://youtube.com/shorts/GKjfcifA9lg?feature=share',
    'https://youtu.be/keE3YCtj4jo?t=57',
  ];
  it.each(URLS.map(url => [url]))('should match for the url: %s', url => {
    const match = isVideoLink(url);
    expect(match).toEqual(url);
  });
});
