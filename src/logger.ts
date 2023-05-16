import winston, { LoggerOptions } from 'winston';

const logFormat = winston.format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]${label ? `[${label}]` : ''} ${message}`;
});

const options: LoggerOptions = {
  format: winston.format.combine(winston.format.timestamp(), logFormat),
  transports: [new winston.transports.Console()],
};

export const logger = winston.createLogger(options);

export const logProc = (procName: string, payload: any) =>
  logger.info(payload, { label: procName });
