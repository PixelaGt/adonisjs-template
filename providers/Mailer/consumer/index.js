'use strict'

const Logger = use('Logger')
const Consumer = require('sqs-consumer')
const AWS = require('aws-sdk')
const mailer = require('@sendgrid/mail')
var consumer

class MailerConsumer {
  constructor (config) {
    mailer.setApiKey(config.get('providers.sendgrid.api_key'))
    AWS.config.update({
      region: config.get('providers.aws.region'),
      accessKeyId: config.get('providers.aws.accessKey'),
      secretAccessKey: config.get('providers.aws.secretKey')
    })
    consumer = Consumer.create({
      queueUrl: config.get('providers.aws.mailQueueEndpoint'),
      messageAttributeNames: ['to', 'from', 'subject', 'html', 'templateId', 'jsonAttributes'],
      handleMessage: (message, done) => {
        let sendgridMessage = {
          to: message.MessageAttributes.to.StringValue,
          from: message.MessageAttributes.from.StringValue,
          subject: message.MessageAttributes.subject.StringValue,
          html: message.MessageAttributes.html.StringValue,
          templateId: message.MessageAttributes.templateId.StringValue,
          attributes: JSON.parse(message.MessageAttributes.jsonAttributes.StringValue)
        }
        mailer.send(sendgridMessage).then(() => {
          Logger.info('Enviado')
          done()
        }).catch((e) => {
          Logger.error(e)
        })
      },
      sqs: new AWS.SQS()
    })
  }

  start () {
    consumer.on('error', (error) => {
      Logger.error(error)
    })
    consumer.start()
    Logger.info('Consumer init')
  }
}
module.exports = MailerConsumer
