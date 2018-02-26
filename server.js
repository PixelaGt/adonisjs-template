'use strict'

/*
|--------------------------------------------------------------------------
| Http server
|--------------------------------------------------------------------------
|
| This file bootstrap Adonisjs to start the HTTP server. You are free to
| customize the process of booting the http server.
|
| """ Loading ace commands """
|     At times you may want to load ace commands when starting the HTTP server.
|     Same can be done by chaining `loadCommands()` method after
|
| """ Preloading files """
|     Also you can preload files by calling `preLoad('path/to/file')` method.
|     Make sure to pass relative path from the project root.
*/

const { Ignitor } = require('@adonisjs/ignitor')

new Ignitor(require('@adonisjs/fold'))
  .appRoot(__dirname)
  .fireHttpServer()
  .then(() => {
    const consumer = use('MailerConsumer')
    consumer.start()
    // const producer = use('MailerProducer')
    // producer.send('pablo@pixela.com.gt', 'team@pixela.com.gt', 'Probando', '<p> Probando </p>', '27c0c976-99ac-45f1-82bc-e6dc6c40c018', '{ "name": "name", "email": "email", "message_subject": "subject", "message": "message", "school_name": "school_name", "phone": "phone" }')
  })
  .catch((error) => {
    const Logger = use('Logger')
    const Sentry = use('Sentry')
    Logger.error(error)
    Sentry.capture(error)
  })
