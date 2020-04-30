import React from 'react'
import propTypes from 'prop-types'
import TabIcon from './TabIcon'
import { HorizontalStack } from '../layouts/Stack'
import { HorizontalSpread } from '../layouts/Spread'
import { XCircle } from 'react-feather'
import styled from '@emotion/styled'

TabGroup.propTypes = {
  group: propTypes.object.isRequired,
  onSweep: propTypes.func,
}

const IconButton = styled.button({
  border: 'none',
  color: '#666666',
  background: '#ffffff',
  appearance: 'none',
  '&:hover': {
    color: '#000000'
  }
})

export default function TabGroup({group, onSweep}) {
  function handleSweep() {
    onSweep(group)
  }

  return (
    <div>
      <HorizontalSpread>
        <span>{group.title}</span>
        <IconButton onClick={handleSweep} >
          <XCircle />
        </IconButton>
      </HorizontalSpread>
      <HorizontalStack>
        {group.tabs.map(tab => <TabIcon key={tab.id} tab={tab} /> )}
      </HorizontalStack>
    </div>
  )
}