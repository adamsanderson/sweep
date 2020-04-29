import React from 'react'

import ErrorBoundary from '../components/ErrorBoundary'
import useTabList from '../hooks/useTabList'
import groupTabs from '../util/groupTabs'
import TabGroupList from '../components/TabGroupList'

export default function App(){
  const tabs = useTabList()
  const tabGroups = groupTabs(tabs)

  return (
    <ErrorBoundary message="An error ocurred while.">
      <TabGroupList tabGroups={tabGroups} onSweep={onSweep} />
    </ErrorBoundary>
  )
}

function onSweep(tabGroup) {
  const ids = tabGroup.tabs.map(tab => tab.id);

  browser.tabs.remove(ids)
}