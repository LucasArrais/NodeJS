import type { Post } from '@/@types/prisma/client.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface UpdatePostUseCaseRequest {
  publicId: string
  titulo?: string
  conteudo?: string
}

interface UpdatePostUseCaseResponse {
  post: Post
}

export class UpdatePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    publicId,
    titulo,
    conteudo,
  }: UpdatePostUseCaseRequest): Promise<UpdatePostUseCaseResponse> {

    const post = await this.postsRepository.findByPublicId(publicId)

    if (!post) {
      throw new ResourceNotFoundError()
    }

    const updatedPost = await this.postsRepository.update(publicId, {
      titulo,
      conteudo,
    })

    return { post: updatedPost }
  }
}