import {
  dmmf,
  getPGBuilder,
  getPGPrismaConverter,
  PrismaTypes,
} from '@planet-graphql/core'

export const pg = getPGBuilder<{ Context: Context; Prisma: PrismaTypes }>()
export const pgpc = getPGPrismaConverter(pg, dmmf)
export const { args } = pgpc.convertBuilders()
