import browser from "webextension-polyfill"
import { useEffect, useState } from 'react'

export default function useTabList() {
  const [tabs, setTabs] = useState([])

  function updateTabList() {
    browser.tabs.query({})
      .then(tabs => {
        setTabs(tabs)
      })
      .catch(err => {
        console.error(err)
      })
  }

  useEffect(() => {
    browser.tabs.onCreated.addListener(updateTabList)
    browser.tabs.onRemoved.addListener(updateTabList)
    browser.tabs.onUpdated.addListener(updateTabList)
    updateTabList()

    return () => {
      browser.tabs.onCreated.removeListener(updateTabList)
      browser.tabs.onRemoved.removeListener(updateTabList)
      browser.tabs.onUpdated.removeListener(updateTabList)
    }
  }, [])

  return tabs
}