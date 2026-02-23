import type {FastifyInstance} from 'fastify'
import {register} from './register.controller.js'
import { get } from './get-user.controller.js'
import { deleteUser } from './delete-user.controller.js'
import { list } from './list-users.controller.js'
import { update } from './update-user.controller.js'
import { listByUser } from '../posts/list-posts-by-user.controller.js'
import { authenticate } from './authenticate.controller.js'
import { verifyJWT } from '@/http/middleawares/verify-jwt.js'
import { verifyUserRole } from '@/http/middleawares/verify-user-role.js'

export async function userRoutes(app: FastifyInstance) {
    app.post('/', register)

    app.get('/:publicId', get)

    app.get('/',{onRequest : [verifyJWT, verifyUserRole(['ADMIN'])]}, list)

    app.delete('/:publicId', deleteUser)

    app.patch('/:publicId', update)

    app.get('/:publicId/posts', listByUser)

    app.post('/authenticate', authenticate)
    
}