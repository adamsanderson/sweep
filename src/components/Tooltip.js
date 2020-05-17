import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import designTokens from '../designTokens'

const TooltipRoot = styled.span({
  position: 'relative',
})

const TooltipContainer = styled.div({
  position: 'absolute',
  bottom: '100%',
  left: '-' + designTokens.gap.xsmall,
  marginBottom: designTokens.gap.xsmall,
  color: '#666666',
  background: '#ffffff',
  padding: designTokens.gap.xsmall,
  border: '1px solid #666666',
  borderRadius: 4,
  boxShadow: '-2px 2px 8px #ccc',
})

Tooltip.propTypes = {
  children: propTypes.node.isRequired,
  content: propTypes.node,
}

/**
 * Simple tooltip that always displays above the content.
 */
export default function Tooltip({ children, content }) {
  return (
    <TooltipRoot>
      {children}
      {content && (
        <TooltipContainer role="tooltip">
          {content}
        </TooltipContainer>
      )}
    </TooltipRoot>
  )
}
