import React from 'react'
import styled from '@emotion/styled'
import browser from "webextension-polyfill"

import ErrorBoundary from '../components/ErrorBoundary'
import useTabList from '../hooks/useTabList'
import groupTabs from '../util/groupTabs'
import TabGroupList from '../components/TabGroupList'
import tokens from '../designTokens'

const AppContainer = styled.div({
  padding: tokens.gap.medium,
  width: 400,
})

export default function App(){
  const tabs = useTabList()
  const tabGroups = groupTabs(tabs)

  return (
    <ErrorBoundary message="An error ocurred while.">
      <AppContainer>
        <TabGroupList tabGroups={tabGroups} onSweep={onSweep} />
      </AppContainer>
    </ErrorBoundary>
  )
}

function onSweep(tabGroup) {
  const ids = tabGroup.tabs.map(tab => tab.id)

  browser.tabs.remove(ids)
}