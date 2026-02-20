import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeUpdatePostUseCase } from '@/usecases/factories/make-update-post.js'
import { ResourceNotFoundError } from '@/usecases/errors/resource-not-found-error.js'

export async function update(
  request: FastifyRequest,
  reply: FastifyReply
) {

  const paramsSchema = z.object({
    publicId: z.string(),
  })

  const bodySchema = z.object({
    titulo: z.string().min(1).optional(),
    conteudo: z.string().min(1).optional(),
  })

  const { publicId } = paramsSchema.parse(request.params)
  const { titulo, conteudo } = bodySchema.parse(request.body)

  try {
    const updatePostUseCase = makeUpdatePostUseCase()

    const { post } = await updatePostUseCase.execute({
      publicId,
      titulo,
      conteudo,
    })

    return reply.status(200).send({ post })

  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: 'Post not found' })
    }

    throw error
  }
}