import React from 'react'
import propTypes from 'prop-types'
import TabIcon from './TabIcon'
import { HorizontalStack } from '../layouts/Stack'
import { HorizontalSpread } from '../layouts/Spread'
import { XCircle } from 'react-feather'
import styled from '@emotion/styled'
import designTokens from '../designTokens'

TabGroup.propTypes = {
  group: propTypes.object.isRequired,
  onSweep: propTypes.func,
}

const TransparentButton = styled.button({
  fontSize: '1rem',
  border: 'none',
  borderRadius: 4,
  color: '#666666',
  background: '#ffffff',
  appearance: 'none',
  padding: designTokens.gap.small,

  '&:hover': {
    color: '#000000',
    background: '#eeeeee',
  }
})

export default function TabGroup({group, onSweep}) {
  function handleSweep() {
    onSweep(group)
  }

  return (
    <TransparentButton onClick={handleSweep} >
      <HorizontalSpread>
        <span>{group.title}</span>
        <XCircle fill='white' />
      </HorizontalSpread>
      <HorizontalStack>
        {group.tabs.map(tab => <TabIcon key={tab.id} tab={tab} /> )}
      </HorizontalStack>
    </TransparentButton>
  )
}