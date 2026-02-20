import z from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { RegisterUserUseCase } from '@/usecases/users/register.js'

export async function register(request: FastifyRequest, reply: FastifyReply) {

  const registerBodySchema = z.object({
    name: z.string().trim().min(1).max(100),
    email: z.string().max(100),
    password: z.string().min(8).max(100),
    photo: z.string().nullable().optional(),
  })

  const { name, email, password, photo } =
    registerBodySchema.parse(request.body)

  const registerUserUseCase = new RegisterUserUseCase()

  const { user } = await registerUserUseCase.execute({
    name,
    email,
    password,
    photo,
  })

  return reply.status(201).send(user)
}