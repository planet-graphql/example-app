import React from 'react'
import * as Primer from '@primer/react'
import { ReactFCWrapper } from '../../_app'
import Header from '../organisms/header'

type Props = {
  children: React.ReactNode
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
    <PageLayout>
      <PageLayoutHeader>
        <Header topPath="/" logOutPath="/login"></Header>
      </PageLayoutHeader>
      <PageLayoutContent sx={{ paddingX: 3 }}>{props.children}</PageLayoutContent>
    </PageLayout>
  )
}

export default PageFrame
