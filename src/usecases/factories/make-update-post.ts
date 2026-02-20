import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { UpdatePostUseCase } from '../posts/update-post.js'

export function makeUpdatePostUseCase() {
  const postsRepository = new PrismaPostsRepository()
  return new UpdatePostUseCase(postsRepository)
}