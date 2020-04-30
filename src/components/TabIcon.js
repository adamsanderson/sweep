import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const FAVICON_DIMENSIONS = {
  width: 16,
  height: 16,
}

TabIcon.propTypes = {
  tab: propTypes.object.isRequired,
}

const Circle = styled.div({
  background: '#eeeeee',
  borderRadius: '50%',
  ...FAVICON_DIMENSIONS
})

export default function TabIcon({tab}) {
  return (
    tab.favIconUrl ?
      <img src={tab.favIconUrl} title={tab.title} {...FAVICON_DIMENSIONS}  /> :
      <Circle title={tab.title} />
  )
}