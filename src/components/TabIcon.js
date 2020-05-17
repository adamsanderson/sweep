import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const FAVICON_DIMENSIONS = {
  width: 16,
  height: 16,
}

TabIcon.propTypes = {
  tab: propTypes.object.isRequired,
  onClick: propTypes.func,
  onOver: propTypes.func,
  onOut: propTypes.func,
}

const Circle = styled.div({
  background: '#eeeeee',
  borderRadius: '50%',
  border: '1px solid white',
  ...FAVICON_DIMENSIONS
})

const Favicon = styled.img({
  ...FAVICON_DIMENSIONS
})

export default function TabIcon({ tab, onOver, onOut, onClick }) {
  function handleClick(event) {
    onClick && onClick(event, tab)
  }

  function handleOver(event) {
    onOver && onOver(event, tab)
  }

  function handleOut(event) {
    onOut && onOut(event, tab)
  }

  return (
    tab.favIconUrl ?
      <Favicon src={tab.favIconUrl} alt={tab.title} onMouseOver={handleOver} onMouseOut={handleOut} onClick={handleClick} /> :
      <Circle title={tab.title} onMouseOver={handleOver} onMouseOut={handleOut} onClick={handleClick} />
  )
}