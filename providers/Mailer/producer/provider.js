'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class MailerProducerProvider extends ServiceProvider {
  register () {
    this.app.singleton('MailerProducer', () => {
      const Config = this.app.use('Adonis/Src/Config')
      return new (require('.'))(Config)
    })
  }
}
module.exports = MailerProducerProvider
