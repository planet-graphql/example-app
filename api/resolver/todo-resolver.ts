import { objects, prisma } from '../../pages/api/graphql'
import { args, pg } from '../builder'

export const todoQuery = pg.query({
  name: 'todo',
  field: (b) =>
    b
      .object(() => objects.Todo)
      .nullable()
      .prismaArgs(() =>
        args.findFirstTodo
          .edit((f) => ({
            where: f.where.edit(
              (f) => ({
                id: f.id.select('Int'),
              }),
              'TodoWhereFirstInput',
            ),
          }))
          .build(),
      )
      .resolve(async ({ prismaArgs, context }) => {
        return await prisma.todo.findFirstOrThrow({
          where: {
            id: prismaArgs.where.id,
            userId: context.userId,
          },
        })
      }),
})

export const todosQuery = pg.query({
  name: 'todos',
  field: (b) =>
    b
      .object(() => objects.Todo)
      .list()
      .prismaArgs(() =>
        args.findManyTodo
          .edit((f) => ({
            where: f.where.edit((f) => ({
              status: f.status.select('EnumTodoStatusFilter').edit((f) => ({
                in: f.in,
              })),
              deadline: f.deadline.select('DateTimeFilter').edit((f) => ({
                gte: f.gte,
                lte: f.lte,
              })),
              counterparty: f.counterparty.select('StringFilter').edit((f) => ({
                contains: f.contains,
              })),
              todaysAction: f.todaysAction.select('Boolean'),
            })),
          }))
          .build(),
      )
      .resolve(async ({ prismaArgs, context }) => {
        return await prisma.todo.findMany({
          where: {
            ...prismaArgs.where,
            userId: context.userId,
          },
          orderBy: {
            deadline: 'asc',
          },
        })
      }),
})

export const createTodoMutation = pg.mutation({
  name: 'createTodo',
  field: (b) =>
    b
      .object(() => objects.Todo)
      .args(() =>
        args.createOneTodo
          .edit((f) => ({
            input: f.data.select('TodoCreateInput').edit((f) => ({
              title: f.title,
              content: f.content,
              note: f.note,
              counterparty: f.counterparty,
              deadline: f.deadline,
              status: f.status,
              todaysAction: f.todaysAction,
            })),
          }))
          .build(),
      )
      .resolve(async ({ args, context }) => {
        return await prisma.todo.create({
          data: {
            userId: context.userId,
            ...args.input,
          },
        })
      }),
})

export const updateTodoMutation = pg.mutation({
  name: 'updateTodo',
  field: (b) =>
    b
      .object(() => objects.Todo)
      .args((f) => ({
        id: f.int(),
        ...args.updateOneTodo
          .edit((f) => ({
            input: f.data.select('TodoUpdateInput').edit((f) => ({
              title: f.title,
              content: f.content,
              note: f.note,
              counterparty: f.counterparty,
              deadline: f.deadline,
              status: f.status,
              todaysAction: f.todaysAction,
            })),
          }))
          .build(),
      }))
      .auth(async ({ args, context }) => {
        const data = await prisma.todo.findUnique({
          where: {
            id: args.id,
          },
        })
        return data?.userId === context.userId
      })
      .resolve(async ({ args }) => {
        return await prisma.todo.update({
          where: {
            id: args.id,
          },
          data: args.input,
        })
      }),
})

export const deleteTodoMutation = pg.mutation({
  name: 'deleteTodo',
  field: (b) =>
    b
      .object(() => objects.Todo)
      .args((f) => ({
        id: f.int(),
      }))
      .auth(async ({ args, context }) => {
        const data = await prisma.todo.findUnique({
          where: {
            id: args.id,
          },
        })
        return data?.userId === context.userId
      })
      .resolve(async ({ args }) => {
        return await prisma.todo.delete({
          where: {
            id: args.id,
          },
        })
      }),
})

export const updateManyTodoMutation = pg.mutation({
  name: 'updateManyTodo',
  field: (b) =>
    b
      .object(() => objects.Todo)
      .list()
      .args((f) => ({
        id: f.int().list(),
        ...args.updateManyTodo
          .edit((f) => ({
            input: f.data.select('TodoUpdateManyMutationInput').edit((f) => ({
              title: f.title,
              content: f.content,
              note: f.note,
              counterparty: f.counterparty,
              deadline: f.deadline,
              status: f.status,
              todaysAction: f.todaysAction,
            })),
          }))
          .build(),
      }))
      .auth(async ({ args, context }) => {
        const data = await prisma.todo.findMany({
          where: {
            id: {
              in: args.id,
            },
          },
        })
        return data.every((x) => x.userId === context.userId)
      })
      .resolve(async ({ args }) => {
        await prisma.todo.updateMany({
          where: {
            id: {
              in: args.id,
            },
          },
          data: args.input,
        })
        return await prisma.todo.findMany({
          where: {
            id: {
              in: args.id,
            },
          },
        })
      }),
})

export const deleteManyTodoMutation = pg.mutation({
  name: 'deleteManyTodo',
  field: (b) =>
    b
      .object(() => objects.Todo)
      .list()
      .args((f) => ({
        id: f.int().list(),
      }))
      .auth(async ({ args, context }) => {
        const data = await prisma.todo.findMany({
          where: {
            id: {
              in: args.id,
            },
          },
        })
        return data.every((x) => x.userId === context.userId)
      })
      .resolve(async ({ args }) => {
        const result = await prisma.todo.findMany({
          where: {
            id: {
              in: args.id,
            },
          },
        })
        await prisma.todo.deleteMany({
          where: {
            id: {
              in: args.id,
            },
          },
        })
        return result
      }),
})
