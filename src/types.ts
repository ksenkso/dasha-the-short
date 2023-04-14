import { Context, NarrowedContext } from 'telegraf';
import { Update } from 'typegram';
import { Message } from 'typegram/message';

type MessageFilter = Record<'entities', {}> & Message.TextMessage;
export type DashaContext = NarrowedContext<Context, Update.MessageUpdate<MessageFilter>>;
