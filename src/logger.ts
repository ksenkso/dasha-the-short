import winston, { LoggerOptions } from 'winston';

const logFormat = winston.format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]${label ? `[${label}]` : ''} ${message}`;
});

const options: LoggerOptions = {
  format: winston.format.combine(winston.format.timestamp(), logFormat),
  transports:
    process.env.NODE_ENV === 'production'
      ? [new winston.transports.File({ filename: 'dasha-the-short.log' })]
      : [new winston.transports.Console()],
};

export const logger = winston.createLogger(options);

export const logProc = (procName: string, payload: string) =>
  logger.info(payload, { label: procName });
