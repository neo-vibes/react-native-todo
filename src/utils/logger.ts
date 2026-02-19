const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

export const logger = {
  info: (msg: string, data?: object): void => {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify({ level: 'info', msg, ...data, ts: Date.now() }));
  },
  debug: (msg: string, data?: object): void => {
    if (LOG_LEVEL === 'debug') {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify({ level: 'debug', msg, ...data, ts: Date.now() }));
    }
  },
  error: (msg: string, err: Error, data?: object): void => {
    // eslint-disable-next-line no-console
    console.error(
      JSON.stringify({
        level: 'error',
        msg,
        error: err.message,
        stack: err.stack,
        ...data,
        ts: Date.now(),
      })
    );
  },
};
