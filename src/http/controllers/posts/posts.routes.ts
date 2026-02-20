import type { FastifyInstance } from 'fastify'
import { create } from './create-post.controller.js'
import { list } from './list-posts.controller.js'
import { get } from './get-posts.controller.js'
import { update } from './update-post.controller.js'
import { remove } from './delete-post.controller.js'

export async function postRoutes(app: FastifyInstance) {
  app.post('/', create)
  app.get('/', list)
  app.get('/:publicId', get)
  app.patch('/:publicId', update)
  app.delete('/:publicId', remove)
}