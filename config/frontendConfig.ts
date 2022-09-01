import ThirdPartyReact from 'supertokens-auth-react/recipe/thirdparty'
import SessionReact from 'supertokens-auth-react/recipe/session'
import { WindowHandlerInterface } from 'supertokens-website/lib/build/utils/windowHandler/types'
import { appInfo } from './appInfo'
import Router from 'next/router'

export let frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      ThirdPartyReact.init({
        signInAndUpFeature: {
          providers: [ThirdPartyReact.Github.init()],
        },
      }),
      SessionReact.init(),
    ],
    windowHandler: (oI: WindowHandlerInterface) => {
      return {
        ...oI,
        location: {
          ...oI.location,
          setHref: (href: string) => {
            Router.push(href)
          },
        },
      }
    },
  }
}
