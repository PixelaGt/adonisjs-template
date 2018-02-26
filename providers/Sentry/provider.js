'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class SentryProvider extends ServiceProvider {
  register () {
    this.app.singleton('Sentry', () => {
      const Config = this.app.use('Adonis/Src/Config')
      return new (require('.'))(Config)
    })
  }
}
module.exports = SentryProvider
