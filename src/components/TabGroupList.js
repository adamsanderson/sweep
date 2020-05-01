import React from 'react'
import propTypes from 'prop-types'
import TabGroup from './TabGroup'
import { VerticalStack } from '../layouts/Stack'

TabGroupList.propTypes = {
  tabGroups: propTypes.array.isRequired,
  onSweep: propTypes.func,
}

export default function TabGroupList({tabGroups, onSweep}){
  if (tabGroups.length === 0) return <EmptyState/>

  return (
    <>
      <h3>Close tabs</h3>
      <VerticalStack>
        {tabGroups.map(group => 
          <TabGroup key={group.title} group={group} onSweep={onSweep} /> 
        )}
      </VerticalStack>
    </>
  )
}

function EmptyState() {
  return (
    <VerticalStack>
      <p>No more tabs can be automatically swept</p>
      <p>Sweep will watch for tabs left behind by links that launch native applications, blank pages, and duplicate pages.</p>
    </VerticalStack>
  )
}