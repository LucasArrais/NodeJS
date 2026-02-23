import fastify from 'fastify'
import { appRoutes } from './http/controllers/routes.js'
import fastifyJwt from '@fastify/jwt'
import { ZodError } from 'zod'
import {env} from './env/index.js'

export const app = fastify()

app.register(fastifyJwt,{
    secret: env.JWT_SECRET,
}) 

app.register(appRoutes)

app.setErrorHandler((error, _request, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: 'Validation error',
            issues: error.format(),
        })
    }

    if (error instanceof SyntaxError) {
        return reply.status(400).send({ message: 'Syntax error in request body' })
    }

    return reply.status(500).send({ message: 'Internal Server Error' })
})

