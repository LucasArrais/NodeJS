import fastify from 'fastify'
import {z} from 'zod'
import {prisma} from './libs/prisma.js'

export const app = fastify()

app.post('/users', async (request, reply) => {
    const registerBodySchema = z.object({ 
        name : z.string().trim().min(1).max(100),
        email : z.string().max(100),
        password : z.string().min(8).max(100),
        photo : z.string().nullable().optional(),
    })

    const {name, email, password, photo} = registerBodySchema.parse(request.body)

    const user = await prisma.user.create({
    data:
     {
        name,
        email,
        password,
        ...(photo !== undefined && { photo }),
  },
})

    return reply.status(201).send(user)
})