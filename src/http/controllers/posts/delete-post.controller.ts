import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeDeletePostUseCase } from '@/usecases/factories/make-delete-post.js'
import { ResourceNotFoundError } from '@/usecases/errors/resource-not-found-error.js'

export async function remove(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    publicId: z.string(),
  })

  const { publicId } = paramsSchema.parse(request.params)

  try {
    const deletePostUseCase = makeDeletePostUseCase()

    await deletePostUseCase.execute({ publicId })

    return reply.status(204).send()

  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: 'Post not found' })
    }

    throw error
  }
}