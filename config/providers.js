'use strict'

const Env = use('Env')

module.exports = {
  sentry: {
    endpoint: Env.get('SENTRY_URL')
  },
  aws: {
    region: Env.get('AWS_REGION'),
    accessKey: Env.get('AWS_ACCESS'),
    secretKey: Env.get('AWS_SECRET'),
    mailQueueEndpoint: Env.get('AWS_MAIL_QUEUE_URL'),
  },
  sendgrid: {
    api_key: Env.get('SENDGRID_API_KEY'),
    mailGroup: Env.get('SENDGRID_MAIL_GROUP')
  }
}
