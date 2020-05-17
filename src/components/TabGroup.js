import React, { useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { XCircle } from 'react-feather'
import { HorizontalStack } from '../layouts/Stack'
import { HorizontalSpread } from '../layouts/Spread'
import designTokens from '../designTokens'
import TabIcon from './TabIcon'
import Tooltip from './Tooltip'

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
  textAlign: 'left',
  overflow: 'hidden',

  '&:hover': {
    color: '#000000',
    background: '#eeeeee',
  }
})

const SmallLabel = styled.div({
  maxWidth: '80vw',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: '0.8rem',
  color: '#666',
})

export default function TabGroup({ group, onSweep }) {
  const [hoverTab, setHoverTab] = useState()

  function handleSweep() {
    onSweep(group)
  }

  function onOver(event, tab) {
    setHoverTab(tab)
  }

  function onOut(event, tab) {
    setHoverTab(undefined)
  }

  return (
    <TransparentButton onClick={handleSweep} >
      <HorizontalSpread>
        <span>{group.title}</span>
        <XCircle fill='white' />
      </HorizontalSpread>
      <HorizontalStack>
        {group.tabs.map(tab => (
          <Tooltip key={tab.id} content={hoverTab === tab && <SmallLabel>{tab.title}</SmallLabel>}>
            <TabIcon tab={tab} onOver={onOver} onOut={onOut} />
          </Tooltip>
        ))}
      </HorizontalStack>
    </TransparentButton>
  )
}