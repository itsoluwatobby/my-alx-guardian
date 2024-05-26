// eslint-disable-next-line import/no-extraneous-dependencies
const pino = require('pino');

class MicroInfluxLogger {
  constructor(ServiceName) {
    this.logEngine = pino({ level: 'trace' });
    this.serviceName = ServiceName;
  }

  static getInstance(ServiceName) {
    return new MicroInfluxLogger(ServiceName);
  }

  info(msg) {
    this.logEngine.info(`${this.serviceName}>>> ${msg}`);
  }

  fatal(msg) {
    this.logEngine.fatal(`${this.serviceName}>>> ${msg}`);
  }

  debug(msg) {
    this.logEngine.debug(`${this.serviceName}>>> ${msg}`);
  }

  warn(msg) {
    this.logEngine.warn(`${this.serviceName}>>> ${msg}`);
  }

  error(msg) {
    this.logEngine.error(`${this.serviceName}>>> ${msg}`);
  }

  trace(msg) {
    this.logEngine.trace(`${this.serviceName}>>> ${msg}`);
  }
}

module.exports = MicroInfluxLogger.getInstance('MYALXGIARDIANSERVICE');
