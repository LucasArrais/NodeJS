import type { PostsRepository } from '@/repositories/posts-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface DeletePostUseCaseRequest {
  publicId: string
}

export class DeletePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({ publicId }: DeletePostUseCaseRequest): Promise<void> {

    const post = await this.postsRepository.findByPublicId(publicId)

    if (!post) {
      throw new ResourceNotFoundError()
    }

    await this.postsRepository.delete(publicId)
  }
}