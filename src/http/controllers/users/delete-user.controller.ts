import { ResourceNotFoundError } from '@/usecases/errors/resource-not-found-error.js'
import { makeDeleteUserUseCase } from '@/usecases/factories/make-delete-user.js'
import type { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const deleteUserParamsSchema = z.object({
      publicId: z.string(),
    })

    const { publicId } = deleteUserParamsSchema.parse(request.params)
    const deleteUserUseCase = makeDeleteUserUseCase()
    
    await deleteUserUseCase.execute({ publicId })

    return reply.status(200).send({ message: 'User deleted successfully' })
}catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}  