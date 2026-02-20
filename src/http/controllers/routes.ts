import type {FastifyInstance} from 'fastify'
import { userRoutes } from './users/users.routes.js'
import { postRoutes } from './posts/posts.routes.js'

export async function appRoutes(app: FastifyInstance) {
    app.register(userRoutes, { prefix: '/users' })
    app.register(postRoutes, { prefix: '/posts' })
}   