import pino from 'pino';

const logger = pino({
  name: 'LAMBDA FUNC',
});

export const handler = async (event) => {
  if (event.body) {
    logger.info({ obj: 1 });
  } else {
    logger.error('error');
  }
};
