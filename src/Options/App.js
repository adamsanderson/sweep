import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import browser from "webextension-polyfill"
import designTokens from '../designTokens'
import { AUTO_SWEEP_OPTION } from '../constants'

const AppContainer = styled.div({
  padding: designTokens.gap.medium,
})

export default function App() {
  const [autoSweep, setAutoSweep] = useStorage(AUTO_SWEEP_OPTION, false)

  function handleToggleAutoSweep(event) {
    setAutoSweep(event.target.checked)
  }

  return (
    <AppContainer>
      <label>
        <input type="checkbox" onChange={handleToggleAutoSweep} checked={autoSweep} />
        <span>
          Automatically sweep tabs when browser is idle
        </span>
      </label>
    </AppContainer>
  )
}

// This isn't quite right, ideally it should listen for changes on storage
// instead of just blindly setting so that if other code updated the value, 
// this would pick it up, but… we only use this in one place right now.
function useStorage(key, initialValue, area = 'local') {
  const [value, setValue] = useState(initialValue)
  
  useEffect(() => {
    browser.storage[area].get(key)
    .then(valueObject => {
      const storedValue = valueObject[key]
      if (typeof storedValue !== 'undefined') {
        setValue(storedValue)
      }
    })
    .catch(error => { throw error })
  }, [key, initialValue])

  const setStorageValue = (newValue) => {
    browser.storage[area].set({
      [key]: newValue
    })
    .then(() => setValue(newValue))
    .catch(error => { throw error })
  }

  return [value, setStorageValue]
}
