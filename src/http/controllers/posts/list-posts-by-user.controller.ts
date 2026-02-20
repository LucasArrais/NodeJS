import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeListPostsByUserUseCase } from '@/usecases/factories/make-list-posts-by-user.js'
import { ResourceNotFoundError } from '@/usecases/errors/resource-not-found-error.js'

export async function listByUser(
  request: FastifyRequest,
  reply: FastifyReply
) {

  const paramsSchema = z.object({
    publicId: z.string(),
  })

  const { publicId } = paramsSchema.parse(request.params)

  try {
    const useCase = makeListPostsByUserUseCase()

    const { posts } = await useCase.execute({
      userPublicId: publicId,
    })

    return reply.status(200).send({ posts })

  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: 'User not found' })
    }

    throw error
  }
}