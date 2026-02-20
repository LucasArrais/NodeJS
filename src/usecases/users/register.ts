import { prisma } from '@/libs/prisma.js'
import { hash } from 'bcryptjs'
import { env } from '@/env/index.js'
import type { User } from '@/@types/prisma/client.js'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
  photo?: string | null | undefined
}

type RegisterUserUseCaseResponse = {
  user: User
}

export class RegisterUserUseCase {
  async execute({
    name,
    email,
    password,
    photo
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {

    const userWithSameEmail = await prisma.user.findUnique({
      where: { email },
    })

    if (userWithSameEmail) {
      throw new Error('Email already in use')
    }

    const passwordHash = await hash(password, env.HASH_SALT_ROUNDS)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        ...(photo !== undefined && { photo }),
      },
    })

    return { user }
  }
}