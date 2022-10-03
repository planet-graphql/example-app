import { superTokensNextWrapper } from 'supertokens-node/nextjs'
import { verifySession } from 'supertokens-node/recipe/session/framework/express'
import supertokens from 'supertokens-node'
import { backendConfig } from '../../config/supertokens/backendConfig'
import { SessionRequest } from 'supertokens-node/framework/express'
import type { Response } from 'express'
import { createServer } from '@graphql-yoga/node'
import { PrismaClient } from '@prisma/client'
import { pg, pgpc } from '../../graphql/builder'
import {
  createTodoMutation,
  deleteManyTodoMutation,
  deleteTodoMutation,
  todoQuery,
  todosQuery,
  updateManyTodoMutation,
  updateTodoMutation,
} from '../../graphql/resolver/todo-resolver'
import ThirdParty from 'supertokens-node/recipe/thirdparty'

export type Context = {
  userId: string
  prisma: PrismaClient
}

export const { objects, enums, getRelations } = pgpc.convertTypes()

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

const server = createServer<{ req: SessionRequest; res: Response }>({
  schema: pg.build([
    todoQuery,
    todosQuery,
    createTodoMutation,
    updateTodoMutation,
    deleteTodoMutation,
    updateManyTodoMutation,
    deleteManyTodoMutation,
  ]),
  maskedErrors: false,
  context: async ({ req }) => {
    const userId = req.session?.getUserId()
    return {
      userId: (await ThirdParty.getUserById(userId ?? ''))?.thirdParty.userId,
      prisma,
    }
  },
})

supertokens.init(backendConfig())

export default async function graphql(req: SessionRequest, res: Response) {
  await superTokensNextWrapper(
    async (next) => {
      return await verifySession()(req, res, next)
    },
    req,
    res,
  )

  return server(req, res)
}
