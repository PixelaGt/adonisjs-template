'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class MailerConsumerProvider extends ServiceProvider {
  register () {
    this.app.singleton('MailerConsumer', () => {
      const Config = this.app.use('Adonis/Src/Config')
      return new (require('.'))(Config)
    })
  }
}
module.exports = MailerConsumerProvider
