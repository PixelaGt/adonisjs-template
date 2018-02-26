const { hooks } = require('@adonisjs/ignitor')

hooks.before.providersBooted(() => {
  const Env = use('Env')
  const NodeEnv = Env.get('NODE_ENV')
  Env.load(`./config/env/.env.${NodeEnv}`)
})
