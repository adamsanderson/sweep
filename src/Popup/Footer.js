import React from 'react'
import { ReverseHorizontalStack } from '../layouts/Stack'
import ExternalLink from '../components/ExternalLink'
import { FEEDBACK_FORM_URL } from '../constants'

export default function Footer() {
  return (
    <ReverseHorizontalStack>
      <ExternalLink url={FEEDBACK_FORM_URL}>
        Leave Feedback
      </ExternalLink>
    </ReverseHorizontalStack>
  )
}