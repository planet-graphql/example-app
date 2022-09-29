import React from 'react'
import * as Primer from '@primer/react'
import { ReactFCWrapper } from '../../pages/_app'
import Header from '../organisms/header'
import ThirdParty, { ThirdPartyAuth } from 'supertokens-auth-react/recipe/thirdparty'

type Props = {
  children: React.ReactNode
}

async function logoutClicked() {
  await ThirdParty.signOut()
  ThirdParty.redirectToAuth()
}

const PageLayout = Primer.PageLayout as ReactFCWrapper<typeof Primer.PageLayout>
const PageLayoutHeader = Primer.PageLayout.Header as ReactFCWrapper<
  typeof Primer.PageLayout.Header
>
const PageLayoutContent = Primer.PageLayout.Content as ReactFCWrapper<
  typeof Primer.PageLayout.Content
>

function PageFrame(props: Props) {
  return (
    <ThirdPartyAuth>
      <PageLayout>
        <PageLayoutHeader>
          <Header topPath="/" onLogout={() => logoutClicked()}></Header>
        </PageLayoutHeader>
        <PageLayoutContent sx={{ paddingX: 3 }}>{props.children}</PageLayoutContent>
      </PageLayout>
    </ThirdPartyAuth>
  )
}

export default PageFrame
