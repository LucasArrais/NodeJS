import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { DeletePostUseCase } from '../posts/delete-post.js'

export function makeDeletePostUseCase() {
  const postsRepository = new PrismaPostsRepository()
  return new DeletePostUseCase(postsRepository)
}