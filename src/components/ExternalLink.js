import React from 'react'
import propTypes from 'prop-types'
import browser from "webextension-polyfill"

ExternalLink.propTypes = {
  url: propTypes.string.isRequired,
  children: propTypes.node.isRequired,
}

// By default links in popups won't navigate to external pages,
// so we manually create a tab and close the window (popup).
export default function ExternalLink({ children, url }) {
  function visit(ev) {
    ev.preventDefault()
    browser.tabs.create({ url })
    window.close()
  }

  return (
    <a href={url} onClick={visit}>
      {children}
    </a>
  )
}