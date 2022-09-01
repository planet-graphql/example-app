import React from 'react'
import * as Primer from '@primer/react'
import { ReactFCWrapper } from '../../_app'
import Header from '../organisms/header'
import ThirdParty, { ThirdPartyAuth } from 'supertokens-auth-react/recipe/thirdparty'

type Props = {
  children: React.ReactNode
}

async function logoutClicked() {
  await ThirdParty.signOut()
  ThirdParty.redirectToAuth()
}

function PageFrame(props: Props) {
  const PageLayout = Primer.PageLayout as ReactFCWrapper<typeof Primer.PageLayout>
  const PageLayoutHeader = Primer.PageLayout.Header as ReactFCWrapper<
    typeof Primer.PageLayout.Header
  >
  const PageLayoutContent = Primer.PageLayout.Content as ReactFCWrapper<
    typeof Primer.PageLayout.Content
  >
  return (
    <ThirdPartyAuth>
      <PageLayout>
        <PageLayoutHeader>
          <Header
            topPath="/"
            logOutPath="/login"
            onLogout={() => logoutClicked()}
          ></Header>
        </PageLayoutHeader>
        <PageLayoutContent sx={{ paddingX: 3 }}>{props.children}</PageLayoutContent>
      </PageLayout>
    </ThirdPartyAuth>
  )
}

export default PageFrame