'use strict'

const Event = use('Event')
const Sentry = use('Sentry')

Event.on('http:error', async (error) => {
  await Sentry.capture(error)
})
