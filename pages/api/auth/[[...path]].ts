import { superTokensNextWrapper } from 'supertokens-node/nextjs'
import supertokens from 'supertokens-node'
import { middleware } from 'supertokens-node/framework/express'
import { backendConfig } from '../../../utils/supertokens/backendConfig'

supertokens.init(backendConfig())

export default async function superTokens(req: any, res: any) {
  await superTokensNextWrapper(
    async (next) => {
      await middleware()(req, res, next)
    },
    req,
    res,
  )
  if (!res.writableEnded) {
    res.status(404).send('Not found')
  }
}
