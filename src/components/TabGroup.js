import React from 'react'
import propTypes from 'prop-types'

TabGroup.propTypes = {
  group: propTypes.object.isRequired,
  onSweep: propTypes.func,
}


export default function TabGroup({group, onSweep}) {
  function handleSweep() {
    onSweep(group)
  }

  return (
    <div>
      {group.title} {group.tabs.length}
      <button onClick={handleSweep}>X</button>
    </div>
  )
}