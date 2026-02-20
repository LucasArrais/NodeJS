import z from 'zod'
import {prisma} from '../../../libs/prisma.js'
import type {FastifyReply, FastifyRequest} from 'fastify'
import { hash } from 'bcryptjs'
import { env } from '@/env/index.js'

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({ 
        name : z.string().trim().min(1).max(100),
        email : z.string().max(100),
        password : z.string().min(8).max(100),
        photo : z.string().nullable().optional(),
    })

    const {name, email, password, photo} = registerBodySchema.parse(request.body)

    const userWithSameEmailOrUsername = await prisma.user.findFirst({
        where: {
            OR : [
                { email },
            ]
        },
    }) 

    if (userWithSameEmailOrUsername){
        return reply.status(409).send({ message: 'Email already in use' })
    }
    const passwordHash = await hash(password, env.HASH_SALT_ROUNDS)

    const user = await prisma.user.create({
    data:
     {
        name,
        email,
        password: passwordHash,
        ...(photo !== undefined && { photo }),
  },
})

    return reply.status(201).send(user)
}