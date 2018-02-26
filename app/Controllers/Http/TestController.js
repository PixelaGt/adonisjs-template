'use strict'

class TestController {

  async test () {
    const sqs = use('SQSProducer')
    sqs.sendEmail('to', 'from', 'subject', 'html', 'templateId', 'json')
    return 'Probando'
  }

}

module.exports = TestController
