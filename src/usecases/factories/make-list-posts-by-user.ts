import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { ListPostsByUserUseCase } from '../posts/list-posts-by-user.js'

export function makeListPostsByUserUseCase() {
  const postsRepository = new PrismaPostsRepository()
  const usersRepository = new PrismaUsersRepository()

  return new ListPostsByUserUseCase(postsRepository, usersRepository)
}