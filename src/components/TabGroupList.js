import React from 'react'
import propTypes from 'prop-types'
import TabGroup from './TabGroup'

TabGroupList.propTypes = {
  tabGroups: propTypes.array.isRequired,
  onSweep: propTypes.func,
}

export default function TabGroupList({tabGroups, onSweep}){
  if (tabGroups.length === 0) return <EmptyState/>

  return (
    <>
      {tabGroups.map(group => <TabGroup key={group.title} group={group} onSweep={onSweep} /> )}
    </>
  )
}

function EmptyState() {
  return (
    <div>
      No tabs can be automatically swept
    </div>
  )
}