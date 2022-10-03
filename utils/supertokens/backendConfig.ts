import ThirdPartyNode from 'supertokens-node/recipe/thirdparty'
import SessionNode from 'supertokens-node/recipe/session'
import { appInfo } from './appInfo'

export let backendConfig = () => {
  return {
    framework: 'express' as const,
    appInfo,
    supertokens: {
      connectionURI: 'https://try.supertokens.io',
    },
    recipeList: [
      ThirdPartyNode.init({
        signInAndUpFeature: {
          providers: [
            ThirdPartyNode.Github({
              clientId: process.env.GITHUB_CLIENT_ID!,
              clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            }),
          ],
        },
      }),
      SessionNode.init(),
    ],
  }
}
