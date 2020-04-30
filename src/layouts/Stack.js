import styled from '@emotion/styled'
import designTokens from '../designTokens'

export const VerticalStack = styled.div({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
},
  (props) => ({
    '& > * + *': {
      marginTop: props.gap || designTokens.gap.medium
    }
  })
)

export const HorizontalStack = styled.div({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
},
  (props) => ({
    '& > * + *': {
      marginLeft: props.gap || designTokens.gap.small
    }
  })
)
