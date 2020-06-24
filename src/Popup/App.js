import React from 'react'
import styled from '@emotion/styled'
import browser from "webextension-polyfill"

import ErrorBoundary from '../components/ErrorBoundary'
import useTabList from '../hooks/useTabList'
import categorizeTabs from '../lib/categorizeTabs'
import TabGroupList from '../components/TabGroupList'
import Footer from './Footer'
import tokens from '../designTokens'

const AppContainer = styled.div({
  padding: tokens.gap.medium,
  width: 400,
})

export default function App(){
  const tabs = useTabList()
  const tabGroups = categorizeTabs(tabs)

  return (
    <ErrorBoundary message="An error ocurred.">
      <AppContainer>
        <TabGroupList tabGroups={tabGroups} onSweep={onSweep} />
        <Footer/>
      </AppContainer>
    </ErrorBoundary>
  )
}

function onSweep(tabGroup) {
  const ids = tabGroup.tabs.map(tab => tab.id)

  browser.tabs.remove(ids)
}