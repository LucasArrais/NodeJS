import type { Post } from '@/@types/prisma/client.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface Request {
  userPublicId: string
}

interface Response {
  posts: Post[]
}

export class ListPostsByUserUseCase {
  constructor(
    private postsRepository: PostsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({ userPublicId }: Request): Promise<Response> {

    const user = await this.usersRepository.findBy({
      public_id: userPublicId,
    })

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const posts = await this.postsRepository.findManyByUserId(user.id)

    return { posts }
  }
}