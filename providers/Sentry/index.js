'use strict'

const Raven = require('raven')
const Logger = use('Logger')

class Sentry {
  constructor (config) {
    Raven.config(config.get('providers.sentry.endpoint')).install()
  }

  capture (exception) {
    this.eventId = Raven.captureException(exception, (error, eventId) => {
      if (error) {
        Logger.info('Failed to send captured exception to Sentry')
      } else {
        Logger.info('Captured exception and send to Sentry successfully')
      }
    })
  }

  getClient () {
    return Raven
  }
}

module.exports = Sentry
