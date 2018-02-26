'use strict'

const Logger = use('Logger')
const Producer = require('sqs-producer')
var producer
var mailGroup

class MailerProducer {
  constructor(config) {
    producer = Producer.create({
      queueUrl: config.get('providers.aws.mailQueueEndpoint'),
      region: config.get('providers.aws.region'),
      accessKeyId: config.get('providers.aws.accessKey'),
      secretAccessKey: config.get('providers.aws.secretKey')
    })
    mailGroup = config.get('providers.sendgrid.mailGroup')
  }

  send (to, from, subject, html, templateId, attributes) {
    let newMessage = {
      id: Math.random().toString(36).substring(7),
      body: 'email_task',
      groupId: mailGroup,
      deduplicationId: Math.random().toString(36).substring(7),
      messageAttributes: {
        to: { DataType: 'String', StringValue: to },
        from: { DataType: 'String', StringValue: from },
        subject: { DataType: 'String', StringValue: subject },
        html: { DataType: 'String', StringValue: html },
        templateId: { DataType: 'String', StringValue: templateId },
        jsonAttributes: { DataType: 'String', StringValue: attributes }
      }
    }
    producer.send(newMessage, (error) => {
      if (error)
        Logger.error(error)
    })
  }
}
module.exports = MailerProducer
