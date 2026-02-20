import z from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { RegisterUserUseCase } from '@/usecases/users/register.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { UserAlrealdyExistsError } from '@/usecases/errors/user-already-exists-error.js'

export async function register(request: FastifyRequest, reply: FastifyReply) {
    try {
        const registerBodySchema = z.object({
    name: z.string().trim().min(1).max(100),
    email: z.string().max(100),
    password: z.string().min(8).max(100),
    photo: z.string().nullable().optional().transform(val => val ?? null),
  })

  const { name, email, password, photo } =
    registerBodySchema.parse(request.body)


  const usersRepository = new PrismaUsersRepository()
  const registerUserUseCase = new RegisterUserUseCase(usersRepository)

  const { user } = await registerUserUseCase.execute({
    name,
    email,
    password,
    photo,
  })

  return reply.status(201).send(user)

}catch(error){
    if (error instanceof UserAlrealdyExistsError){
        return reply.status(409).send({ message: error.message })
    }
     throw error 
}
   
  
}