'use strict'

const Hemera = require('nats-hemera')
const hemeraJwt = require('hemera-jwt-auth')

const nats = require('nats').connect({
    'url': 'nats://localhost:4222',
    'user': 'ruser',
    'pass': 'T0pS3cr3t'
  })
const hemera = new Hemera(nats, {
  logLevel: 'debug'
})

hemera.use(hemeraJwt, {
  jwt: {
    secret: 'test'
  }
})

hemera.ready(() => {
  /**
   * Your Implementations
   */
  hemera.add(
    {
      topic: 'math',
      cmd: 'add',
      auth$: {
        scope: 'math'
      }
    },
    function(req, cb) {
        console.log("Service is being called")
      cb(null, parseInt(req.a) + parseInt(req.b))
    }
  )
})
